import { FC } from 'react';
import { PortableText, PortableTextProps } from 'next-sanity';
import Prism from 'prismjs';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../utils/sanity-client';
import VideoEmbed from './video-embed';
import cx from '../utils/cx';
import { isExternal } from '../utils/url';
import ExternalLink from './external-link';
import Image from './image';

const builder = imageUrlBuilder(client);

type BodyProps = {
	value: PortableTextProps['value'];
};

const Body: FC<BodyProps> = ({ value }) => {
	const centerClassName = 'max-w-3xl mx-auto';
	return (
		<PortableText
			value={value}
			components={{
				block: {
					normal: (props) => (
						<p className={cx(centerClassName, 'mb-4')}>{props.children}</p>
					),
					h1: (props) => (
						<h1 className={cx(centerClassName, 'font-bold')}>
							{props.children}
						</h1>
					),
					h2: (props) => (
						<h2 className={cx(centerClassName, 'font-bold')}>
							{props.children}
						</h2>
					),
					h3: (props) => (
						<h3 className={cx(centerClassName, 'font-bold')}>
							{props.children}
						</h3>
					),
				},
				marks: {
					link: ({ value, children }) => {
						const { href } = value;
						const external = isExternal(href);
						return external ? (
							<ExternalLink href={href}>{children}</ExternalLink>
						) : (
							<a href={href}>{children}</a>
						);
					},
				},
				list: {
					bullet: (props) => (
						<ul className={cx(centerClassName, 'pl-5')}>{props.children}</ul>
					),
					number: (props) => (
						<ol className={cx(centerClassName, 'pl-5')}>{props.children}</ol>
					),
				},
				listItem: {
					bullet: ({ children }) => <li className="list-disc">{children}</li>,
				},
				types: {
					image: (props) => {
						const className = 'my-12 md:my-16 max-sm:-mx-4';

						const image = (
							<Image
								image={{
									...props.value,
									width: props.value.width || 3200,
									height: props.value.height || 2400,
								}}
								sizes="100vw"
							/>
						);

						if (props.value.caption) {
							return (
								<figure className={className}>
									{image}
									<figcaption className="mt-2 max-sm:mx-4 text-light-gray">
										{props.value.caption}
									</figcaption>
								</figure>
							);
						}

						return <div className={className}>{image}</div>;
					},
					videoEmbed: (props) => {
						return (
							<VideoEmbed url={props.value.url} className="my-12 md:my-16" />
						);
					},
					code: (props) => {
						let code = props.value.code;
						const language = props.value.language;

						if (language in Prism.languages) {
							code = Prism.highlight(
								props.value.code,
								Prism.languages[language],
								language,
							);
						}

						return (
							<pre className="font-mono px-2 mb-4 border-l border-gray">
								<code
									className={`language-${language}`}
									dangerouslySetInnerHTML={{ __html: code }}
								/>
							</pre>
						);
					},
					table: (props) => {
						const { rows } = props.value;
						return (
							<table className={cx(centerClassName, 'w-full mt-4 mb-6')}>
								<tbody>
									{rows.map((row, i) => (
										<tr key={i} className="border-b border-gray">
											{row.cells.map((cell, j) => (
												<td key={j} className="pr-4 py-2">
													{cell}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						);
					},
				},
			}}
		/>
	);
};

export default Body;

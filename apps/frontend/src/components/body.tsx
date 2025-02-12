import imageUrlBuilder from '@sanity/image-url';
import type { TableProps } from '@sanity/table';
import {
	PortableText,
	type PortableTextComponents,
	type PortableTextProps,
} from 'next-sanity';
import Prism from 'prismjs';
import type { FC } from 'react';
import cx from '../utils/cx';
import { client } from '../utils/sanity-client';
import { isExternal } from '../utils/url';
import ExternalLink from './external-link';
import Image from './image';
import VideoEmbed from './video-embed';

const builder = imageUrlBuilder(client);

type BodyProps = {
	value: PortableTextProps['value'];
};

const Body: FC<BodyProps> = ({ value }) => {
	return <PortableText value={value} components={components} />;
};

const centerClassName = 'max-w-3xl mx-auto';
const components: PortableTextComponents = {
	block: {
		normal({ children }: any) {
			return <p className={cx(centerClassName, 'mb-4')}>{children}</p>;
		},
		h1: ({ children }: any) => (
			<h1 className={cx(centerClassName, 'font-bold')}>{children}</h1>
		),
		h2: ({ children }: any) => (
			<h2 className={cx(centerClassName, 'font-bold')}>{children}</h2>
		),
		h3: ({ children }: any) => (
			<h3 className={cx(centerClassName, 'font-bold')}>{children}</h3>
		),
	},
	marks: {
		link: ({ value, children }: any) => {
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
		bullet: ({ children }: any) => (
			<ul className={cx(centerClassName, 'pl-5')}>{children}</ul>
		),
		number: ({ children }: any) => (
			<ol className={cx(centerClassName, 'pl-5')}>{children}</ol>
		),
	},
	listItem: {
		bullet: ({ children }: any) => <li className="list-disc">{children}</li>,
	},
	types: {
		image: ({ value }: any) => {
			const className = 'my-12 md:my-16 max-sm:-mx-4';

			const image = (
				<Image
					image={value}
					width={value.width || 3200}
					height={value.height || 2400}
					sizes="100vw"
				/>
			);

			if (value.caption) {
				return (
					<figure className={className}>
						{image}
						<figcaption className="mt-2 max-sm:mx-4 text-light-gray">
							{value.caption}
						</figcaption>
					</figure>
				);
			}

			return <div className={className}>{image}</div>;
		},
		videoEmbed: ({ value }: any) => {
			return <VideoEmbed url={value.url} className="my-12 md:my-16" />;
		},
		code: ({ value }: any) => {
			let code = value.code;
			const language = value.language;

			if (language in Prism.languages && Prism.languages[language]) {
				code = Prism.highlight(value.code, Prism.languages[language], language);
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
		table: ({ value }: TableProps) => {
			if (!value) {
				return null;
			}

			return (
				<table className={cx(centerClassName, 'w-full mt-4 mb-6')}>
					<tbody>
						{value.rows.map((row, i) => (
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
};

export default Body;

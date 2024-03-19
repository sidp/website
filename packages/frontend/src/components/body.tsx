import { PortableText, PortableTextProps } from 'next-sanity';
import Image from 'next/image';
import { FC } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../utils/sanity-client';

const builder = imageUrlBuilder(client);

type BodyProps = {
	value: PortableTextProps['value'];
};

const Body: FC<BodyProps> = ({ value }) => {
	return (
		<PortableText
			value={value}
			components={{
				block: {
					normal: (props) => <p className="max-w-4xl mb-4">{props.children}</p>,
				},
				types: {
					image: (props) => {
						const width = props.value.width || 1920;
						const height = props.value.height || 1440;

						return (
							<Image
								src={builder
									.image(props.value.asset)
									.size(width, height)
									.quality(80)
									.url()}
								alt={props.value.alt}
								quality="85"
								placeholder="blur"
								blurDataURL={props.value.lqip}
								width={width}
								height={height}
								sizes="100vw"
								className="my-12 md:my-16"
							/>
						);
					},
					code: (props) => (
						<pre className="pl-6 mb-4">
							<code>{props.value.code}</code>
						</pre>
					),
				},
			}}
		/>
	);
};

export default Body;

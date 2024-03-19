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
				types: {
					image: (props) => {
						console.log('props', props);
						return (
							<Image
								src={builder.image(props.value.asset).size(800, 600).url()}
								alt={props.value.alt}
								width="800"
								height="600"
								sizes="(max-width: 500px) 98vw, (max-width: 800px) 50vw, 33vw"
							/>
						);
					},
				},
			}}
		/>
	);
};

export default Body;

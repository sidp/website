import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { Post } from '../../types';
import { client } from '../../utils/sanity-client';
import Heading from '../heading';

const builder = imageUrlBuilder(client);

type PostItemProps = {
	post: Post;
	className?: string;
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {
	return (
		<Link href={`/${post.slug.current}`} className="flex flex-col gap-3">
			{post.image && (
				<Image
					src={builder.image(post.image).size(3200, 2400).quality(90).url()}
					placeholder="blur"
					blurDataURL={post.image.lqip}
					quality={90}
					alt=""
					width="3200"
					height="2400"
					sizes={`(max-width: 1024px) 100vw, ${
						post.type === 'project' ? '33vw' : '50vw'
					}`}
					className="aspect-[4/3]"
				/>
			)}
			<div>
				<Heading as="h3" className="underline underline-offset-4">
					{post.title}
				</Heading>
				{post.description && <p>{post.description}</p>}
				{post.type === 'project' && post.meta.client && <>{post.meta.client}</>}
			</div>
		</Link>
	);
};

export default PostItem;

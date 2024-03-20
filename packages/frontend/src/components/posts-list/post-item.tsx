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
					src={builder.image(post.image).size(800, 600).url()}
					placeholder="blur"
					blurDataURL={post.image.lqip}
					alt=""
					width="800"
					height="600"
					sizes="(max-width: 500px) 98vw, (max-width: 800px) 50vw, 33vw"
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

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
		<Link href={`/${post.slug.current}`} className="u-url p-name">
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
			<Heading as="h3" className="mt-3">
				{post.title}
			</Heading>
			{post.description && (
				<>
					<span className="p-summary">{post.description}</span>
				</>
			)}
			{post.type === 'project' && post.meta.client && <>{post.meta.client}</>}
			{post.type === 'article' && <>Read more »</>}
			{post.type === 'article' && (
				<time dateTime={post._createdAt} className="dt-published">
					{post._createdAt}
				</time>
			)}
		</Link>
	);
};

export default PostItem;

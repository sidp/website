import Link from 'next/link';
import React from 'react';
import Heading from '../heading';
import Image from '../image';
import type { PostItem as PostItemType } from './types';

type PostItemProps = {
	post: PostItemType;
	loading?: 'lazy' | 'eager';
	className?: string;
};

const PostItem: React.FC<PostItemProps> = ({ post, loading = 'lazy' }) => {
	return (
		<Link
			href={`/${post.slug?.current}`}
			className="flex flex-col gap-3 max-sm:-mx-4"
		>
			{post.image?.asset && (
				<Image
					image={post.image}
					loading={loading}
					width={3200}
					height={2400}
					sizes={`(max-width: 1024px) 100vw, ${
						post.type === 'project' ? '33vw' : '50vw'
					}`}
					className="aspect-[4/3] object-cover"
				/>
			)}
			<div className="max-sm:mx-4">
				<Heading as="h3" className="underline underline-offset-4">
					{post.title}
				</Heading>
				{post.description && <p>{post.description}</p>}
				{post.type === 'project' && post.meta?.client && (
					<>{post.meta.client}</>
				)}
			</div>
		</Link>
	);
};

export default PostItem;

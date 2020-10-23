import * as React from 'react';
import { Mention } from '../types';
import MentionForm from './mention-form';
import { TextWrapper } from '../styles/components';
import Info from './info';

type MentionsListProps = {
	mentions: Mention[];
};

const MentionsList: React.FC<MentionsListProps> = ({ mentions }) => {
	return (
		<TextWrapper>
			<h2>
				Mentions{' '}
				<Info>
					Read more about{' '}
					<a
						href="https://indieweb.org/Webmention"
						target="_blank"
						rel="noopener"
					>
						webmention
					</a>
				</Info>
			</h2>
			{mentions.length > 0 && (
				<ul>
					{mentions.map((mention) => (
						<li key={mention.id}>
							<a href={mention.sourceUrl} rel="nofollow noopener">
								{mention.sourceUrl}
								{mention.postInfo?.title}
							</a>
						</li>
					))}
				</ul>
			)}
			<MentionForm />
		</TextWrapper>
	);
};

export default MentionsList;

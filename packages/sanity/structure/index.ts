import type { StructureResolver } from 'sanity/structure';
import {
	BoltIcon,
	CaseIcon,
	DocumentIcon,
	DocumentTextIcon,
	FolderIcon,
} from '@sanity/icons';

export const structure: StructureResolver = (S) => {
	const createPostList = (
		title: string,
		icon: React.ComponentType | React.ReactNode,
		subtype: string,
		initialValueTemplate?: string,
	) => {
		return S.listItem()
			.title(title)
			.icon(icon)
			.child(
				S.documentList()
					.title(title)
					.schemaType('post')
					.filter('_type == "post" && type == $type')
					.params({ type: subtype })
					.initialValueTemplates([
						S.initialValueTemplateItem(initialValueTemplate || subtype),
					])
					.menuItems([...(S.documentTypeList('post').getMenuItems() || [])]),
			);
	};

	return S.list()
		.id('root')
		.title('Content')
		.items([
			S.documentTypeListItem('post').title('All posts').icon(FolderIcon),
			createPostList('Artworks', BoltIcon, 'artwork', 'artwork'),
			createPostList('Articles', DocumentTextIcon, 'article', 'article'),
			createPostList('Projects', CaseIcon, 'project', 'project'),
			createPostList('Pages', DocumentIcon, 'page', 'page'),
			S.divider(),
			S.listItem()
				.title('Navigation')
				.id('navigation')
				.child(
					S.document()
						.schemaType('navigation')
						.documentId('navigation')
						.title('Navigation'),
				),
			S.listItem()
				.title('Settings')
				.id('settings')
				.child(
					S.document()
						.schemaType('settings')
						.documentId('settings')
						.title('Settings'),
				),
		]);
};

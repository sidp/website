import type { StructureResolver } from 'sanity/structure';
import {
	BoltIcon,
	CaseIcon,
	DocumentIcon,
	DocumentTextIcon,
	FolderIcon,
} from '@sanity/icons';

export const structure: StructureResolver = (S) =>
	S.list()
		.id('root')
		.title('Content')
		.items([
			S.listItem()
				.title('Navigation')
				.id('navigation')
				.child(
					S.document()
						.schemaType('navigation')
						.documentId('navigation')
						.title('Navigation'),
				),
			S.divider(),
			S.documentTypeListItem('post').title('Posts').icon(FolderIcon),
			S.listItem()
				.title('Articles')
				.icon(DocumentTextIcon)
				.child(
					S.documentList()
						.title('Articles')
						.filter('_type =="post" && type == "article"'),
				),
			S.listItem()
				.title('Projects')
				.icon(CaseIcon)
				.child(
					S.documentList()
						.title('Projects')
						.filter('_type =="post" && type == "project"'),
				),
			S.listItem()
				.title('Pages')
				.icon(DocumentIcon)
				.child(
					S.documentList()
						.title('Pages')
						.filter('_type =="post" && type == "page"'),
				),
			S.listItem()
				.title('Artworks')
				.icon(BoltIcon)
				.child(
					S.documentList()
						.title('Artworks')
						.filter('_type =="post" && type == "artwork"'),
				),
		]);

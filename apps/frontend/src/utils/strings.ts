export const typeNameSingular = (typeName: string): string => {
	switch (typeName) {
		case 'article':
			return 'post';
		case 'project':
			return 'project';
		case 'page':
			return 'page';
		case 'artwork':
			return 'artwork';
		default:
			return typeName;
	}
};

export const typeNamePlural = (typeName: string): string => {
	switch (typeName) {
		case 'article':
			return 'posts';
		case 'project':
			return 'projects';
		case 'page':
			return 'pages';
		case 'artwork':
			return 'artworks';
		default:
			return typeName;
	}
};

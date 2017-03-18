export const isAbout = page =>
	(page.path === '/about/');

export const isProject = page =>
	(page.path.indexOf('/project') === 0);

export const sortProjects = (a, b) =>
	(b.data.weight - a.data.weight);

export const getProjects = pages => {
	return pages.filter(isProject).sort(sortProjects);
};

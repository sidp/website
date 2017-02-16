export const isProject = page => 
	(page.path.indexOf('/project') === 0);

export const sortProjects = (a, b) =>
	(a.data.weight - b.data.weight);

export const getProjects = pages => {
	return pages.filter(isProject).sort(sortProjects);
};

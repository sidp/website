import React from 'react'
import { rhythm } from '../../utils/typography';
import WorkList from '../../components/work-list';

const WorkTemplate = (props) => {
	const work = props.route.pages
		.filter(page => page.path.indexOf('/work') === 0)
		.sort((a, b) => a.data.weight - b.data.weight);

	return (
		<div>
			{props.children}

			<h2 style={{ marginTop: rhythm(2) }}>More Projects</h2>
			<WorkList work={work} />
		</div>
	);
};

export default WorkTemplate;

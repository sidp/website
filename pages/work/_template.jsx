import React from 'react'
import WorkList from '../../components/work-list';

const WorkTemplate = (props) => {
	const work = props.route.pages
		.filter(page => page.path.indexOf('/work') === 0);

	return (
		<div>
			{props.children}
			<WorkList work={work} />
		</div>
	);
};

export default WorkTemplate;

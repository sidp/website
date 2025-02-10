import type { FC, ReactNode } from 'react';
import cx from '../utils/cx';

type ColumnsProps = {
	maxColumns?: 2 | 3;
	children: ReactNode;
};

const Columns: FC<ColumnsProps> = ({ maxColumns = 2, children }) => (
	<div
		className={cx(
			'grid gap-x-4 gap-y-10',
			maxColumns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3',
		)}
	>
		{children}
	</div>
);

export default Columns;

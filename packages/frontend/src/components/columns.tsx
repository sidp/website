import { FC, ReactNode } from 'react';

type ColumnsProps = {
	maxColumns?: 2 | 3;
	children: ReactNode;
};

const Columns: FC<ColumnsProps> = ({ maxColumns = 2, children }) => (
	<div
		className={`grid ${
			maxColumns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
		} gap-x-4 gap-y-10`}
	>
		{children}
	</div>
);

export default Columns;

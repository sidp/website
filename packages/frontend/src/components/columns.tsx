import { FC, ReactNode } from 'react';

export const Columns: FC<{ children: ReactNode }> = ({ children }) => (
	<div className="grid lg:grid-cols-3 gap-x-4 gap-y-10">{children}</div>
);

export default Columns;

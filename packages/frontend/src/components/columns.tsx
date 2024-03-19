import { FC, ReactNode } from 'react';

export const Columns: FC<{ children: ReactNode }> = ({ children }) => (
	<div className="grid lg:grid-cols-3 gap-4">{children}</div>
);

export default Columns;

import { FC, ReactNode } from 'react';

export const Container: FC<{ children: ReactNode }> = ({ children }) => (
	<div>{children}</div>
);

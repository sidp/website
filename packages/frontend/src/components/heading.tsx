import { FC, ReactNode, createElement } from 'react';
import cx from '../utils/cx';

type HeadingProps = {
	as?: HTMLHeadingElement['tagName'];
	className?: string;
	children: ReactNode;
};

const Heading: FC<HeadingProps> = ({ as = 'h2', className, children }) => {
	return createElement(as, { className: cx('font-bold', className) }, children);
};

export default Heading;

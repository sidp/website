import type { FC, ReactNode } from 'react';
import cx from '../utils/cx';

type SectionProps = {
	limitWidth?: boolean;
	className?: string;
	children: ReactNode;
};

const Section: FC<SectionProps> = ({
	limitWidth = false,
	className,
	children,
}) => {
	return (
		<section
			className={cx(
				'px-4 my-12 md:my-16',
				limitWidth && 'max-w-3xl',
				className,
			)}
		>
			{children}
		</section>
	);
};

export default Section;

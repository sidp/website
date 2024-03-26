import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { Navigation } from '../types';
import cx from '../utils/cx';

type HeaderProps = {
	navigation: Navigation;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {
	const router = useRouter();
	return (
		<div
			role="banner"
			className="border-b border-dotted border-current flex justify-between flex-wrap leading-normal"
		>
			<Link
				href="/"
				className={cx('px-4 py-3 duration-100 linear', 'bg-blue max-sm:w-full')}
				aria-current={isCurrent('/', router) ? 'page' : undefined}
			>
				Peter Simonsson
			</Link>
			<div className="flex gap-x-1 p-1">
				{navigation.items.map((item) => (
					<NavItem href={item.href} key={item.title}>
						{item.title}
					</NavItem>
				))}
			</div>
		</div>
	);
};

export default Header;

const NavItem: FC<{
	href: string;
	className?: string;
	children: ReactNode;
}> = ({ href, className, children }) => {
	const router = useRouter();
	const current = isCurrent(href, router) ? 'page' : undefined;
	return (
		<Link
			href={href}
			className={cx(
				'px-3 py-2 rounded-sm transition-colors duration-100 linear',
				current && 'bg-blue',
				!current && 'hover:bg-hover',
				className,
			)}
			aria-current={current}
		>
			{children}
		</Link>
	);
};

const isCurrent = (href: string, router: NextRouter): boolean => {
	const { asPath, route } = router;
	const current = href === asPath || route === href ? true : false;
	return current;
};

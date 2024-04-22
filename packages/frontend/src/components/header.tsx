'use client';

import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navigation } from '../types';
import cx from '../utils/cx';

type HeaderProps = {
	navigation: Navigation;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {
	const pathname = usePathname();
	return (
		<header
			role="banner"
			className="border-b border-dotted border-current flex flex-wrap justify-between whitespace-nowrap leading-normal"
		>
			<Link
				href="/"
				className="px-4 py-3 duration-100 linear bg-blue"
				aria-current={isCurrent('/', pathname) ? 'page' : undefined}
				aria-label="Peter Simonsson"
			>
				Peter Simonsson
			</Link>
			<div className="flex-1 flex gap-x-1 p-1 relative">
				<span className="border-t border-dotted border-current absolute top-[-1px] left-0 right-0"></span>
				{navigation.items.map((item) => (
					<NavItem href={item.href} key={item.title}>
						{item.title}
					</NavItem>
				))}
			</div>
		</header>
	);
};

export default Header;

const NavItem: FC<{
	href: string;
	className?: string;
	children: ReactNode;
}> = ({ href, className, children }) => {
	const pathname = usePathname();
	const current = isCurrent(href, pathname) ? 'page' : undefined;
	return (
		<Link
			href={href}
			className={cx(
				'px-3 py-2 rounded-sm transition-colors duration-100 linear',
				current && 'bg-white text-black font-bold',
				!current && 'hover:bg-gray',
				className,
			)}
			aria-current={current}
		>
			{children}
		</Link>
	);
};

const isCurrent = (href: string, pathname: string | null): boolean => {
	const current = href === pathname;
	return current;
};

import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../types';
import cx from '../utils/cx';

type HeaderProps = {
	navigation: Navigation;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {
	return (
		<div
			role="banner"
			className="border-b border-dotted border-current flex justify-between flex-wrap"
		>
			<NavItem href="/" className="bg-blue hover:bg-blue max-sm:w-full">
				Peter Simonsson
			</NavItem>
			<div className="flex gap-x-1 p-1">
				{navigation.items.map((item) => (
					<NavItem
						href={item.href}
						key={item.title}
						className="px-3 sm:py-2 rounded-sm"
					>
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
	const current = href === router.asPath ? 'page' : undefined;
	return (
		<Link
			href={href}
			className={cx(
				'px-4 py-3 leading-normal transition-colors duration-100 linear',
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

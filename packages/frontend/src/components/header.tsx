import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { linkBoxShadow, fadeIn, cubicBezierFadeIn } from '../styles/variables';
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
			<NavItem href="/">Peter Simonsson</NavItem>
			<div className="flex">
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

const NavItem: FC<{ href: string; children: ReactNode }> = ({
	href,
	children,
}) => {
	const router = useRouter();
	const current = href === router.asPath ? 'page' : undefined;
	return (
		<Link
			href={href}
			className={cx('px-4 py-3 leading-normal', current && 'bg-blue')}
			aria-current={current}
		>
			{children}
		</Link>
	);
};

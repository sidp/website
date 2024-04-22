import * as React from 'react';
import { Metadata } from 'next';
import Section from '../components/section';
import Heading from '../components/heading';

export const metadata: Metadata = {
	title: 'Page not found',
	robots: 'noindex',
};

export default async function NotFound() {
	return (
		<Section limitWidth>
			<Heading as="h1">Page not found</Heading>
			<p>The requested page could not be found.</p>
		</Section>
	);
}

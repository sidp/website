import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<script defer data-domain="simonsson.com" src="/js/script.js" />
			</Head>
			<body className="font-sans leading-relaxed text-sm bg-black text-white antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

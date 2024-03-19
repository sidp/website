import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<script
					async
					defer
					data-domain="simonsson.com"
					src="https://st.simonsson.com/js/index.js"
				></script>
			</Head>
			<body className="font-mono leading-relaxed text-sm bg-black text-white antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

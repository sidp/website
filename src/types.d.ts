declare const graphql: (query: TemplateStringsArray) => void;

declare module '*.jpg' {
	const val: string;
	export default val;
}

declare module '*.png' {
	const val: string;
	export default val;
}

declare module '*.ico' {
	const val: string;
	export default val;
}

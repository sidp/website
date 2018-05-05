declare const graphql: (query: TemplateStringsArray) => void;

declare module '!raw-loader!*' {
	export default '' as string;
}

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

declare module '!raw-loader!*' {
	const val: string;
	export default val;
}

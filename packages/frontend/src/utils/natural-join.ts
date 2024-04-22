import { ReactNode } from 'react';

const naturalJoin = (
	parts: ReactNode[],
	endSeparator = 'and',
	separator = ',',
): ReactNode[] =>
	parts.reduce<ReactNode[]>((prev, part, i) => {
		let sep = `${separator} `;

		if (i + 2 === parts.length) {
			sep = ` ${endSeparator} `;
		} else if (i + 1 === parts.length) {
			sep = '';
		}

		prev.push(part);
		if (sep) prev.push(sep);

		return prev;
	}, []);

export default naturalJoin;

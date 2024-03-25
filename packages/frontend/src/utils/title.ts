function title(websiteName: string): string;
function title(pageTitle: string, websiteName: string): string;
function title(a: string, b?: string): string {
	if ((a && !b) || a === b) {
		return a;
	}

	return `${a} – ${b}`;
}

export default title;

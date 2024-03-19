export default function cx(...classes: (string | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}

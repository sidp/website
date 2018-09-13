import styled, { css } from 'styled-components';

const mediaQueryMap = {
	'<small': 'max-width: 499px',
	'>small': 'min-width: 500px',
	'<medium': 'max-width: 799px',
	'>medium': 'min-width: 800px',
	'<large': 'max-width: 1399px',
	'>large': 'min-width: 1400px',
};

export const Columns = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);

	@media (${mediaQueryMap['<small']}) {
		grid-column-gap: 1.5rem;
		grid-row-gap: 1.5rem;
	}

	@media (${mediaQueryMap['>small']}) and (${mediaQueryMap['<large']}) {
		grid-column-gap: 2rem;
		grid-row-gap: 1.5rem;
	}

	@media (${mediaQueryMap['>large']}) {
		grid-column-gap: 2.5rem;
		grid-row-gap: 2rem;
	}
`;

export default Columns;

export const Column = styled.div`
	${props =>
		Object.keys(props.span || {})
			.filter(key => mediaQueryMap[key])
			.map(
				key => css`
					@media (${mediaQueryMap[key]}) {
						grid-column-start: span ${props.span[key]};
					}
				`
			)};
`;

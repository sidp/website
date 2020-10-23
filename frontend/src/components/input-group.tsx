import styled from 'styled-components';

const InputGroup = styled.div`
	display: flex;

	& > *:not(:last-child) {
		margin-right: 0.25rem;
	}
`;

export default InputGroup;

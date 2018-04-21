import styled from 'styled-components';

export const EpisodeHeaderCell = styled.th`
    padding: .75rem;
    text-align: ${({ align }) => align};
`;

export const EpisodeCell = styled.td`
    padding: .75rem;
    text-align: ${({ align }) => align};
`;

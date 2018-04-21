import styled from 'styled-components';

const EpisodeTable = styled.table`
    margin: .75rem 0;

    & tr {
        border: 1px solid #f3f3f3;        
        
        &:hover > td {
            background-color: #f1f1f1;
        }
    }
`;

export default EpisodeTable;

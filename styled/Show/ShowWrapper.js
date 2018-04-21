import styled from 'styled-components';

const ShowWrapper = styled.div`
    display: flex;
    padding: .75rem 0; 
    width: ${({ isDetail }) => (isDetail ? '100%' : '31.25rem')};    
`;

export default ShowWrapper;

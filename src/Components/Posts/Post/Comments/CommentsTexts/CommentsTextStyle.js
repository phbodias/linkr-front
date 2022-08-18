import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;  
    height: fit-content;
    width:100%;
    background-color: #1E1E1E;
    border-radius:1rem;
    position:absolute;
    left:0;
    bottom:1.5rem;
    padding:1.5rem 1.25rem 0 1.25rem;
`;

export const Box = styled.div`
    min-height:4.25rem;
    width:100%;
    display:flex;
    border-bottom: 1px solid #353535;
    padding-top:1rem;

`;

export const LeftInnerBox = styled.div`
    height:100%;
    width:100px;
    display:flex;
    justify-content:center;
    align-items:center;

    img{
        aspect-ratio:1;
        border-radius:50px;
        width:48.75%;
        cursor:pointer;    
    }

    @media (max-width: 1130px) {
        width: 80px;
    }
`;


export const RightInnerBox = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center; 
    align-items:flex-start;
    height:100%;
    width: calc(100% - 100px);
    font-size:0.875rem;

    @media (max-width: 1130px) {
        width: calc(100% - 80px);
    }
`;

export const TitleBox = styled.div`
    display:flex;
    justify-content:flex-start;
    align-items:center;
    width:100%;
    margin-bottom:0.625rem;
`;

export const UserName = styled.h3`
    color: #F3F3F3;
    font-weight:700;
    cursor:pointer;
`;

export const RelationUser = styled.h3`
    color: #565656;
    font-weight:400;
    margin-left: 0.375rem;
`;

export const CommentSection = styled.div`
    color: #ACACAC;
    font-weight:400;
    display:flex;
    align-items:center;
`;

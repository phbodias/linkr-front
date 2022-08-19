import styled from "styled-components";

export const CommentForm = styled.form`
        width:100%;
        padding-right:23px;
        height:fit-content;
        position: relative;
        >textarea{
            padding:15px;
            height:fit-content;
            color:#F3F3F3;
            font-size:14px;
            font-style:italic;
            align-items:center;
            justify-content:center;
            width:100%;
            background-color:#252525;
            border:none;
            border-radius:1rem;
            ::placeholder{
                color:#575757;
            }
        }
        >div{
            position:absolute;
            width: 1rem;
            aspect-ratio:1;
            right: 2rem;
            bottom: 1rem;
            cursor: pointer;
            color:#F3F3F3;
        }
    
`;


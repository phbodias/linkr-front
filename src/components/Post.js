import styled from "styled-components";

export default function Post({ name, profilePic, url, comment, hashtags, likes }) {

    return (
        <Container>
            <img src={profilePic} alt="" />
            <div>
                <h2>{name}</h2>
                <p>{comment}</p>
                <p>{url}</p>
            </div>
        </Container>
    )
}

const Container = styled.div`
    background-color:#171717;
    display:flex;
    border-radius:5px;
    padding:18px 24px;
    width:100%;
    box-sizing:border-box;
    margin:15px 0;
    img{
        border-radius:50px;
        height:50px;
    }
    h2{
        font-size:20px;
        color:#FFFFFF;
        margin:8px 0 10px 0;
    }
    p{
        font-size:17px;
        color:#B7B7B7;
        width:100%;
    }
    div{
        padding:0 0 32px 20px;
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        width:100%;
        box-sizing:border-box;
    }
`
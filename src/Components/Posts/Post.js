import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export default function Post({ name, profilePic, urlData, comment, likes }) {

    const navigate = useNavigate();

    const tagStyle = {
        color: 'white',
        fontWeight: 700,
        cursor: 'pointer'
      };

    function textWithoutHashtag(text){
        return text?.replace('#','');
    }

    return (
        <Container>
            <div>
                <img src={profilePic} alt="" />
            </div>
            <span>
                <h2>{name}</h2>
                <ReactTagify
                    tagStyle = { tagStyle }
                    tagClicked = {(tag) => navigate(`/hashtag/${textWithoutHashtag(tag)}`)}
                >
                    <p>{comment}</p>
                </ReactTagify>
                
                <URLdiv href={urlData.url} target="_blank" rel="noreferrer" >
                    <span>
                        <h3>{urlData.title}</h3>
                        <p>{urlData.description}</p>
                        <p>{urlData.url}</p>
                    </span>
                    <div>
                        <img src={urlData.image} alt="" />
                    </div>
                </URLdiv>
            </span>
        </Container>
    )
}

const Container = styled.div`
    width:100%;
    box-sizing:border-box;
    display:flex;
    background-color:#171717;
    border-radius:10px;
    padding:18px 18px;
    margin:15px 0;
    img{
        border-radius:50px;
        width:50px;
        height:50px;
    }
    >div{
        width:50px;
        margin-right:20px;
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
        text-align:start;
    }
    span{
        width:100%;
        box-sizing:border-box;
        display:flex;
        flex-direction:column;
        align-items:flex-start;
    }
`

const URLdiv = styled.a`
display:flex;
align-items:center;
margin-top:15px;
box-sizing:border-box;
height:160px;
width:100%;
border: 1px solid #C4C4C4;
border-radius: 10px;
position:relative;

div{
    position:absolute;
    right:-1px;
    bottom:-1px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:30%;
    height:101%;
    overflow: hidden;
}
img{
    height:100%;
    width:auto;
    object-fit: cover;
}
span{
    width:70%;
    padding: 25px;
    box-sizing:border-box;
}
p{
    width:100%;
    color:#9B9595;
    font-size:10px;
    margin:10px 0;
    line-height:12px;
}
p:last-child{
    color:#CECECE;
}
h3{
    width:100%;
    color:#CECECE;
    font-size:16px;
    text-align:start;
}

`
import styled from "styled-components";

export default styled.div`
background-color:#FFFFFF;
margin-bottom:30px;
display:flex;
border-radius:10px;
padding:18px 24px;
width:100%;
box-sizing:border-box;
position:relative;
img{
    border-radius:50px;
    height:50px;
}
h2{
    font-size:20px;
    color:#707070;
    margin:8px 0 15px 0;
    font-weight:300;
}
form{
    padding:0 0 32px 20px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    width:100%;
}
input, textarea{
    opacity:${({ disable }) => disable ? '0.5' : '1'};
    width:100%;
    box-sizing:border-box;
    background-color:#EFEFEF;
    font-family:'Lato', sans-serif;
    color:#949494;
    font-weight:300;
    font-size:15px;
    border:none;
    border-radius:5px;
    padding:10px 15px;
    margin-bottom:5px;
}
textarea{
    height:70px;
}

button{
    opacity:${({ disable }) => disable ? '0.5' : '1'};
    position:absolute;
    right:24px;
    bottom:18px;
    border:none;
    border-radius:5px;
    background-color:#1877F2;
    color:#FFFFFF;
    font-size:14px;
    font-weight:700;
    width:120px;
    height:30px;
}

@media (max-width: 1130px) {
    padding: 10px 18px;
    margin-bottom:8px;
    border-radius:0;
    h2{
        font-size:18px;
        text-align:center;
        width:100%;
    }
    img{
        display:none;
    }
    input,textarea{
        font-size:13px;
    }
    textarea{
        height:54px;
    }
    button{
        height:22px;
        bottom:12px;
        right:18px;
    }
    form{
        padding:0 0 28px 0;
    }
  }
`
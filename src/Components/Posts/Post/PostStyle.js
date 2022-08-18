import styled from "styled-components";

const tagStyle = {
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  };
  
  const InnerContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    background-color: #171717;
    border-radius: 10px;
    padding: 18px;
    img {
      border-radius: 50px;
      width: 50px;
      height: 50px;
    }
    > div {
      width: 100px;
      /* margin-right: 10px; */
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h2 {
      font-size: 20px;
      color: #ffffff;
      margin: 8px 0 10px 0;
    }
    p {
      font-size: 17px;
      color: #b7b7b7;
      width: 100%;
      text-align: start;
    }
    span {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    span > div {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  
    @media (max-width: 1130px) {
      margin: 5px 0;
      padding: 12px;
      border-radius: 0;
      img {
        width: 40px;
        height: 40px;
      }
      > div {
        width: 80px;
        margin-right: 10px;
      }
      h2 {
        font-size: 18px;
      }
      p {
        font-size: 15px;
      }
    }
  `;

  const Container = styled.div`
  margin: 15px 0;
  background-color:#1e1e1e;
  width:100%;
  border-radius:10px 10px 0 0;
  `
  const RepostSpan = styled.span`
  display:flex;
  align-items:center;
  color: #ffffff;
  font-size: 30px;
  padding:5px 15px 0 15px;
  p{
    font-size:12px;
    margin-left:5px;
  }
  `
  
  const Icons = styled.div`
    width: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-size: 20px;
  
    @media (max-width: 1130px) {
      font-size: 18px;
    }
  `;
  const Heart = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
    color: #ffffff;
    font-size: 20px;
    p {
      font-size: 11px;
      text-align: center;
      line-height: 18px;
    }
  `;

  const RepostStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  color: #ffffff;
  font-size: 30px;
  p {
    font-size: 11px;
    text-align: center;
  }
`;

  const EditInput = styled.textarea`
    opacity: ${({ changeOpacity }) => (changeOpacity ? "0.5" : "1")};
    border: none;
    border-radius: 5px;
    width: 100%;
    font-size: 16px;
    font-family: "Lato", sans-serif;
    color: #4c4c4c;
    padding: 5px 10px;
    box-sizing: border-box;
    @media (max-width: 1130px) {
      font-size: 14px;
    }
  `;
  
  const URLdiv = styled.a`
    display: flex;
    align-items: center;
    margin-top: 15px;
    box-sizing: border-box;
    height: 160px;
    width: 100%;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    overflow: hidden;
  
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30%;
      height: 100%;
      overflow: hidden;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 0;
    }
    span {
      width: 70%;
      padding: 25px;
      box-sizing: border-box;
    }
    p {
      color: #9b9595;
      font-size: 12px;
      margin: 10px 0;
      line-height: 13px;
    }
    p:last-child {
      color: #cecece;
    }
    h3 {
      color: #cecece;
      font-size: 16px;
      text-align: start;
    }
  
    @media (max-width: 1130px) {
      height: 120px;
      h3 {
        font-size: 10px;
      }
      p {
        font-size: 9px;
        margin: 5px 0;
      }
      span {
        padding: 8px;
      }
    }
  `;
  

  export {tagStyle,Container,Icons,Heart,RepostStyle,InnerContainer,RepostSpan,EditInput,URLdiv}
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #333333;
  height: 100vh;
  width: 35vw;
  min-width: 500px;
  right: 0;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;

  form {
    display: flex;
    flex-direction: column;
  }

  @media(min-width: 1131px){
    justify-content: center;
  }

  @media(max-width: 1130px){
    top: 175px;
    min-width: 100vw;
    height: calc(100vh - 175px);
    padding-top: 40px;
  }
`;

const Input = styled.input`
  padding: 18px;
  background-color: ${(props) => (props.desabilitado ? "#CFCFCF" : "#ffffff")};
  border: 1px solid #bebebe;
  color: #222222;
  width: 429px;
  height: 45px;
  border-radius: 6px;
  margin-bottom: 13px;
  font-size: 27px;

  ::placeholder {
    color: #888888;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
  }

  @media(max-width: 1130px){
    width: 300px;
  }
`;

const Button = styled.button`
  padding: 18px;
  color: #ffffff;
  min-width: 429px;
  min-height: 45px;
  border-radius: 6px;
  margin-bottom: 6px;
  cursor: pointer;
  background-color: #1877f2;
  text-align: center;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;

  :hover {
    filter: brightness(1.2);
  }

  @media(max-width: 1130px){
    min-width: 300px;
  }
`;

const StyledLink = styled(Link)`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #ffffff;
  margin-top: 14px;
`;

export { Container, Input, Button, StyledLink };

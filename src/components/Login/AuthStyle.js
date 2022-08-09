import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #333333;
  height: 100vh;
  width: 35vw;
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
`;

const Input = styled.input`
  padding: 18px;
  background-color: ${(props) => (props.desabilitado ? "#CFCFCF" : "#ffffff")};
  border: 1px solid #bebebe;
  color: #222222;
  width: 429px;
  height: 45px;
  border-radius: 4px;
  margin-bottom: 6px;
  font-size: 27px;

  ::placeholder {
    color: #888888;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
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

import styled from "styled-components";
import InputSeachUsers from "./InputSeach/InputSeachUsers";

export default function Header() {
  return (
    <Container>
      <Title>linkr</Title>
      <InputSeachUsers />
      <ProfilePic></ProfilePic>
    </Container>
  );
}

const Title = styled.div`
  width: 108px;
  height: 54px;
  font-family: "Passion One";
  font-style: normal;
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  letter-spacing: 0.05em;
  color: #ffffff;
`;

const ProfilePic = styled.div``;

const Container = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1;
  font-family: "Passion One", cursive;
  top: 0;
  left: 0;
  height: 50px;
  background-color: #151515;
  color: #ffffff;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
`;

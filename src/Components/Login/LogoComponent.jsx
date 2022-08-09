import styled from "styled-components";

export default function LogoComponent() {
  return (
    <Background>
      <Title>linkr</Title>
      <Catchphrase>
        save, share and discover the best links on the web
      </Catchphrase>
    </Background>
  );
}

const Catchphrase = styled.div`
  position: absolute;
  width: 442px;
  height: 128px;
  left: 144px;
  top: 418px;

  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;

  color: #ffffff;
`;

const Title = styled.div`
  position: absolute;
  width: 233px;
  height: 117px;
  left: 144px;
  top: 301px;
  font-family: "Passion One";
  font-style: normal;
  font-weight: 700;
  font-size: 106px;
  line-height: 117px;
  letter-spacing: 0.05em;
  color: #ffffff;
`;

const Background = styled.div`
  position: absolute;
  width: 65vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
`;

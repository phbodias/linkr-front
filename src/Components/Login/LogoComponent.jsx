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
  width: 442px;
  height: 128px;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;

  @media ((min-width: 700px) and (max-width: 1130px)){
    bottom: 30px;
    font-size: 30px;
    line-height: 34px;
    width: 237px;
  }

  @media (max-width: 700px) {
    font-size: 23px;
    line-height: 34px;
    width: 237px;
  }
`;

const Title = styled.div`
  width: 233px;
  height: 117px;
  font-family: "Passion One";
  font-style: normal;
  font-weight: 700;
  font-size: 106px;
  line-height: 117px;
  letter-spacing: 0.05em;
  color: #ffffff;

  @media ((min-width: 700px) and (max-width: 1130px)){
    bottom: 30px;
  }

  @media (max-width: 700px) {
    font-size: 76px;
    line-height: 84px;
  }
`;

const Background = styled.div`
  position: absolute;
  width: 65vw;
  height: 100vh;
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10vw;

  @media ((min-width: 700px) and (max-width: 1130px)){
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  @media (max-width: 1130px) {
    width: 100vw;
    height: 175px;
    align-items: center;
    padding-left: 0;
  }
`;

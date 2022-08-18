import styled from "styled-components";

const Container = styled.main`
    margin-top: 35px;
    min-height:100vh;
    display:flex;
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    background-color:#333333;
    box-sizing:border-box;
    padding: 72px 18% 0 16%;
    @media (max-width: 1130px) {
        padding:35px 0 0 0;
        }
`;

const Title = styled.h1`
  font-family: "Oswald", sans-serif;
  font-size: 2.75rem;
  font-weight: 700;
  margin: 70px 0 43px 0;
  color: #ffffff;
  height: fit-content;
  @media (max-width: 1130px) {
    padding: 20px 0 0 15px;
    font-size: 34px;
    margin-bottom: 20px;
    width: 100%;
  }
  @media (max-width: 563px){
    margin-top: 100px;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LeftInnerContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1130px) {
    width: 100%;
  }
`;

const RightInnerContainer = styled.div`
  width: 32%;
  height: fit-content;
  background-color: #171717;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  @media (max-width: 1130px) {
    display: none;
  }
`;

const SubTitle = styled.div`
  font-family: "Oswald", sans-serif;
  font-size: 1.7rem;
  font-weight: 700;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
  height: fit-content;
  padding: 7% 10%;
  width: 100%;
  border-bottom: 1px solid #484848;
`;

const SubItems = styled.div`
  padding: 1.375rem 10% 1.875rem 10%;
  width: 100%;
  display: flex;
  height: fit-content;
  flex-direction: column;
`;

const TextContent = styled.h4`
  font-family: "Oswald", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffffff;
  height: fit-content;
  cursor: pointer;
  &:hover {
    color: lightblue;
    filter: brightness(1.2);
  }
`;

const Follow = styled.div`
  position: absolute;
  width: 112px;
  height: 31px;
  left: 73vw;
  top: 170px;
  background: #1877f2;
  border-radius: 5px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 1130px) {
    top: 150px;
  }

  @media (max-width: 563px){
    top: 177px;
  }
`;

const Unfollow = styled.div`
  position: absolute;
  width: 112px;
  height: 31px;
  left: 73vw;
  top: 170px;
  background: #ffffff;
  border-radius: 5px;
  text-align: center;
  color: #1877f2;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 1130px) {
    top: 150px;
  }
  @media (max-width: 563px){
    top: 177px;
  }
`;

export {
  Container,
  Title,
  InnerContainer,
  RightInnerContainer,
  LeftInnerContainer,
  SubTitle,
  SubItems,
  TextContent,
  Follow,
  Unfollow
};

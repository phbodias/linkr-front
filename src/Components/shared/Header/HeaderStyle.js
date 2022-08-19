import styled from "styled-components";

const Logout = styled.div`
  position: absolute;
  width: 150px;
  height: 47px;
  top: 80px;
  right: 0;
  background: #151515;
  border-radius: 0 0 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    width: 57px;
    height: 20px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  width: 150px;
  background-color: #151515;
  justify-content: space-evenly;
  img {
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    object-fit: cover;
  }
`;

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
  cursor: pointer;
  margin-left: 20px;
`;

const Container = styled.div`
  font-family: "Passion One", cursive;
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  left: 0;
  height: 80px;
  background-color: #151515;
  color: #ffffff;
  padding: 10px 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 563px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100vw;
    padding: 0;
  }
`;

export {Logout, Title, Profile, Container};
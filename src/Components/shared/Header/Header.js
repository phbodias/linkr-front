import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../../contexts/UserContext";
import InputSearchUsers from "../../InputSearch/InputSearchUsers";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import UrlContext from "../../../contexts/UrlContext";

export default function Header() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const token = localStorage.getItem("tokenLinker");
  if (token === null) navigate("/");
  const [showLogout, setShowLogout] = useState(false);
  const URL = useContext(UrlContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const user = axios.get(`${URL}/me`, config);
    user
      .then((res) => setUserData(res.data))
      .catch((error) => {
        alert(`Erro: \n\n${error.response.status} - ${error.response.data}`);
        localStorage.removeItem("tokenLinker");
        navigate("/");
      });
  }, [URL, navigate, token, setUserData]);
  function logout() {
    localStorage.removeItem("tokenLinker");
    navigate("/");
  }

  return (
    <Container>
      <Title onClick={() => navigate("/timeline")}>linkr</Title>
      <InputSearchUsers />
      <ClickAwayListener onClickAway={() => setShowLogout(false)}>
        <Profile onClick={() => setShowLogout(!showLogout)}>
          {showLogout ? (
            <ion-icon name="chevron-up-outline"></ion-icon>
          ) : (
            <ion-icon name="chevron-down-outline"></ion-icon>
          )}
          {userData.length > 0 ? (
            <img src={userData[0].profilePic} alt="profilePic" />
          ) : (
            ""
          )}
          {showLogout ? (
            <Logout onClick={logout}>
              <p>Logout</p>
            </Logout>
          ) : (
            ""
          )}
        </Profile>
      </ClickAwayListener>
    </Container>
  );
}

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
  box-sizing: content-box;
  @media (max-width: 563px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100vw;
    padding: 0;
  }
`;

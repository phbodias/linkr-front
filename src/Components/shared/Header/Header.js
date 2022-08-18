import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../../contexts/UserContext";
import InputSearchUsers from "../../InputSearch/InputSearchUsers";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import UrlContext from "../../../contexts/UrlContext";
import { Container, Logout, Profile, Title } from "./HeaderStyle";

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
      .then((res) => {
        setUserData(res.data);
        localStorage.setItem("userLinkerId",userData[0].id);
      })
      .catch((error) => {
        alert(`Erro: \n\n${error.response.status} - ${error.response.data}`);
        localStorage.removeItem("tokenLinker");
        navigate("/");
      });
  }, [URL, navigate, token, setUserData, userData]);
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



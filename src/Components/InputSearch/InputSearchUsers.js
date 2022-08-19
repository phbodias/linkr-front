import { DebounceInput } from "react-debounce-input";
import React, { useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import ClickAwayListener from "react-click-away-listener";
import CardUser from "./CardUser";
import UrlContext from "../../contexts/UrlContext";

export default function InputSearchUsers() {
  const URL = useContext(UrlContext);

  const token = localStorage.getItem("tokenLinker");
  const [users, setUsers] = React.useState("");
  const [usersNotFollowed, setUsersNotFollowed] = React.useState("");
  const [searchWords, setsearchWords] = React.useState("");
  const [activeButton, setActiveButton] = React.useState(false);
  const [friends, setFriends] = React.useState([]);

  React.useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const friendsId = axios.get(`${URL}/follow`, config);
    friendsId
      .then((res) => {
        setFriends(res.data);
      })
      .catch((e) => alert(e.message));
    if (searchWords.length > 2) {
      const getUsersByName = axios.get(`${URL}/busca/${searchWords}`, config);
      getUsersByName.then(getUsersByNameSucess);
      getUsersByName.catch(getUsersByNameFail);
    }
  }, [searchWords, token, URL, friends]);

  function getUsersByNameSucess(response) {
    setUsers(response.data.filter((friend) => friends.includes(friend.id)));
    setUsersNotFollowed(
      response.data.filter((friend) => !friends.includes(friend.id))
    );
  }

  function getUsersByNameFail(error) {
    console.log(error);
    alert("Erro na requisição do input ");
  }

  function showUsers() {
    if (users.length === 0 && usersNotFollowed.length === 0) {
      return <h4>NO USER FOUND</h4>;
    } else {
      return (
        <>
          {users.map((el, i) => (
            <UserFollowed>
              <CardUser
                key={i}
                name={el.name}
                profilePic={el.profilePic}
                id={el.id}
              />
              <h1>• following</h1>
            </UserFollowed>
          ))}
          {usersNotFollowed.map((el, i) => (
            <CardUser
              key={i}
              name={el.name}
              profilePic={el.profilePic}
              id={el.id}
            />
          ))}
        </>
      );
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setActiveButton(false)}>
      <Body
        selecionado={activeButton}
        onClick={() => setActiveButton(!activeButton)}
      >
        <Input>
          <DebounceInput
            minLength={3}
            debounceTimeout={300}
            onChange={(event) => setsearchWords(event.target.value)}
            placeholder={"Search for people and friends"}
          />
        </Input>

        <Users selecionado={activeButton}>{showUsers()}</Users>
      </Body>
    </ClickAwayListener>
  );
}

const Input = styled.div`
  height: 45px;
  display: flex;
  justify-content: center;
  margin: auto;

  input {
    width: 563px;
    height: 45px;
    border-radius: 8px;
    border: none;
    padding-left: 10px;
  }
`;

const Body = styled.div`
  margin: auto;
  border-radius: 8px;
  padding: 0;
  width: 563px;
  height: ${(props) => (props.selecionado ? "150px" : "45px")};
  background-color: #e7e7e7;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  box-sizing: border-box;

  @media (max-width: 563px) {
    position: absolute;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 95vw;
    margin: 0 auto;
  }

  @media (min-width: 563px) and (max-width: 880px) {
    width: 280px;
  }
`;

const Users = styled.div`
  margin-top: 3px;
  width: 100%;
  height: 135px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  display: ${(props) => (props.selecionado ? "block" : "none")};
  padding-left: 10px;

  h4 {
    margin-top: 15px;
    text-align: center;
    color: blue;
  }
`;

const UserFollowed = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #c5c5c5;
    margin-left: 7px;
    margin-top: -2px;
  }
`;


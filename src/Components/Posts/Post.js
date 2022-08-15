import styled from "styled-components";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import ReactTooltip from 'react-tooltip';

export default function Post({
  id,
  userOwner,
  urlData,
  comment,
  likesCount,
  likes,
  openModal,
  idUser,
}) {
  const { userData } = useContext(UserContext);
  const URL = useContext(UrlContext);

  const [currComment, setComment] = useState(comment);
  const [editPost, setEditMode] = useState(false);
  const [disable, setDisable] = useState(false);
  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem("tokenLinker");
  const navigate = useNavigate();

  function textWithoutHashtag(text) {
    return text?.replace("#", "");
  }

  useEffect(() => {
    setComment(comment);
  }, [comment]);

  let description = formatUrlData(urlData.description, "description");
  let title = formatUrlData(urlData.title);
  let url = formatUrlData(urlData.url);

  function formatUrlData(text, field = "") {
    let textOutput;
    if (field === "description") {
      textOutput = text.substring(0, 150);
      if (textOutput.length === 150) textOutput += "...";
    } else {
      textOutput = text.substring(0, 55);
      if (textOutput.length === 55) textOutput += "...";
    }
    return textOutput;
  }

  function moveCursorAtEnd(e) {
    const temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  }

  function InputFocus() {
    const inputRef = useRef();
    useEffect(() => {
      inputRef.current.focus();
    }, []);

    return (
      <EditInput
        wrap="soft"
        rows="3"
        ref={inputRef}
        onFocus={moveCursorAtEnd}
        value={currComment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => handleEdit(e.code)}
        disabled={disable}
        changeOpacity={disable}
      />
    );
  }

  function handleEdit(code) {
    switch (code) {
      case "Enter":
        updatePost();
        break;
      case "Escape":
        setComment(comment);
        setEditMode(false);
        break;
      case "ClickIcon":
        if (editPost) setComment(comment);
        setEditMode(!editPost);
        break;
      default:
        break;
    }
  }

  function updatePost() {
    setDisable(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.put(
      `${URL}/posts/${id}`,
      { comment: currComment },
      config
    );
    promise.then(() => {
      window.location.reload(false);
    });
    promise.catch(() => {
      alert("Your changes could not be saved");
      setDisable(false);
    });
  }

  function addLike() {
    setLiked(true);
    const URL = `https://backlinkr.herokuapp.com/likes`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(URL, { id }, config);
    promise.then(() => {
      window.location.reload(false);
    });
    promise.catch((e) => {
      alert(e);
    });
  }
  function removeLike() {
    setLiked(false);
    console.log(id, token);
    const URL = `https://backlinkr.herokuapp.com/likes/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.delete(URL, config);
    promise.then(() => {
      window.location.reload(false);
    });
    promise.catch((e) => {
      alert(e.message);
    });
  }
  
  function messageLikes () {
    if(likesCount===0){
      return `Ninguém curtiu esse post ainda`
    } else if (likesCount===1){
      return `${likes[0]?.name}`
    } else if (likesCount===2){
      return `${likes[0]?.name} e ${likes[1]?.name}`
    } else {
      return `${likes[0]?.name},${likes[1]?.name} e outras ${likesCount-2} pessoas`
    }
  }
  console.log(messageLikes())
    return (
        <Container>
            <div>
                <Link to={"/user/"+idUser}>
                    <img src={userOwner.picture} alt="" />
                </Link>
                <Heart>
                    {
                        liked ?
                            <FaHeart style={{color:'#AC0000'}} onClick={removeLike} />
                            :
                            <FaRegHeart onClick={addLike} />
                    }
                    <p data-tip={messageLikes()}>{likesCount} likes</p>
                <ReactTooltip />
                </Heart>
                
            </div>
            <span>
                <div>
                    <Link to={"/user/"+idUser}>
                        <h2>{userOwner.name}</h2>
                    </Link>
                    {userData[0]?.id === userOwner.id?
                        <Icons>
                            <MdEdit onClick={() => handleEdit('ClickIcon')} />
                            <AiFillDelete onClick={() => openModal(id)} />
                        </Icons>
                        :
                        ""
                    }
                </div>
                {editPost ?
                    <InputFocus />
                    :
                    <ReactTagify
                        tagStyle={tagStyle}
                        tagClicked={(tag) => navigate(`/hashtag/${textWithoutHashtag(tag)}`)}
                    >
                        <p>{currComment}</p>
                    </ReactTagify>}

        <URLdiv href={urlData.url} target="_blank" rel="noreferrer">
          <span>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{url}</p>
          </span>
          <div>
            <img src={urlData.image} alt="" />
          </div>
        </URLdiv>
      </span>
    </Container>
  );
}

const tagStyle = {
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  background-color: #171717;
  border-radius: 10px;
  padding: 18px;
  margin: 15px 0;
  img {
    border-radius: 50px;
    width: 50px;
    height: 50px;
  }
  > div {
    width: 50px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    font-size: 20px;
    color: #ffffff;
    margin: 8px 0 10px 0;
  }
  p {
    font-size: 17px;
    color: #b7b7b7;
    width: 100%;
    text-align: start;
  }
  span {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  span > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1130px) {
    margin: 5px 0;
    padding: 12px;
    border-radius: 0;
    img {
      width: 40px;
      height: 40px;
    }
    > div {
      width: 40px;
      margin-right: 15px;
    }
    h2 {
      font-size: 18px;
    }
    p {
      font-size: 15px;
    }
  }
`;

const Icons = styled.div`
  width: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 20px;

  @media (max-width: 1130px) {
    font-size: 18px;
  }
`;
const Heart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  color: #ffffff;
  font-size: 20px;
  p {
    font-size: 11px;
    text-align: center;
    line-height: 18px;
  }
`;
const EditInput = styled.textarea`
  opacity: ${({ changeOpacity }) => (changeOpacity ? "0.5" : "1")};
  border: none;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  font-family: "Lato", sans-serif;
  color: #4c4c4c;
  padding: 5px 10px;
  box-sizing: border-box;
  @media (max-width: 1130px) {
    font-size: 14px;
  }
`;

const URLdiv = styled.a`
  display: flex;
  align-items: center;
  margin-top: 15px;
  box-sizing: border-box;
  height: 160px;
  width: 100%;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  overflow: hidden;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 100%;
    overflow: hidden;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 0;
  }
  span {
    width: 70%;
    padding: 25px;
    box-sizing: border-box;
  }
  p {
    color: #9b9595;
    font-size: 12px;
    margin: 10px 0;
    line-height: 13px;
  }
  p:last-child {
    color: #cecece;
  }
  h3 {
    color: #cecece;
    font-size: 16px;
    text-align: start;
  }

  @media (max-width: 1130px) {
    height: 120px;
    h3 {
      font-size: 10px;
    }
    p {
      font-size: 9px;
      margin: 5px 0;
    }
    span {
      padding: 8px;
    }
  }
`;

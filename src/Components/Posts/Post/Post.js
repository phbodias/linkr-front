import { Container, tagStyle, Icons, Heart, RepostStyle, EditInput, URLdiv } from "./PostStyle";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import UrlContext from "../../../contexts/UrlContext";
import ReactTooltip from "react-tooltip";


export default function Post({
  id,
  userOwner,
  urlData,
  description,
  likesCount,
  repostCount,
  likes,
  reposts,
  openModal,
  idUser,
}) {


  const { userData } = useContext(UserContext);
  const URL = useContext(UrlContext);
  const [currDescription, setDescription] = useState(description);
  const [editPost, setEditMode] = useState(false);
  const [disable, setDisable] = useState(false);
  const token = localStorage.getItem("tokenLinker");
  const navigate = useNavigate();


  function textWithoutHashtag(text) {
    return text?.replace("#", "");
  }

  useEffect(() => {
    setDescription(description);
  }, [description]);

  let urlDescription = formatUrlData(urlData.urlDescription, "description");
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
        value={currDescription}
        onChange={(e) => setDescription(e.target.value)}
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
        setDescription(description);
        setEditMode(false);
        break;
      case "ClickIcon":
        if (editPost) setDescription(description);
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
      { description: currDescription },
      config
    );
    promise.then(() => {
      window.location.reload(false);
    });
    promise.catch(error => {
      if(error.response.status===401){
        navigate("/")
    } else {
      alert("Your changes could not be saved");
    }
      setDisable(false);
    });
  }

  function addLike() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(`${URL}/likes`, { id }, config);
    promise.then(() => {
      window.location.reload(false);
    });
    promise.catch(error => {
      if(error.response.status===401){
        navigate("/")
    } else {
        alert("The post could not be liked");
    }
    });
  }
  function removeLike() {
    console.log(id, token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.delete(`${URL}/likes/${id}`, config);
    promise.then(() => {
      window.location.reload(false);
    });
    promise.catch(error => {
      if(error.response.status===401){
      navigate("/")
  } else {
      alert("The post could not be disliked");
  }
    });
  }

  function messageLikes() {
    if (likesCount === 0) {
      return `Ninguém curtiu esse post ainda`;
    } else {
      let user1 = "";
      if (likes.filter((l) => l.id === userData[0]?.id).length > 0) {
        user1 = "Você";
      } else user1 = likes[0]?.name;
      if (likesCount === 1) {
        return `${user1} curtiu`;
      } else if (likesCount === 2) {
        return `${user1} e ${likes[1]?.name} curtiram`;
      } else {
        return `${user1},${likes[1]?.name} e outras ${likesCount - 2} pessoas curtiram`;
      }
    }
  }

  return (
    <Container>
      <div>
        <Link to={"/user/" + idUser}>
          <img src={userOwner.picture} alt="" />
        </Link>
        <Heart>
          {likes.filter((l) => l.id === userData[0]?.id).length > 0 ? (
            <FaHeart style={{ color: "#AC0000" }} onClick={removeLike} />
          ) : (
            <FaRegHeart onClick={addLike} />
          )}
          <p data-tip={messageLikes()}>
            {likesCount} likes</p>
          <ReactTooltip />
        </Heart>

        <RepostStyle>
          <BiRepost onClick={() => openModal(id,'repost')} />
          <p>{repostCount} re-posts</p>
        </RepostStyle>
      </div>
      <span>
        <div>
          <Link to={"/user/" + idUser}>
            <h2>{userOwner.name}</h2>
          </Link>
          {userData[0]?.id === userOwner.id ? (
            <Icons>
              <MdEdit onClick={() => handleEdit("ClickIcon")} />
              <AiFillDelete onClick={() => openModal(id,'delete')} />
            </Icons>
          ) : (
            ""
          )}
        </div>
        {editPost ? (
          <InputFocus />
        ) : (
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) =>
              navigate(`/hashtag/${textWithoutHashtag(tag)}`)
            }
          >
            <p>{currDescription}</p>
          </ReactTagify>
        )}

        <URLdiv href={urlData.url} target="_blank" rel="noreferrer">
          <span>
            <h3>{title}</h3>
            <p>{urlDescription}</p>
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


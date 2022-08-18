import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState, useContext } from "react";
// import styled from "styled-components";
import Post from "../Components/Posts/Post/Post";
import { FeedPage } from "../Components/shared/Feed/FeedPage";
import UrlContext from "../contexts/UrlContext";
import { Follow, Unfollow } from "../Components/shared/Feed/FeedStyle";

export default function TelaUser() {
  const URL = useContext(UrlContext);
  const [postList, setPostList] = useState(null);
  const [hashtags, setHashtags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [isFriend, setIsFriend] = useState(false);

  const token = localStorage.getItem("tokenLinker");
  const { id } = useParams();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    const promise = axios.get(`${URL}/posts/${id}`, config);
    promise.then((response) => {
      setPostList(response.data);
    });
    promise.catch((error) => {
      alert("Erro ao pegar os posts");
    });

    axios
      .get(`${URL}/user/${id}`, config)
      .then((res) => {
        console.log(res.data[0]);
        setName(res.data[0].name);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${URL}/hashtags`, config)
      .then((res) => {
        const arrayHashtags = [];
        for (const hash of res.data) {
          arrayHashtags.push(hash.text);
        }
        setHashtags([...arrayHashtags]);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(
          "An error occured while trying to fetch the trenddins, please refresh the page"
        );
        setLoading(false);
      });

    const friends = axios.get(`${URL}/follow`, config);
    friends
      .then((res) => {
        if (res.data.filter((friend) => friend.id === id).length > 0)
          setIsFriend(true);
        console.log(isFriend);
      })
      .catch((e) => alert(e.message));
  }, [token, id, URL, isFriend]);

  function follow() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.post(`${URL}/follow/${id}`, config);
    axios
      .then((res) => {
        setIsFriend(true);
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  function follow() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.delete(`${URL}/follow/${id}`, config);
    axios
      .then((res) => {
        setIsFriend(false);
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  function postsList(openModal) {
    return postList?.length > 0 ? (
      postList.map((p, index) => (
        <Post
          key={index}
          id={p.postId}
          userOwner={p.userOwner}
          urlData={p.urlData}
          description={p.description}
          likesCount={p.likesCount}
          likes={p.likes}
          openModal={openModal}
          idUser={p.userOwner.id}
        />
      ))
    ) : loading || !postList || !hashtags ? (
      <p>There are no posts yet</p>
    ) : (
      <ThreeDots color="#FFF" height={50} width={100} />
    );
  }

  return (
    <>
      <FeedPage
        title={`${name}'s Posts`}
        posts={postsList}
        hashtags={hashtags}
      />
      {isFriend ? <Unfollow>Unfollow</Unfollow> : <Follow onClick={() => follow()}>Follow</Follow>}
    </>
  );
}

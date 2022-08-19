import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState, useContext, useCallback } from "react";
import Post from "../Components/Posts/Post/Post";
import { FeedPage } from "../Components/shared/Feed/FeedPage";
import UrlContext from "../contexts/UrlContext";
import { Follow, Unfollow } from "../Components/shared/Feed/FeedStyle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function TelaUser() {
  const URL = useContext(UrlContext);
  const { id } = useParams();
  const userLoggedId = localStorage.getItem("userLinkerId") === useParams().id;
  const [postList, setPostList] = useState(null);
  const [hashtags, setHashtags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [name, setName] = useState("");
  const [isFriend, setIsFriend] = useState(false);
  const token = localStorage.getItem("tokenLinker");
  const navigate = useNavigate();

  const loadPostList = useCallback( () => {
        
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    setLoading(true);
    const promise = axios.get(`${URL}/posts/${id}`, config);
    promise.then(response => {
        setPostList(response.data)
        
    });
    promise.catch((error) => {
        if(error.response.status===401){
            navigate("/")
        } else {
            alert("An error occured while trying to fetch the posts, please refresh the page");
        }
    });
},[]);


  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    
    loadPostList();

    axios
      .get(`${URL}/user/${id}`, config)
      .then((res) => {
        console.log(res.data[0]);
        setName(res.data[0].name);
      })
      .catch((error) => {
        if(error.response.status===401){
            navigate("/")
        } else {
            alert("An error occured while trying to fetch the user, please refresh the page");
        }
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
      .catch((error) => {
        setLoading(false);
        if(error.response.status===401){
            navigate("/")
        } else {
            alert("An error occured while trying to fetch the user, please refresh the page");
        }
      });

    const friends = axios.get(`${URL}/follow`, config);
    friends
      .then((res) => {
        if (
          res.data.filter((friendId) => friendId === parseInt(id)).length > 0
        ) {
          setIsFriend(true);
        } else {
          setIsFriend(false);
        }
      })
      .catch((e) => alert(e.message));
  }, [token, id, URL, isFriend]);

  function follow() {
    setLoadingFollow(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(`${URL}/follow/${parseInt(id)}`, {}, config);
    promise
      .then((res) => {
        setIsFriend(true);
        setLoadingFollow(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoadingFollow(false);
      });
  }

  function unfollow() {
    setLoadingFollow(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.delete(`${URL}/follow/${id}`, config);
    promise
      .then((res) => {
        setIsFriend(false);
        setLoadingFollow(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoadingFollow(false);
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
          repostCount={p.repostCount}
          repostedBy={p.repostedBy}
          likes={p.likes}
          openModal={openModal}
          idUser={p.userOwner.id}
          loadPostList={loadPostList}
        />
      ))
    ) : loading || !postList || !hashtags ? (
      <NoPosts>There are no posts yet</NoPosts>
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
        loadPostList={loadPostList}
      />
      {!userLoggedId ? (
        loadingFollow ? (
          <Follow>
            <ThreeDots color="#FFF" height={50} width={100} />
          </Follow>
        ) : isFriend ? (
          <Unfollow onClick={unfollow}>Unfollow</Unfollow>
        ) : (
          <Follow onClick={follow}>Follow</Follow>
        )
      ) : (
        ""
      )}
    </>
  );
}

const NoPosts = styled.div`
  text-align: center;
  font-size: 25px;
`;

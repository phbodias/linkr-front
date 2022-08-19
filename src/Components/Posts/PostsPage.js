import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Post from "./Post/Post";
import { FeedPage } from "../shared/Feed/FeedPage";
import UrlContext from "../../contexts/UrlContext";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { TailSpin } from "react-loader-spinner";

export default function PostsPage() {
  const URL = useContext(UrlContext);
  const [postList, setPostList] = useState([]);
  const [hashtags, setHashtags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(0);
  const token = localStorage.getItem("tokenLinker");
  const navigate = useNavigate();

  const loadPostList = useCallback(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    const promise = axios.get(`${URL}/posts/?limit=4`, config);
    promise.then((response) => {
        if (postList.length === 0) setPostList(response.data);
    });
    promise.catch((error) => {
      if (error.response.status === 401) {
        navigate("/");
      } else {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      }
    });
  }, []);

  function load() {
    console.log("Load aqui");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    setLimit(postList.length + 2);
    const promise = axios.get(`${URL}/posts/?limit=${limit + 2}`, config);
    promise.then((response) => {
      console.log(response.data);
      if (response.data.length > postList.length) {
        setHasMore(true);
        setPostList(response.data);
      } else setHasMore(false);
    });
    promise.catch((error) => {
      if (error.response.status === 401) {
        navigate("/");
      } else {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      }
    });
  }

  function postsList(openModal) {
    return postList?.length > 0 ? (
      <InfiniteScroll
        pageStart={0}
        loadMore={load}
        hasMore={hasMore}
        loader={
          <TailSpin
            key={Math.random()}
            height="50"
            width="50"
            color="#fff"
            radius="1"
          />
        }
      >
        {postList.map((p, index) => (
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
        ))}
      </InfiniteScroll>
    ) : loading || !postList || !hashtags ? (
      <ThreeDots color="#FFF" height={50} width={100} />
    ) : (
      <p>No posts found from your friends</p>
    );
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);

    loadPostList();

    axios
      .get(`${URL}/hashtags`, config)
      .then((res) => {
        const arrayHashtags = [];
        for (const hash of res.data) {
          arrayHashtags.push(hash.text);
        }
        setHashtags([...arrayHashtags]);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        } else {
          alert(
            "An error occured while trying to fetch the trendings, please refresh the page"
          );
        }
        setLoading(false);
      });

    axios
      .get(`${URL}/follow`, config)
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/");
        } else {
          alert(
            "An error occured while trying to fetch the trendings, please refresh the page"
          );
        }
      });
  }, [token, URL, limit]);

  return (
    <FeedPage
      title="timeline"
      forms={true}
      posts={postsList}
      hashtags={hashtags}
      friends={friends}
      loadPostList={loadPostList}
    />
  );
}

import { useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Post from "../Components/Posts/Post/Post";
import { FeedPage } from "../Components/shared/Feed/FeedPage";
import UrlContext from "../contexts/UrlContext";
import styled from "styled-components";


export default function HashtagPage() { 

    const URL = useContext(UrlContext);
    const [postList, setPostList] = useState(null);
    const [hashtags, setHashtags] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('tokenLinker');

    const { hashtag } = useParams();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        setLoading(true);
        const promise = axios.get(`${URL}/hashtags/${hashtag}`, config);
        promise.then(response => {
            setPostList(response.data);

        });
        promise.catch((error) => {
            console.log(error.response.data);
            alert("An error occured while trying to fetch the posts, please refresh the page");

        });

        axios.get(`${URL}/hashtags`, config)
            .then(res => {
                const arrayHashtags = [];
                for (const hash of res.data) {
                    arrayHashtags.push(hash.text);
                }
                setHashtags([...arrayHashtags]);
            })
            .catch(err => {
                console.log(err.response.data);
                alert("An error occured while trying to fetch the trenddins, please refresh the page");
                setLoading(false);
            });


    }, [token, hashtag, URL]);


    function postsList(openModal) {
        return (
            postList?.length > 0 ?
                postList.map((p, index) =>
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
                    />
                )
                :
                loading || !postList || !hashtags ?
                    <ThreeDots color="#FFF" height={50} width={100} />
                    :
                    <NoPosts>There are no posts yet</NoPosts>

        );
    }

    return (
        <FeedPage title={`# ${hashtag}`} posts={postsList} hashtags={hashtags} />
    )
}

const NoPosts = styled.div`
  text-align: center;
  font-size: 25px;
`;


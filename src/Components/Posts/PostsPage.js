import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Post from "./Post/Post";
import { FeedPage } from "../shared/Feed/FeedPage";
import UrlContext from "../../contexts/UrlContext";
import { useNavigate } from "react-router-dom";



export default function PostsPage() {
    const URL = useContext(UrlContext);
    const [postList, setPostList] = useState(null);
    // const [clickedComments, setClickedComments] = useState([]);
    const [hashtags, setHashtags] = useState(null);
    const [loading, setLoading] = useState(false);
    const [friends, setFriends] = useState(null)
    const token = localStorage.getItem('tokenLinker');
    const navigate = useNavigate();
    
    const loadPostList = useCallback( () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        setLoading(true);
        const promise = axios.get(`${URL}/posts`, config);
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

    function postsList (openModal) {
        return(
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
                    loadPostList={loadPostList}
                />
            )
            :
            loading || !postList || !hashtags ?
                <ThreeDots color="#FFF" height={50} width={100} />
                :
                <p>No posts found from your friends</p>
    );
}


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        setLoading(true);

        loadPostList();

        axios.get(`${URL}/hashtags`, config)
            .then(res => {
                const arrayHashtags = [];
                for (const hash of res.data) {
                    arrayHashtags.push(hash.text);
                }
                setHashtags([...arrayHashtags]);
                setLoading(false);
            })
            .catch(error => {
                if(error.response.status===401){
                    navigate("/")
                } else {
                    alert("An error occured while trying to fetch the trendings, please refresh the page");
                }
                setLoading(false);
            });


            axios.get(`${URL}/follow`, config)
            .then(res=>{
                setFriends(res.data)
            })
            .catch(err=>{
                if(err.response.status===401){
                    navigate("/")
                } else {
                    alert("An error occured while trying to fetch the trendings, please refresh the page");
                }
            })

    }, [token, URL, loadPostList]);

    return (
            <FeedPage title='timeline' forms={true} posts={postsList} hashtags={hashtags} friends={friends} loadPostList={loadPostList}/>
    );
}
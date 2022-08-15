import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Post from "../Components/Posts/Post";
import { FeedPage } from "../shared/Feed/FeedPage";


export default function HashtagPage() {
    const [postList, setPostList] = useState(null);
    const [hashtags, setHashtags] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const token = localStorage.getItem('tokenLinker');

    const {hashtag} = useParams();

    useEffect(() => {
        const URL = 'https://backlinkr.herokuapp.com';
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
            .then( res => {
                const arrayHashtags=[];
                for (const hash of res.data){
                    arrayHashtags.push(hash.text);
                }
                setHashtags([...arrayHashtags]);
            })
            .catch(err => {
                console.log(err.response.data);
                alert("An error occured while trying to fetch the trenddins, please refresh the page");
                setLoading(false);
            });

        
    }, [token, hashtag]);


    const postsList= (
        postList?.length > 0 ?
            postList.map((p,index) =>
                <Post
                    key={index}
                    id={p.postId}
                    userData={p.userOwner}
                    urlData={p.urlData}
                    comment={p.comment}
                    likesCount={p.likesCount}
                    likes={p.likes}
                    idUser={p.userOwner.id}
                />
            )
            :
            loading || !postList || !hashtags  ?
                <ThreeDots color="#FFF" height={50} width={100} />
                :
                <p>There are no posts yet</p>
        
    );
    
    return (
        <FeedPage title={`# ${hashtag}`} posts={postsList} hashtags={hashtags}  />
    )
}


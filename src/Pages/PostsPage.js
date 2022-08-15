import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import Post from "../Components/Posts/Post";
import { FeedPage } from "../shared/Feed/FeedPage";
import UserContext from "../contexts/UserContext";
import UrlContext from "../contexts/UrlContext";


export default function PostsPage() {
    const URL = useContext(UrlContext);
    console.log(URL);
    const { userData } = useContext(UserContext);
    const [postList, setPostList] = useState(null);
    const [hashtags, setHashtags] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('tokenLinker');
    const [newPost, setNewPost] = useState({
        url: "",
        comment: ""
    })
    
    function postsList (openModal) {
        return(
        postList?.length > 0 ?
            postList.map((p, index) =>
                <Post
                    key={index}
                    id={p.postId}
                    userOwner={p.userOwner}
                    urlData={p.urlData}
                    comment={p.comment}
                    likesCount={p.likesCount}
                    likes={p.likes}
                    openModal={openModal}
                    idUser={p.userOwner.id}
                />
            )
            :
            loading || !postList || !hashtags ?
                <ThreeDots color="#FFF" height={50} width={100} />
                :
                <p>There are no posts yet</p>
    );
}

    const forms = (
        <CreatePost disable={loading}>
            <img src={userData[0]?.profilePic} alt="" />
            <form onSubmit={createNewPost}>
                <h2>What are you going to share today?</h2>
                <input
                    type='url'
                    name='url'
                    placeholder="Link to share"
                    value={newPost.url}
                    onChange={handleInputChange}
                    required
                    disabled={loading} />
                <textarea
                    type='text'
                    rows='3'
                    name='comment'
                    placeholder="Comment"
                    value={newPost.comment}
                    onChange={handleInputChange}
                    disabled={loading} />
                <button
                    type='submit'
                    disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish'}
                </button>
            </form>
        </CreatePost>);

    useEffect(() => {
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
                setLoading(false);
            })
            .catch(err => {
                console.log(err.response.data);
                alert("An error occured while trying to fetch the trenddins, please refresh the page");
                setLoading(false);
            });

    }, [token]);

    function createNewPost(e) {
        e.preventDefault();
        setLoading(true);
        // const URL = 'https://backlinkr.herokuapp.com/posts';
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(`${URL}/posts`, newPost, config)
        promise.then(() => {
            window.location.reload(false);
        })
        promise.catch((error) => {
            console.log(error.response.data);
            alert('Houve um erro ao publicar seu link')
            setLoading(false);
        })
    }

    function handleInputChange(e) {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    }


    return (
            <FeedPage title='timeline' forms={forms} posts={postsList} hashtags={hashtags} />
    );
}



const CreatePost = styled.div`
background-color:#FFFFFF;
margin-bottom:15px;
display:flex;
border-radius:10px;
padding:18px 24px;
width:100%;
box-sizing:border-box;
position:relative;
img{
    border-radius:50px;
    height:50px;
}
h2{
    font-size:20px;
    color:#707070;
    margin:8px 0 15px 0;
    font-weight:300;
}
form{
    padding:0 0 32px 20px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    width:100%;
}
input, textarea{
    opacity:${({ disable }) => disable ? '0.5' : '1'};
    width:100%;
    box-sizing:border-box;
    background-color:#EFEFEF;
    font-family:'Lato', sans-serif;
    color:#949494;
    font-weight:300;
    font-size:15px;
    border:none;
    border-radius:5px;
    padding:10px 15px;
    margin-bottom:5px;
}
textarea{
    height:70px;
}

button{
    opacity:${({ disable }) => disable ? '0.5' : '1'};
    position:absolute;
    right:24px;
    bottom:18px;
    border:none;
    border-radius:5px;
    background-color:#1877F2;
    color:#FFFFFF;
    font-size:14px;
    font-weight:700;
    width:120px;
    height:30px;
}

@media (max-width: 1130px) {
    padding: 10px 18px;
    margin-bottom:8px;
    border-radius:0;
    h2{
        font-size:18px;
        text-align:center;
        width:100%;
    }
    img{
        display:none;
    }
    input,textarea{
        font-size:13px;
    }
    textarea{
        height:54px;
    }
    button{
        height:22px;
        bottom:12px;
        right:18px;
    }
    form{
        padding:0 0 28px 0;
    }
  }
`
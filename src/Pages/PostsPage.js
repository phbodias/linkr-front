import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import Post from "../Components/Posts/Post";
import { FeedPage } from "../shared/Feed/FeedPage";

export default function PostsPage() {
    const { userData } = useContext(UserContext);
    const [postList, setPostList] = useState(null);
    const [hashtags, setHashtags] =useState(null);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    const [newPost, setNewPost] = useState({
        url: "",
        comment: ""
    })
    const token = localStorage.getItem('tokenLinker');

    useEffect(() => {
        const URL = 'https://backlinkr.herokuapp.com';
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
            setLoading(false);
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

    }, [token]);

    

    function createNewPost(e) {
        e.preventDefault();
        console.log(newPost)
        setDisable(true);
        const URL = 'https://backlinkr.herokuapp.com/posts';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(URL, newPost, config)
        promise.then(() => {
            window.location.reload(false);
        })
        promise.catch((error) => {
            console.log(error.response.data);
            alert('Houve um erro ao publicar seu link')
            setDisable(false);
        })
    }

    function handleInputChange(e) {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    }

    const forms = (
    <CreatePost disable={disable}>
                <img src={userData.profilePic} alt="" />
                <form onSubmit={createNewPost}>
                    <h2>What are you going to share today?</h2>
                    <input
                        type='url'
                        name='url'
                        placeholder="Link to share"
                        value={newPost.url}
                        onChange={handleInputChange}
                        required
                        disabled={disable} />
                    <input
                        type='text'
                        name='comment'
                        placeholder="Comment"
                        value={newPost.comment}
                        onChange={handleInputChange}
                        disabled={disable} />
                    <button
                        type='submit'
                        disabled={disable}>
                        {disable ? 'Publishing...' : 'Publish'}
                    </button>
                </form>
    </CreatePost>);

    const postsList= (
        postList?.length > 0 ?
            postList.map((p,index) =>
                <Post
                    key={index}
                    name={p.userName}
                    profilePic={p.profilePic}
                    urlData={p.postUrl}
                    comment={p.postComment}
                    likes={p.likes}
                />
            )
            :
            loading || !postList || !hashtags  ?
                <ThreeDots color="#FFF" height={50} width={100} />
                :
                <p>There are no posts yet</p>
        
    );
        console.log(hashtags);
    return (
        <FeedPage title='timeline' forms={forms} posts={postsList} hashtags={hashtags} />
    )
}

// const Container = styled.div`
// background-color:#333333;
// height:100%;
// width:100%;
// display:flex;
// flex-direction:column;
// align-items:center;
// box-sizing:border-box;
// padding:100px 0 500px 0;
// h1{
//     font-family: 'Oswald', sans-serif;
//     font-size:44px;
//     font-weight:bold;
//     margin:30px 0;
//     width:40%;
//     color:#FFFFFF;
// }
// `;

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
input{
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
`

// const Timeline = styled.div`
// width:50%;
// box-sizing:border-box;
// display:flex;
// flex-direction:column;
// align-items:center;
// font-size:20px;
// color:#FFFFFF;
// margin:8px 0;
// text-align:center;
// `
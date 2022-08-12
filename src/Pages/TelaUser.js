import React from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import styled from "styled-components";
import Post from "../Components/Posts/Post"
import { FeedPage } from "../shared/Feed/FeedPage";



export default function TelaUser(){

    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('')
    const [hashtags, setHashtags] =useState(null);
    

  
    const {id} = useParams()
    const token = localStorage.getItem('tokenLinker');

    React.useEffect(()=>{
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        setLoading(true);

        const users = axios.get(`http://localhost:4001/user/${id}`)
        users.then(getUserSucess)
        users.catch(getUserFail)

        const posts = axios.get(`http://localhost:4001/posts/${id}`)
        posts.then(getPostSucess)
        posts.catch(getUserFail)

        axios.get(`https://backlinkr.herokuapp.com/hashtags`, config)
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

    },[token,id])


    function getUserSucess(response){
         setUser(response.data)
         setLoading(false);
    }

    function getUserFail(){
        console.log('fail')
        setLoading(false);
    }

    function getPostSucess(response){
        setPostList(response.data)
        console.log(response.data)
    }

   

    

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
            loading || !postList ?
                <ThreeDots color="#FFF" height={50} width={100} />
                :
                <p>There are no posts yet</p>
        
    );

    return(
        <FeedPage title={`${user[0]?.name}'s posts`} posts={postsList} hashtags={hashtags}  />
    )
}

const Timeline = styled.div`
width:50%;
box-sizing:border-box;
display:flex;
flex-direction:column;
align-items:center;
font-size:20px;
color:#FFFFFF;
margin:8px 0;
text-align:center;
`

const Pa = styled.p`
color: black;
`
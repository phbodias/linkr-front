import React from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState, useContext} from "react";
import styled from "styled-components";
import Post from "../Components/Posts/Post"
import { FeedPage } from "../shared/Feed/FeedPage";
import UrlContext from "../contexts/UrlContext";





export default function TelaUser(){
    const URL = useContext(UrlContext);
    const [postList, setPostList] = useState(null);
    const [hashtags, setHashtags] = useState(null);
    const [loading, setLoading] = useState(false);
    let name;

    if(postList!=null && postList.length>0){
        console.log('entrou no if nao nulo')
        name = postList[0].userOwner.name
    }
    
    const token = localStorage.getItem('tokenLinker');
    console.log(token)
    const {id} = useParams();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        setLoading(true);
        const promise = axios.get(`${URL}/posts/${id}`,config);
        promise.then(response => {
            setPostList(response.data);
           
        });
        promise.catch((error) => {
            console.log(error.response.data);
            alert("Erro ao pegar os posts");
         
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

        
    }, [token, id]);


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
                <p>There are no posts yet</p>
                :
                <ThreeDots color="#FFF" height={50} width={100} />
        
    );
    
    return (
        <FeedPage title={`${name}'s Posts`} posts={postsList} hashtags={hashtags}  />
    )
}




const Container = styled.div`
background-color:#333333;
height:100%;
width:100%;
display:flex;
flex-direction:column;
align-items:center;
box-sizing:border-box;
padding:100px 0 500px 0;
h1{
    font-family: 'Oswald', sans-serif;
    font-size:44px;
    font-weight:bold;
    margin:30px 0;
    width:50%;
    color:#FFFFFF;
}

@media (max-width: 1130px) {
    padding-top: 0;
    h1{
        font-size:34px;
        width:100%;
        margin:20px 0;
    }
  }

`

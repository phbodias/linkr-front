import React from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import styled from "styled-components";
import Post from "../Components/Posts/Post" 



export default function TelaUser(){

    const token = localStorage.getItem('tokenLinker');
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);

    //console.log(postList)

    const {id} = useParams()

    React.useEffect(()=>{
        const promisse = axios.get(`http://localhost:4001/user/${id}`)

        promisse.then(getUserSucess)
        promisse.catch(getUserFail)
    },[token])

    function getUserSucess(response){
         setPostList(response.data)
    }

    function getUserFail(){
        console.log('fail')
    }

    return(
    <Timeline>
        {postList?.length > 0 ?
            postList.map((p,index) =>
                <Pa key={index}>{p.userId}</Pa>
            )
            :
            loading ?
                <ThreeDots color="#FFF" height={50} width={100} />
                :
                <p>There are no posts yet</p>
        }

    </Timeline>
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
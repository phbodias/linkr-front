import React, { useEffect , useContext} from "react";
import styled from "styled-components";
import useInterval from "use-interval";
import {AiOutlineReload} from "react-icons/ai"
import UrlContext from "../../contexts/UrlContext"
import axios from "axios";

export default function SearchNewUpdates(){

    const URL = useContext(UrlContext);
    const [arrPosts , setArrPosts] = React.useState([])
    const [arrUpdatePosts, setArrUpdatePosts] = React.useState([])
    const token = localStorage.getItem('tokenLinker');

    let visible = false

    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    console.log(arrPosts)
    console.log(arrUpdatePosts)
    
    useEffect(()=>{
        const promise = axios.get(`${URL}/posts`, config);
        promise.then(response => {
            let arr = []
            for(let i=0; i<response.data.length;i++){
                arr.push(response.data[i].postId)
            }
            setArrPosts(arr)
        });
        promise.catch((error) => {
            console.log(error.response.data);
            alert("error useEffect do search nwe update postes ");
        });

        console.log('useEffect')
    },[]);

    useInterval(()=>{
        const promise = axios.get(`${URL}/posts`, config);
        promise.then(response => {
            let arr = []
            for(let i=0; i<response.data.length;i++){
                arr.push(response.data[i].postId)
            }
            setArrUpdatePosts(arr)
        });
        promise.catch((error) => {
            console.log(error.response.data);
            alert("error useEffect do search nwe update postes ");
        });
        

        console.log('setinterval')
    },15000)

    let dif = arrUpdatePosts.filter(item=>!arrPosts.includes(item))

   
    if(dif.length!=0){
         visible=true
    }

    return(
        <AreaNewPost visible={visible} onClick={()=>window.location.reload(true)}>
            <div>
                <div>
                {dif.length} new posts, load more!<AiOutlineReload/> 
                </div>
            </div>
        </AreaNewPost>
    )
}

const AreaNewPost = styled.div`
    visibility: ${props => props.visible?"visible":"hidden"};
    width: 611px;
    height: 61px;
    background-color: #1877F2;
    text-align: center;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #FFFFFF;
    margin: 10px;
    padding: 10px;
    cursor:pointer;
    div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
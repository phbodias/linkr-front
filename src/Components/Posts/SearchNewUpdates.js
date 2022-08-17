import React, { useEffect , useContext} from "react";
import styled from "styled-components";
import useInterval from "use-interval";
import {AiOutlineReload} from "react-icons/ai"
import UrlContext from "../../contexts/UrlContext"
import axios from "axios";

export default function SearchNewUpdates(){

    const URL = useContext(UrlContext);
    const [oldValue, setOldValue] = React.useState(0)
    const [currentValue, setcurrentValue] = React.useState(0)
    const [postList, setPostList] = React.useState(null);
    const token = localStorage.getItem('tokenLinker');
    

    let visible = false

    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    console.log(oldValue)
    console.log(currentValue)
    
    useEffect(()=>{
        const promise = axios.get(`${URL}/posts`, config);
        promise.then(response => {
            setOldValue(response.data.length)
            setcurrentValue(response.data.length)

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
            if(response.data.length>oldValue){
                setcurrentValue(response.data.length)
            }
            

        });
        promise.catch((error) => {
            console.log(error.response.data);
            alert("erro no set interval ");
        });

        console.log('setinterval')
    },15000)

  
    if(currentValue>oldValue){
        visible=true
    }


    return(
        <>
        <AreaNewPost visible={visible} onClick={()=>window.location.reload(true)}>
            <div>
                {currentValue-oldValue} new posts, load more!<AiOutlineReload/> 
            </div>
        </AreaNewPost>
        <h1>dsadsadsadsads</h1>
        </>
    )
}

const AreaNewPost = styled.div`
    visibility: ${props => props.visible?"visible":"hidden"};
    width: 611px;
    height: 61px;
    background-color: #1877F2;
    text-align: center;
    border-radius: 16px;
    vertical-align: middle;
    display: table-cell;
    font-size: 16px;
    color: #FFFFFF;

    div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
import React from "react"
import { useParams } from "react-router-dom"
import axios from "axios"



export default function TelaUser(){

    const {id} = useParams()

    React.useEffect(()=>{
        const promisse = axios.get(`http://localhost:4001/user/${id}`)

        promisse.then(getUserSucess)
        promisse.catch(getUserFail)
    },[])

    function getUserSucess(response){
        console.log(response.data)
    }

    function getUserFail(){
        console.log('fail')
    }

    return(
        <h1>Tela de usuario id: {id}</h1>
    )
}
import  { DebounceInput }  from  'react-debounce-input' ;
import React from 'react';
import axios from "axios";
import styled from "styled-components";


import CardUser from './CardUser';


export default function InputSeachUsers(){

    const [users, setUsers] = React.useState("")
    const [searchWords, setsearchWords] = React.useState("")
    const [activeButton, setActiveButton] = React.useState(false)
    
  

    React.useEffect(()=>{
        const URL = `http://localhost:4001/busca/${searchWords}`
        const getUsersByName = axios.get(URL)
        getUsersByName.then(getUsersByNameSucess)
        getUsersByName.catch(getUsersByNameFail)
            
    },[searchWords])
    
    function getUsersByNameSucess(response){
        console.log(response)
        setUsers(response.data)
    }

    function getUsersByNameFail(error){
        console.log(error)
    }

    function showUsers(){
        if(users.length===0){
            return <h1>nenhum encontrado</h1>
        }
        else{
            return(
                <>
                    {users.map((el,i)=><CardUser name={el.name} profilePic={el.profilePic}/>)}
                </>
            )
            
        }
    }

    return(
    <>

    <Body selecionado={activeButton} onClick={()=>setActiveButton(!activeButton)}>

        <Input >
            <DebounceInput 
            minLength={3} 
            debounceTimeout={300} 
            onChange={(event) => setsearchWords(event.target.value)}
            
            />
        </Input>

        <Users>
            {showUsers()}
        </Users>
        
        
    </Body>

    </>
    )
}

const Input = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;

    input{
        width:563px;
        height: 45px;
        border-radius: 8px;
        border: none;
    
    }
`

const Body = styled.div`
margin: 0 auto;
border-radius: 8px;
padding: 0;
width: 563px;
background-color:#E7E7E7;
overflow-y: scroll;
display: flex;
flex-direction: column;
`

const Users = styled.div`
    margin-top: 3px;
    width: 100%;
    height: 135px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

`
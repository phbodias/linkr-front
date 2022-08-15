import  { DebounceInput }  from  'react-debounce-input' ;
import React, {useContext} from 'react';
import axios from "axios";
import styled from "styled-components";
import CardUser from './CardUser';
import UrlContext from '../../contexts/UrlContext';


export default function InputSearchUsers(){
    const URL = useContext(UrlContext);

    const token = localStorage.getItem('tokenLinker')
    const [users, setUsers] = React.useState("")
    const [searchWords, setsearchWords] = React.useState("")
    const [activeButton, setActiveButton] = React.useState(false)
    
    console.log("renderizou")
    React.useEffect(()=>{
        console.log('useEffect')
        if(searchWords.length>2){
            const config = { 
                headers: { 
                    Authorization: `Bearer ${token}` 
                } 
            } 
            const getUsersByName = axios.get(`${URL}/busca/${searchWords}`,config)
            getUsersByName.then(getUsersByNameSucess)
            getUsersByName.catch(getUsersByNameFail)
        }
       
            
    },[searchWords,token])
    
    function getUsersByNameSucess(response){
        console.log(response)
        setUsers(response.data)
    }

    function getUsersByNameFail(error){
        console.log(error) 
        alert('Erro na requisição do input ')
    }

    function showUsers(){
        if(users.length===0){
            return <h4>NO USER FOUND</h4>
        }
        else{
            return(
                <>
                    {users.map((el,i)=><CardUser key={i} name={el.name} profilePic={el.profilePic} id={el.id}/>)}
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
            placeholder={'Search for people and friends'}
            />
        </Input>

        <Users selecionado={activeButton}>
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
height: ${props=> props.selecionado?"150px":"45px"};
background-color:#E7E7E7;
overflow-y: scroll;
display: flex;
flex-direction: column;

@media (max-width: 563px) {
    position: absolute;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 95vw;
    margin: 0 auto;
  }

  @media (min-width: 563px) and (max-width:880px) {
    width: 280px;
  }

`

const Users = styled.div`
    margin-top: 3px;
    width: 100%;
    height: 135px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    display : ${props=> props.selecionado?"block":"none"};


    h4{
        margin-top: 15px;
        text-align: center;
        color: blue;
    }
`
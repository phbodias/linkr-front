import styled from "styled-components"
import { Link } from "react-router-dom"

export default function CardUser({name, profilePic,id}){
    return(
        <Link to={"/user/"+id} >
            <Container>
                <img src={profilePic}></img>
                <p>{name}</p>
            </Container>
        </Link>
        
    )
}


const Container = styled.div`
    width: 100%;
    height: 45px;
    background-color: #E7E7E7;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    

    img{
        object-fit: cover;
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 10px;
    }

    p{
        color:#515151;
        font-size: 19px;
        font-weight: 400;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
`
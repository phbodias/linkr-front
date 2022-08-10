import styled from "styled-components"
import { Link } from "react-router-dom"

export default function CardUser({name, profilePic,id}){
    return(
        <Link to={"/user/"+id} >
            <Container>
                <img src={profilePic}></img>
                {name}
            </Container>
        </Link>
        
    )
}


const Container = styled.div`
    width: 100%;
    height: 45px;
    background-color: #E7E7E7;
    

    img{
        object-fit: cover;
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }
`
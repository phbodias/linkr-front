import styled from "styled-components"

export default function CardUser({name, profilePic}){
    return(
        <Container>
            <img src={profilePic}></img>
            {name}
        </Container>
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
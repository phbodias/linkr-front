import styled from "styled-components";

export default function Header () {
    return (
        <Container>Sou o Header</Container>
    )
}

const Container = styled.div`
font-family: 'Passion One', cursive;
pasition:fixed;
top:0;
left:0;
height:60px;
background-color:#151515;
color:#FFFFFF;
`
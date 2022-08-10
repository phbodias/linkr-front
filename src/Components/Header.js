import styled from "styled-components";
import InputSeachUsers from "./InputSeach/InputSeachUsers";

export default function Header () {
    return (
        <Container>
            <InputSeachUsers/>
        </Container>
    )
}

const Container = styled.div`
font-family: 'Passion One', cursive;
top:0;
left:0;
height:50px;
background-color:#151515;
color:#FFFFFF;
padding: 10px;
`
import styled from "styled-components";
import Post from "./Post";

export default function PostsPage() {
    const userPhoto = 'https://cdn.serif.com/affinity/img/home/0522/photo-card-090520221343--lg@2x.jpg'
    const postList = [
        {
            name: "Maria",
            profilePic: "https://cdn.serif.com/affinity/img/home/0522/photo-card-090520221343--lg@2x.jpg",
            url: "https://meyerweb.com/eric/tools/css/reset/",
            comment: "Ótimo site para css reset!",
            hashtags: ['#css', '#coding'],
            likes: ['Joana', 'Joao']
        }
    ]

    return (
        <Container>
            <h1>timeline</h1>
            <CreatePost>
                <img src={userPhoto} alt="" />
                <form>
                    <h2>What are you going to share today?</h2>
                    <input placeholder="Link to share" />
                    <input placeholder="Comment" />
                    <button>Publish</button>
                </form>
            </CreatePost>
            <Timeline>
                {postList.map(p =>
                    <Post
                        name={p.name}
                        profilePic={p.profilePic}
                        url={p.url}
                        comment={p.comment}
                        hashtags={p.hashtags}
                        likes={p.likes}
                    />
                )}

            </Timeline>
        </Container>
    )
}

const Container = styled.div`
background-color:#333333;
height:100vh;
width:100%;
display:flex;
flex-direction:column;
align-items:center;
box-sizing:border-box;
h1{
    font-family: 'Oswald', sans-serif;
    font-size:44px;
    font-weight:bold;
    margin:30px 0;
    width:40%;
    color:#FFFFFF;
}

`

const CreatePost = styled.div`
background-color:#FFFFFF;
margin-bottom:15px;
display:flex;
border-radius:5px;
padding:18px 24px;
width:40%;
box-sizing:border-box;
position:relative;
img{
    border-radius:50px;
    height:50px;
}
h2{
    font-size:20px;
    color:#707070;
    margin:8px 0 15px 0;
    font-weight:300;
}
form{
    padding:0 0 32px 20px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    width:100%;
}
input{
    width:100%;
    box-sizing:border-box;
    background-color:#EFEFEF;
    font-family:'Lato', sans-serif;
    color:#949494;
    font-weight:300;
    font-size:15px;
    border:none;
    border-radius:5px;
    padding:10px 15px;
    margin-bottom:5px;
}

button{
    position:absolute;
    right:24px;
    bottom:18px;
    border:none;
    border-radius:5px;
    background-color:#1877F2;
    color:#FFFFFF;
    font-size:14px;
    font-weight:700;
    width:120px;
    height:30px;
}
`

const Timeline = styled.div`
width:40%;
box-sizing:border-box;
`
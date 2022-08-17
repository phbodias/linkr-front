import { Container, Title, InnerContainer, RightInnerContainer, LeftInnerContainer, SubTitle, TextContent, SubItems} from "./FeedStyle";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import ModalForDelete from "../../Components/Posts/ModalForDelete";
import { useState } from "react";
import axios from "axios";

export function FeedPage({title, forms, posts, hashtags}){
    const navigate = useNavigate();
    const [postToDelete, setDelete] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('tokenLinker');

    function deletePost() {
        setLoading(true);
        const URL = `https://backlinkr.herokuapp.com/posts/${postToDelete}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.delete(URL, config);
        promise.then(() => {
            window.location.reload(false);
        })
        promise.catch((error) => {
            setLoading(false);
            closeModal();
            console.log(error.response.data);
            alert("The post could not be deleted");
        })
    }

    function openModal(id) {
        setIsOpen(true);
        setDelete(id);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
       <>
       <Header/>
        <Container>
            <Title>
                {title}
            </Title>
            <InnerContainer>
                <LeftInnerContainer>
                    {forms ? forms : null}
                    {posts(openModal)}
                </LeftInnerContainer>
                <RightInnerContainer>
                    <SubTitle>
                        trendings
                    </SubTitle>
                    <SubItems>

                    { hashtags ?
                    hashtags.map((item,index)=>{
                      return <TextContent key={index} onClick={()=>navigate(`/hashtag/${item}`)} >
                        {`#${item}`}
                      </TextContent>    
                    })
                    : null } 
                    </SubItems>
                </RightInnerContainer>
            </InnerContainer>
            <ModalForDelete
            modalIsOpen={modalIsOpen}
            loading={loading}
            closeModal={closeModal}
            deletePost={deletePost}
            />
        </Container>
       </>
    );
}

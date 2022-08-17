import { Container, Title, InnerContainer, RightInnerContainer, LeftInnerContainer, SubTitle, TextContent, SubItems } from "./FeedStyle";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import ModalForPostActions from "../../Components/Posts/Post/ModalForPostActions";
import CreatePost from "../../Components/Posts/CreatePost/CreatePost";
import { useContext, useState } from "react";
import axios from "axios";
import UrlContext from "../../contexts/UrlContext";
import SearchNewUpdates from "../../Components/Posts/SearchNewUpdates";

export function FeedPage({ title, forms, posts, hashtags }) {
    const navigate = useNavigate();
    const URL = useContext(UrlContext);
    const [postToDelete, setDelete] = useState('');
    const [postToRepost, setRepost] = useState('');
    const [deleteIsOpen, setDeleteOpen] = useState(false);
    const [repostIsOpen, setRepostOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('tokenLinker');

    function deletePost() {
        setLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.delete(`${URL}/posts/${postToDelete}`, config);
        promise.then(() => {
            window.location.reload(false);
        })
        promise.catch((error) => {
            setLoading(false);
            closeModal('delete');
            console.log(error.response.data);
            alert("The post could not be deleted");
        })
    }

    function addRepost() {
        setLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(`${URL}/repost/${postToRepost}`, config);
        promise.then(() => {
            window.location.reload(false);
        })
        promise.catch((error) => {
            setLoading(false);
            closeModal('repost');
            console.log(error.response.data);
            alert("The post could not be reposted");
        })
    }

    function openModal(id, field) {
        switch (field) {
            case 'repost':
                setRepostOpen(true);
                setRepost(id);
                break
            case 'delete':
                setDeleteOpen(true);
                setDelete(id);
                break
            default:
                break
        }
    }

    function closeModal(field) {
        switch (field) {
            case 'repost':
                setRepostOpen(false);
                break
            case 'delete':
                setDeleteOpen(false);
                break
            default:
                break
        }
    }
    return (
        <>
            <Header />
            <Container>
                <Title>
                    {title}
                </Title>


                <InnerContainer>
                    <LeftInnerContainer>
                        {forms ? <CreatePost /> : null}
                        {posts(openModal)}

                        <SearchNewUpdates>
                        </SearchNewUpdates>

                    </LeftInnerContainer>
                    <RightInnerContainer>
                        <SubTitle>
                            trendings
                        </SubTitle>
                        <SubItems>

                            {hashtags ?
                                hashtags.map((item, index) => {
                                    return <TextContent key={index} onClick={() => navigate(`/hashtag/${item}`)} >
                                        {`#${item}`}
                                    </TextContent>
                                })
                                : null}
                        </SubItems>
                    </RightInnerContainer>
                </InnerContainer>
                <ModalForPostActions
                    modalIsOpen={deleteIsOpen}
                    loading={loading}
                    closeModal={()=>closeModal('delete')}
                    postFunction={deletePost}
                    questionAnswers={['Are you sure you want to delete this post?','No, go back','Yes, delete it']}
                />
                <ModalForPostActions
                    modalIsOpen={repostIsOpen}
                    loading={loading}
                    closeModal={()=>closeModal('repost')}
                    postFunction={addRepost}
                    questionAnswers={['Do you want to re-post this link?','No, cancel','Yes, share!']}
                />
            </Container>
        </>
    );
}

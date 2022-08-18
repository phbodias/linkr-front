import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import UrlContext from "../../../../../contexts/UrlContext";
import {
    Container,
    Box,
    LeftInnerBox,
    RightInnerBox,
    TitleBox,
    UserName,
    RelationUser,
    CommentSection,
} from "./CommentsTextStyle";

export default function CommentsText({ postId }) {

    const URL = useContext(UrlContext);
    const [comments, setComments] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('tokenLinker');

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.get(`${URL}/comments/${postId}`, config)
            .then(res => {
                setComments(res.data.comments);
                console.log(res.data.comments);
            })
            .catch(err => {
                console.log(err.response.data);
                if (err.response.status === 401) return navigate('/');
                alert("Couldn't load commentaries information, please reload the page. If persists contact the Linkrs admins");
            })

    },
        [token, URL, navigate, postId]);

    if (comments) console.log(comments[0].userOwner.picture);

    return (
        (!comments)
            ?
            <ThreeDots color="#FFF" height={50} width={100} />
            :

            comments.length === 0
                ?
                <Container style={{
                    color: "#ACACAC",
                    fontWeight: "400",
                    fontSize: "0.875rem"
                }
                }>
                    "No commentaries yet"
                    "Be the first to comment"
                </Container>
                :
                <Container>
                    {comments.map((comment,index)=>(
                        <Box key={index}>
                        <LeftInnerBox onClick={()=>navigate(`/user/${comment.userOwner.id}`)}>
                            <img src={comment.userOwner.picture} alt="User profile pic rounded"/>
                        </LeftInnerBox>
                        <RightInnerBox>
                            <TitleBox>
                                <UserName onClick={()=>navigate(`/user/${comment.userOwner.id}`)}>
                                    {comment.userOwner.name}
                                </UserName>
                                <RelationUser >
                                    { comment.relation ? `• ${comment.relation}` : ''}
                                </RelationUser>
                            </TitleBox>
                            <CommentSection>
                                {comment.text}
                            </CommentSection>
                        </RightInnerBox>
                    </Box>
                    ) )}
                </Container>

    );
}
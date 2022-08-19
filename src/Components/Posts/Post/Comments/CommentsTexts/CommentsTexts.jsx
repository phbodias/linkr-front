import { useContext, useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import UrlContext from "../../../../../contexts/UrlContext";
import UserContext from "../../../../../contexts/UserContext";
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
import CommentsInput from "../CommentsInput/CommentsInput";

export default function CommentsText({ postId }) {
    const {userData} = useContext(UserContext);
    const [comments, setComments] = useState(null);  
    const [loading, setLoading] = useState(false);  
    const URL = useContext(UrlContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('tokenLinker');

    const loadCommentsPost = useCallback (()=>{
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        setLoading(true);
        axios.get(`${URL}/comments/${postId}`, config)
            .then(res => {
                setLoading(false);
                setComments(res.data.comments);
                console.log(res.data.comments);
            })
            .catch(err => {
                console.log(err.response.data);
                setLoading(false);
                if (err.response.status === 401) return navigate('/');
                alert("Couldn't load commentaries information, please reload the page. If persists contact the Linkrs admins");
            })
        }, [token, URL, navigate, postId]   
    )

    useEffect(() => {
        loadCommentsPost();

    },
        [loadCommentsPost]);

    if(userData) console.log(userData[0].id)
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
                    fontSize: "0.875rem",
                    padding: "1rem" 
                }
                }>
                    "No commentaries yet"
                    "Be the first to comment"
                    <Box disable={loading} style={{marginTop:"24px"}}>
                        <LeftInnerBox onClick={()=>navigate(`/user/${userData[0].id}`)}>
                            <img src={userData[0].profilePic} alt="" onError={({ currentTarget }) => {
                             currentTarget.onerror = null; // prevents looping
                                currentTarget.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                            }}/>
                        </LeftInnerBox>
                        <RightInnerBox>
                            <CommentsInput postId={postId} loadCommentsPost={loadCommentsPost} />
                        </RightInnerBox>
                    </Box>
                </Container>
                :
                <Container>
                    {comments.map((comment,index)=>(
                        <Box key={index}>
                        <LeftInnerBox onClick={()=>navigate(`/user/${comment.userOwner.id}`)}>
                            <img src={comment.userOwner.picture} alt="" onError={({ currentTarget }) => {
                             currentTarget.onerror = null; // prevents looping
                                currentTarget.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                            }}/>
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
                    <Box disable={loading}>
                        <LeftInnerBox onClick={()=>navigate(`/user/${userData[0].id}`)}>
                            <img src={userData[0].profilePic} alt="" onError={({ currentTarget }) => {
                             currentTarget.onerror = null; // prevents looping
                                currentTarget.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                            }}/>
                        </LeftInnerBox>
                        <RightInnerBox>
                            <CommentsInput postId={postId} loadCommentsPost={loadCommentsPost} />
                        </RightInnerBox>
                    </Box>
                </Container>

    );
}
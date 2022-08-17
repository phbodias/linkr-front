import { useContext, useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import UrlContext from "../../../../contexts/UrlContext.js";
import { BottomContainer, Container, UpperContainer } from "./CommentsIconStyle.js"
import { useNavigate } from "react-router-dom";

export default function CommentsIcon({postId}) {
    const URL = useContext(UrlContext);
    // const [comments, setComments] = useState(null);
    const [commentsCount, setCommentsCount] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('tokenLinker');
    //colocar no componente post
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.get(`${URL}/comments/commentsCount/${postId}`,config)
            .then(res => {
                setCommentsCount(res.data.commentsCount);
                console.log(res.data.commentsCount)
            })
            .catch(err => {
                console.log(err.response.data);
                if (err.response.status === 401) return navigate('/');
                alert("Couldn't load commentaries information, please reload the page. If persists contact the Linkrs admins");
            })

    },
        [token]);



    return (
        <Container>
            <UpperContainer>
                <AiOutlineComment  />
            </UpperContainer>
            <BottomContainer>
                { commentsCount
                    ?
                    (commentsCount=== "1" || commentsCount === "0") 
                        ? 
                     `${commentsCount} comentário`
                     :
                     `${commentsCount} comentários`
                    
                    :
                    <ThreeDots color="#FFF" height={50} width={100} />
                }
            </BottomContainer>

        </Container>
    )
}


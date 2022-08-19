import { useState, useContext } from "react";
import axios from "axios";
import { FiSend } from 'react-icons/fi';
import UrlContext from "../../../../../contexts/UrlContext";
import { CommentForm } from "./CommentsInputStyle";

export default function CommentsInput({ postId, loadCommentsPost }) {
    const URL = useContext(UrlContext);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('tokenLinker');
    const [newComment, setNewComment] = useState({comment:""});

    function createNewComment(e) {
        e.preventDefault();
        setLoading(true);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(`${URL}/comments/create/${postId}`, newComment, config)
        setLoading(true);
        promise.then(() => {
            setNewComment({comment:""});
            loadCommentsPost();
            setLoading(false);
            
        })
        promise.catch((error) => {
            console.log(error.response.data);
            alert('Houve um erro ao publicar seu link')
            setLoading(false);
        })
    }

    function handleInputChange(e) {
        setNewComment({ [e.target.name]: e.target.value });
    }
    return (
       
                <CommentForm onSubmit={createNewComment}>
                    <textarea
                        type='text'
                        name='comment'
                        rows='1'
                        placeholder="write a comment..."
                        value={newComment.comment}
                        onChange={handleInputChange}
                        disabled={loading}
                        required />
                    <div disabled={loading} onClick={createNewComment}>
                        <FiSend />
                    </div>
                </CommentForm>
    
    );
}
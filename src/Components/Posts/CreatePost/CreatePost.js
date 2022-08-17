import CreatePostStyle from "./CreatePostStyle";
import { useState,useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import UrlContext from "../../../contexts/UrlContext";
import axios from "axios";

export default function CreatePost () {
    const URL = useContext(UrlContext);
    const { userData } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('tokenLinker');
    const [newPost, setNewPost] = useState({
        url: "",
        description: ""
    })

    function createNewPost(e) {
        e.preventDefault();
        setLoading(true);
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(`${URL}/posts`, newPost, config)
        promise.then(() => {
            window.location.reload(false);
        })
        promise.catch((error) => {
            console.log(error.response.data);
            alert('Houve um erro ao publicar seu link')
            setLoading(false);
        })
    }

    function handleInputChange(e) {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    }
    return (
    <CreatePostStyle disable={loading}>
        <img src={userData[0]?.profilePic} alt="" />
        <form onSubmit={createNewPost}>
            <h2>What are you going to share today?</h2>
            <input
                type='url'
                name='url'
                placeholder="Link to share"
                value={newPost.url}
                onChange={handleInputChange}
                required
                disabled={loading} />
            <textarea
                type='text'
                rows='3'
                name='description'
                placeholder="description"
                value={newPost.description}
                onChange={handleInputChange}
                disabled={loading} />
            <button
                type='submit'
                disabled={loading}>
                {loading ? 'Publishing...' : 'Publish'}
            </button>
        </form>
    </CreatePostStyle>
    );
}
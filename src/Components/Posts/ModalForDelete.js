import Modal from 'react-modal';
import { ThreeDots } from "react-loader-spinner";

Modal.setAppElement('#root');

export default function ModalForDelete (
    {modalIsOpen,loading,closeModal,deletePost}) {
        
    return (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalCustomStyles}
    >
        {loading ?
            <ThreeDots color="#FFF" height={50} width={100} />
            :
            <h1
                style={Modalh1Style}>
                Are you sure you want <br /> to delete this post?
            </h1>}
        <div>
            <button
                disabled={loading}
                style={ModalNButtonStyle}
                onClick={closeModal}>
                No, go back
            </button>
            <button
                disabled={loading}
                style={ModalYButtonStyle}
                onClick={deletePost}>
                Yes, delete it
            </button>
        </div>
    </Modal>)
}

const ModalCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#333333',
        borderRadius: '50px',
        padding: '40px 130px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
};
const Modalh1Style = {
    color: '#FFFFFF',
    fontSize: '34px',
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: '40px',
    marginBottom: '20px'
}
const ModalNButtonStyle = {
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    width: '138px',
    height: '40px',
    color: '#1877F2',
    fontWeight: '700',
    fontSize: '18px',
    margin: '20px'
}
const ModalYButtonStyle = {
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#1877F2',
    width: '138px',
    height: '40px',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: '18px',
    margin: '20px'

}
import Modal from 'react-modal';
import { ThreeDots } from "react-loader-spinner";

Modal.setAppElement('#root');

export default function ModalForPostActions (
    {modalIsOpen,loading,closeModal,postFunction,questionAnswers}) {
        
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
                {questionAnswers[0]}
            </h1>}
        <div>
            <button
                disabled={loading}
                style={ModalNButtonStyle}
                onClick={closeModal}>
                {questionAnswers[1]}
            </button>
            <button
                disabled={loading}
                style={ModalYButtonStyle}
                onClick={postFunction}>
                {questionAnswers[2]}
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
        padding: '40px 30px',
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
    marginBottom: '20px',
    width:'75%'
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
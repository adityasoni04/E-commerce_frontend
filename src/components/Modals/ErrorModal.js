// components/Modals/ErrorModal.js
import { Modal } from 'antd';

export default function ErrorModal({ visible, onClose, message }) {
    return (
        <Modal
            title="Error"
            visible={visible}
            onOk={onClose}
            onCancel={onClose}
            okText="OK"
        >
            <p>{message}</p>
        </Modal>
    );
}

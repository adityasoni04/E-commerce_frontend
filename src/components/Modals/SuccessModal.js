// components/Modals/SuccessModal.js
import { Modal } from 'antd';

export default function SuccessModal({ visible, onClose, message }) {
    return (
        <Modal
            title="Success"
            visible={visible}
            onOk={onClose}
            onCancel={onClose}
            okText="OK"
        >
            <p>{message}</p>
        </Modal>
    );
}

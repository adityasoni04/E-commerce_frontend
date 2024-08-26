import { Spin } from 'antd';
import 'antd/dist/reset.css';

export default function FullScreenSpinner() {
    return (
        <div style={styles.spinnerContainer}>
            <Spin size="large" />
        </div>
    );
}

const styles = {
    spinnerContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    }
};

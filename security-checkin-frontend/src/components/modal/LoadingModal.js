import { React, memo } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { LoadingPattern } from '../loading/LoadingPattern';

const LoadingModal = (props) => {
    const isOpen = useSelector(state => state.loading.isOpen);

    return (
        <Modal
            isOpen={isOpen}
            className={'w-screen h-screen flex justify-center items-center bg-white/10'}
        >
            <LoadingPattern size='huge' color='green'/>
        </Modal>
    )
}

export default memo(LoadingModal);
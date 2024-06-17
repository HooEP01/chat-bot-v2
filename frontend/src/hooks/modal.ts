import { useState } from "react";

export const useModal = (def = false) => {
    const [showModal, setModal] = useState(def);
    
    const toggleModal = () => {
        setModal(prev => !prev);
    };

    return {
        showModal,
        setModal,
        toggleModal,
    }
}
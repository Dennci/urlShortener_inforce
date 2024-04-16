import React from 'react';
import {Button, IconButton, Modal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmationModalProps {
    headerTile: string;
    description: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
    const {open, description,headerTile, onConfirm, onClose} = props;
    return (
        <>
            <Modal open={open} onClose={onClose}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h2>{headerTile}</h2>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <p>{description}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button variant="contained" color="success" onClick={onConfirm}>
                            Сonfirm
                        </Button>
                        <Button variant="contained" color="error" onClick={onClose} style={{ marginLeft: '10px' }}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ConfirmationModal;
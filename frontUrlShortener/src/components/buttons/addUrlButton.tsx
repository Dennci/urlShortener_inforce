import React, {useState} from 'react';
import {Button, Modal, TextField, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useCreateUrlMutation} from "../../store/endpoints";
import {handleSuccessAndError} from "../../helpers/helper";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../hooks/useUser";
import VisibleBlock from "../visible-block/visible-block";

const AddUrlButton = () => {
    const [open, setOpen] = useState(false);
    const [addUrl] = useCreateUrlMutation();
    const navigate = useNavigate();
    const {isAuthenticated} = useUser();
    const [url, setUrl] = useState("");
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        await handleSuccessAndError(
            async () => {
                await addUrl({urlPath: url}).unwrap();
                navigate("/");
            },
            "Url successfully created"
        );
        setUrl("");
        handleClose();
    };
    const handleChange = (event: any) => {
        setUrl(event.target.value);
    };
    return (
        <VisibleBlock isVisible={isAuthenticated}>
            <div>
                <Button style={{marginLeft: '10px'}} variant="contained" color="success" onClick={handleOpen}>
                    Add URL
                </Button>
                <Modal open={open} onClose={handleClose}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '5px',
                        maxWidth: '900px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '10px'
                        }}>
                            <h2>Add URL</h2>
                            <IconButton onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        <TextField label="URL" variant="outlined" fullWidth value={url} onChange={handleChange}/>
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </VisibleBlock>
    );
};

export default AddUrlButton;
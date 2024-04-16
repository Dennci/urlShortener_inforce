import React, {useState} from 'react';
import {useDeleteUrlMutation} from "../../store/endpoints";
import {handleSuccessAndError} from "../../helpers/helper";
import {Button, IconButton, Modal, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationModal from "../modals/confirmationModal";
import {useUser} from "../../hooks/useUser";
import VisibleBlock from "../visible-block/visible-block";
import {UserRole} from "../../service/models/user.models";

interface DeleteButtonProps {
    id: number,
    creatorId: number
}

const DeleteButton = (props: DeleteButtonProps) => {
    const {id, creatorId} = props;
    const {userId, userRole} = useUser();
    const [open, setOpen] = useState(false);
    const [deleteUrl] = useDeleteUrlMutation();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        await handleSuccessAndError(
            async () => {
                await deleteUrl({id: id}).unwrap();
            },
            "Url successfully deleted"
        );
        handleClose();
    };

    return (
        <>
            <VisibleBlock isVisible={creatorId == userId || userRole.toString()  == "Admin"}>
                <Button style={{marginLeft: '10px'}} variant="contained" color="error" onClick={handleOpen}>
                    Delete
                </Button>
                <ConfirmationModal
                    onClose={handleClose}
                    onConfirm={handleConfirm}
                    open={open}
                    headerTile="Delete Url"
                    description="Are you sure you want to delete the URL?"
                />
            </VisibleBlock>
        </>
    );
};

export default DeleteButton;
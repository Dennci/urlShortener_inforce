import React, {useState} from 'react';
import {useDeleteUrlMutation, useRaiseToAdminMutation} from "../../store/endpoints";
import {handleSuccessAndError} from "../../helpers/helper";
import {Button} from "@mui/material";
import ConfirmationModal from "../modals/confirmationModal";

interface RaiseToAdminButtonProps {
    id: number
}

const RaiseToAdminButton = (props: RaiseToAdminButtonProps) => {
    const {id} = props;
    const [open, setOpen] = useState(false);
    const [raiseToAdmin] = useRaiseToAdminMutation();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        await handleSuccessAndError(
            async () => {
                await raiseToAdmin({userId: id}).unwrap();
            },
            "user successfully raised to admin"
        );
        handleClose();
    };
    return (
        <>
            <Button style={{ marginLeft: '10px' }} variant="contained" color="success" onClick={handleOpen}>
                RAISE TO ADMINISTRATOR
            </Button>
            <ConfirmationModal
                onClose={handleClose}
                onConfirm={handleConfirm}
                open={open}
                headerTile="Raise to Admin"
                description="Are you sure you want to make this user an administrator?"
            />
        </>
    );
};

export default RaiseToAdminButton;
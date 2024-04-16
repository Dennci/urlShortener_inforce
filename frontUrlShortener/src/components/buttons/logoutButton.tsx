import React from 'react';
import {useUser} from "../../hooks/useUser";
import {Button} from "@mui/material";

const LogoutButton = () => {
    const{logout} = useUser();
    return (
        <>
            <Button variant="contained" color="error" onClick={logout}>Logout</Button>
        </>
    );
};

export default LogoutButton;
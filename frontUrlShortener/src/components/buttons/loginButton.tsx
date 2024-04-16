import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

const LoginButton = () => {
    const navigate = useNavigate();
    return (
        <>
        <Button variant="contained" color="primary" onClick={() => navigate("/user/login")}>Login</Button>
        </>
    );
};

export default LoginButton;
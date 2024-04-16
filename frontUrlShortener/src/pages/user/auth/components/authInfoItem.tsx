import React from 'react';
import {Button, TextField} from "@mui/material";

interface AuthInfoItemProps {
    userEmail: string;
    password: string;
    setUserEmail: (value: string) => void;
    setPassword: (value: string) => void;
    handleLogin: () => Promise<void>;
    title: string;
    children?: React.ReactNode
}

const AuthInfoItem = (props: AuthInfoItemProps) => {
    const {userEmail, title, password, setUserEmail, setPassword, handleLogin, children} = props;

    const handleSubmit = async () => {
        await handleLogin();
    };
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '50%',
        }}>
            <h1>{title}</h1>
            <TextField
                label="User email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                variant="outlined"
                style={{marginBottom: '20px', width: '70%'}}
            />
            <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
                style={{marginBottom: '20px', width: '70%'}}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}
                    style={{width: '70%', marginBottom: '20px'}}>
                Log in
            </Button>
            {children}
        </div>
    );
};


export default AuthInfoItem;
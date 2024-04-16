import React, {useState} from 'react';
import {useRegisterMutation} from "../../../../store/endpoints";
import {useNavigate} from "react-router-dom";
import {handleSuccessAndError} from "../../../../helpers/helper";
import AuthInfoItem from "../components/authInfoItem";
import { UserRole } from '../../../../service/models/user.models';

const Register = () => {
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const handleLogin = async () => {
        await handleSuccessAndError(
            async () => {
                await register({userEmail:userEmail, password:password,userRole:UserRole.User}).unwrap();
                navigate(`/user/login`);
            },
            "user successfully registered"
        );
        setUserEmail('');
        setPassword('');
        setUserEmail('');
    };
    return (
        <div style={{display: 'flex', justifyContent: 'center',}}>
            <AuthInfoItem
                handleLogin={handleLogin}
                userEmail={userEmail}
                password={password}
                setUserEmail={setUserEmail}
                setPassword={setPassword}
                title={"Register"}
            />
        </div>
    );
};

export default Register;
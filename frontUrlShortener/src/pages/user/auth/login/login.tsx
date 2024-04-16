import React, {useState} from 'react';
import {useLoginMutation} from "../../../../store/endpoints";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {handleSuccessAndError} from "../../../../helpers/helper";
import {logIn} from "../../../../store/user.slice";
import AuthInfoItem from "../components/authInfoItem";


const Login = () => {
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        await handleSuccessAndError(
            async () => {
                var response = await login({userEmail, password}).unwrap();
                localStorage.setItem("token", response.token);
                dispatch(logIn());
                navigate(`/`);
            },
            "user successfully login"
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
                title={"Login"}
            >
                <a>Already have an account? <a href="#" onClick={() => navigate('/user/register')}>Register</a></a>
            </AuthInfoItem>

        </div>
    );
};

export default Login;
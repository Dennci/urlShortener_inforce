import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../hooks/useUser";
import LogoutButton from "../buttons/logoutButton";
import VisibleBlock from "../visible-block/visible-block";
import LoginButton from "../buttons/loginButton";
import {UserRole} from "../../service/models/user.models";


const Header = () => {
    const navigate = useNavigate();
    const {isAuthenticated, userEmail, userRole} = useUser();
    console.log(userRole,"Roleeee")
    return (
        <div className="header-container">
            <div style={{display: 'flex'}}>
                <h1 className="header-title">URL Shortener</h1>
                <div className="button-container">
                    <Button variant="contained" color="secondary" onClick={() => navigate("/")}>Url list</Button>
                    <VisibleBlock isVisible={userRole.toString()  == "Admin"}>
                    <Button variant="contained" color="success" onClick={() => navigate("/user")}>Admin panel</Button>
                    </VisibleBlock>
                </div>
            </div>
            <VisibleBlock isVisible={isAuthenticated}>
                <div style={{float: 'right'}}>
                    <h4>{userEmail}</h4>
                    <LogoutButton/>
                </div>
            </VisibleBlock>
            <VisibleBlock isVisible={!isAuthenticated}>
                <div style={{float: 'right'}}>
                    <LoginButton/>
                </div>
            </VisibleBlock>
        </div>
    );
};

export default Header;
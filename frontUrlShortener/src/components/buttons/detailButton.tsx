import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useUser} from "../../hooks/useUser";
import VisibleBlock from "../visible-block/visible-block";
interface DetailButtonProps {
    id: number
}
const DetailButton = (props: DetailButtonProps) => {
    const {id} = props;
    const {isAuthenticated} = useUser();
    const navigate = useNavigate();
    const handleButtonOnClickDetails = (id: number,e:any) => {
        e.stopPropagation();
        navigate(`/${id}`);
    };
    return (
        <VisibleBlock isVisible={isAuthenticated}>
        <Button variant="contained" color="primary"
                onClick={(e) => handleButtonOnClickDetails(id,e)}>
            Details
        </Button>
        </VisibleBlock>
    );
};

export default DetailButton;
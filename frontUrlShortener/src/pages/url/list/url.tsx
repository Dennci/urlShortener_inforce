import React from 'react';
import UrlTable from "./components/urlTable";
import {useGetAllUrlsQuery} from "../../../store/endpoints";
import AddUrlButton from "../../../components/buttons/addUrlButton";
import {useUser} from "../../../hooks/useUser";

const Url = () => {
    const {data:urls}=useGetAllUrlsQuery();
    const {isAuthenticated, userEmail,userId, userRole} = useUser();
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1>URLs Table</h1>
            <AddUrlButton/>
            </div>
            <UrlTable urls={urls??[]}/>
        </div>
    );
};

export default Url;
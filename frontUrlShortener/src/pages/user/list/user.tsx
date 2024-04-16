import React from 'react';
import {useGetAllUsersQuery} from "../../../store/endpoints";
import UserTable from "./component/userTable";

const User = () => {
    const {data:users}=useGetAllUsersQuery();
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1>Users Table</h1>
            </div>
            <UserTable users={users??[]}/>
        </div>
    );
};

export default User;
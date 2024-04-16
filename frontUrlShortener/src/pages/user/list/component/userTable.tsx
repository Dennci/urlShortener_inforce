import React from 'react';
import RaiseToAdminButton from "../../../../components/buttons/raiseToAdminButton";
import {DataGrid} from "@mui/x-data-grid";
import {GetAllUsersResponse} from "../../../../store/models";
interface UserTableProps {
    users: GetAllUsersResponse[]
}
const UserTable = (props: UserTableProps) => {
    const {users} = props;
    const columns = [
        {field: 'id', headerName: 'Id', width: 100},
        {field: 'userEmail', headerName: 'User Email', width: 250},
        {
            field: 'actions', headerName: 'Actions', width: 300, renderCell: (params: any) => (
                <div>
                    <RaiseToAdminButton id={params.row.id}/>
                </div>
            )
        },
    ];
    return (
        <div style={{height: 400, width: '100%', maxWidth: '80%', margin: '0 auto'}}>
            <DataGrid
                rows={users}
                columns={columns}
                autoHeight
                pageSizeOptions={[50, 100]}
                checkboxSelection={false}
            />
        </div>
    );
};

export default UserTable;
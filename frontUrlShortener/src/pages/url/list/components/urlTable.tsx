import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {GetAllUrlsResponse} from '../../../../store/models';
import {useNavigate} from "react-router-dom";
import DetailButton from "../../../../components/buttons/detailButton";
import CustomLinkToShortUrl from "../../../../components/link/customLinkToShortUrl";
import DeleteButton from "../../../../components/buttons/deleteButton";


interface UrlTableProps {
    urls: GetAllUrlsResponse[];
}

const UrlTable = ({urls}: UrlTableProps) => {
    const navigate = useNavigate();


    const columns = [
        {field: 'id', headerName: 'Id', width: 100},
        {
            field: 'urlPath', headerName: 'UrlPath', width: 500, renderCell: (params: any) => (
                <a href={params.value} target="_blank">{params.value}</a>
            )
        },
        {
            field: 'shortUrl', headerName: 'ShortUrl', width: 400, renderCell: (params: any) => (
                <CustomLinkToShortUrl url={params.value}/>
            )
        },
        {
            field: 'actions', headerName: 'Actions', width: 300, renderCell: (params: any) => (
                <div>
                    <DetailButton id={params.row.id}/>
                    <DeleteButton id={params.row.id} creatorId={params.row.userId}/>
                </div>
            )
        },
    ];

    return (
        <div style={{height: 400, width: '100%', maxWidth: '80%', margin: '0 auto'}}>
            <DataGrid
                rows={urls}
                columns={columns}
                autoHeight
                pageSizeOptions={[50, 100]}
                checkboxSelection={false}
            />
        </div>
    );
};

export default UrlTable;
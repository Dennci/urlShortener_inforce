import React from 'react';
import {useParamsIdFromQuery} from "../../../hooks/useParamsIdFromQuery";
import {useGetUrlsByIdQuery} from "../../../store/endpoints";
import UrlDetailItem from './components/urlDetailItem';


const UrlPageId = () => {
    const url = useParamsIdFromQuery();
    const {data:urlData} = useGetUrlsByIdQuery(+(url.id??0));
    return (
        <div className="url-id">
            <h1>Short Url Details</h1>
            <div className="url-details">
                <UrlDetailItem url={urlData!}/>
            </div>
        </div>
    );
};

export default UrlPageId;
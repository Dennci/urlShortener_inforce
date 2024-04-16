import React from 'react';
import {GetUrlsByIdResponse} from "../../../../store/models";
import {format} from "date-fns";
import CustomLinkToShortUrl from "../../../../components/link/customLinkToShortUrl";
import {convertUTCToLocalTime} from "../../../../helpers/date.helper";

interface UrdlIdItemProps {
    url: GetUrlsByIdResponse
}

const UrlDetailItem = (props: UrdlIdItemProps) => {
    const {url} = props;
    console.log(url, "URLRLRLRLR");
    return (
        <div className="url-detail-item">
            <p><strong>Id:</strong> {url?.id}</p>
            <p><strong>Creator email:</strong> {url?.userEmail}</p>
            <p><strong>Creation date:</strong> {format(convertUTCToLocalTime(new Date(url?.createdDate ?? new Date())), "dd-MM-yyyy HH:mm")}
            </p>
            <p><strong>Full path:</strong> <a href={`${url?.urlPath}`} target="_blank">{url?.urlPath}</a></p>
            <p><strong>Short path:</strong> <CustomLinkToShortUrl url={url?.shortUrl}/></p>
            <p><strong>Coded part:</strong> {url?.codedPart ?? ""}</p>

        </div>
    );
};

export default UrlDetailItem;
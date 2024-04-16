import React from 'react';
import {useGetOriginalUrlQuery} from "../../store/endpoints";

interface CustomLinkToShortUrlProps {
    url: string
}

const CustomLinkToShortUrl = (props: CustomLinkToShortUrlProps) => {
    const {url} = props;
    const {data: mainUrl} = useGetOriginalUrlQuery({shortUrl:url});
    const handleOnClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (mainUrl && mainUrl.originalUrl) {
            const newWindow = window.open(mainUrl.originalUrl, "_blank");
            if (newWindow) {
                newWindow.opener = null;
            }
        }
    };
    return (
        <>
            <a href={`${url}`} target="_blank" rel="noopener noreferrer" onClick={(e) => handleOnClick(e)}>{url}</a>
        </>
    );
};

export default CustomLinkToShortUrl;
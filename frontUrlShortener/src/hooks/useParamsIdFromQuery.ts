import {useParams} from "react-router-dom";

export const useParamsIdFromQuery = () => {
    const {id} = useParams<{ id: string }>();
    return {id}
}
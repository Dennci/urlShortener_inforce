import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {FetchBaseQueryArgs} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import {
    CreateUrlRequest,
    DeleteUrlQueryRequest,
    GetAllUrlsResponse, GetAllUsersResponse, GetOriginalUrlPathRequest,
    GetOriginalUrlPathResponse,
    GetUrlsByIdResponse, LoginUserRequest, LoginUserResponse, RaiseToAdminRequest, RegisterUserRequest
} from "./models";
import {getToken} from "../service/user.service";

export const baseQueryConfig: FetchBaseQueryArgs = {
    baseUrl: "https://localhost:7198/api",
    prepareHeaders: (headers, {endpoint}) => {
        const session = getToken();
        headers.set('Authorization', `Bearer ${session.Token}`);
        return headers;
    },
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
};

const userUrl = "User";
const urlApiUrl = "Url";

export const api = createApi({
    reducerPath: 'api',

    tagTypes: ["User", "Url"],
    baseQuery: fetchBaseQuery(baseQueryConfig),
    endpoints: (builder) => ({

        //#region UserApi
        login: builder.mutation<LoginUserResponse, LoginUserRequest>({
            query: (data) => ({
                url: `${userUrl}/login`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `${userUrl}/logout`,
                method: 'POST',
            }),
        }),
        register: builder.mutation<void, RegisterUserRequest>({
            query: (data) => ({
                url: `${userUrl}/register`,
                method: 'POST',
                body: data
            }),
        }),
        raiseToAdmin: builder.mutation<void, RaiseToAdminRequest>({
            query: (data) => ({
                url: `${userUrl}/raise-to-admin`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'User', id: 'List'}]
        }),
        getAllUsers: builder.query<GetAllUsersResponse[], void>({
            query: (id) => ({
                url: `${userUrl}`,
                method: 'GET',
            }),
            providesTags: [{type: 'User', id: 'List'}]
        }),
        //#endregion

        //#region UrlApi
        getAllUrls: builder.query<GetAllUrlsResponse[], void>({
            query: (id) => ({
                url: `${urlApiUrl}`,
                method: 'GET',
            }),
            providesTags: [{type: 'Url', id: 'List'}]
        }),
        getUrlsById: builder.query<GetUrlsByIdResponse, number>({
            query: (id) => ({
                url: `${urlApiUrl}/${id}`,
                method: 'GET',
            }),
            providesTags: [{type: 'Url', id: 'Current'}]
        }),
        getOriginalUrl: builder.query<GetOriginalUrlPathResponse, GetOriginalUrlPathRequest>({
            query: (props) => {
                return {
                    url: `${urlApiUrl}/find`,
                    method: 'GET',
                    params: props
                }
            },
            providesTags: [{type: 'Url', id: 'List'}]
        }),
        createUrl: builder.mutation<void, CreateUrlRequest>({
            query: (data) => ({
                url: `${urlApiUrl}`,
                method: 'POST',
                headers: {},
                body: data
            }),
            invalidatesTags: [{type: 'Url', id: 'List'}]
        }),
        deleteUrl: builder.mutation<void, DeleteUrlQueryRequest>({
            query: (props) => ({
                url: `${urlApiUrl}/${props.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Url', id: 'List'}]
        }),
        //#endregion
    })
});


export const {
    //#region UserApi
    useRaiseToAdminMutation,
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGetAllUsersQuery,
    //#endregion

    //#region UrlApi
    useGetAllUrlsQuery,
    useGetUrlsByIdQuery,
    useGetOriginalUrlQuery,
    useCreateUrlMutation,
    useDeleteUrlMutation,
    //#endregion
} = api
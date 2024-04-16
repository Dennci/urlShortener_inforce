import {UserRole} from "../service/models/user.models";

export interface GetAllUrlsResponse {
    id: number;
    url: string;
    shortUrl: string;
    userId: number;
}

export interface GetUrlsByIdResponse {
    id: number,
    urlPath: string,
    shortUrl: string,
    codedPart: string,
    userEmail: string,
    createdDate: Date,
}

export interface CreateUrlRequest {
    urlPath: string
}

export interface DeleteUrlQueryRequest {
    id: number
}

export interface GetOriginalUrlPathResponse {
    originalUrl: string
}

export interface GetOriginalUrlPathRequest {
    shortUrl: string
}

export interface LoginUserRequest {
    userEmail: string
    password: string
}

export interface LoginUserResponse {
    token: string
}

export interface RegisterUserRequest {
    userEmail: string;
    password: string;
    userRole: UserRole;
}

export interface RaiseToAdminRequest {
    userId: number;
}

export interface GetAllUsersResponse {
    id: number;
    userEmail: string;
    role: UserRole;
}
export interface Session {
    Id?: number;
    UserEmail?: string;
    UserRole: UserRole;
    Token?: string;
}

export enum UserRole {
    User = 0,
    Admin = 200
}
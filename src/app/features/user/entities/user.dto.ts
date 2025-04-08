import { UserRole } from "../enums/user-role.enum";

export interface UserDTO {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    fullname: string;
}
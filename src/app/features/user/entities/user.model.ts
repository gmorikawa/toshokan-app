import { UserRole } from "../enums/user-role.enum";
import { UserDTO } from "./user.dto";

export class User implements UserDTO {
    private _id: string;
    private _username: string;
    private _email: string;
    private _role: UserRole;
    private _fullname: string;

    public constructor(dto?: UserDTO) {
        this._id = dto?.id ?? "";
        this._username = dto?.username ?? "";
        this._email = dto?.email ?? "";
        this._role = dto?.role ?? UserRole.READER;
        this._fullname = dto?.fullname ?? "";
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get role(): UserRole {
        return this._role;
    }

    public set role(value: UserRole) {
        this._role = value;
    }

    public get fullname(): string {
        return this._fullname;
    }

    public set fullname(value: string) {
        this._fullname = value;
    }

    public splitName(): string[] {
        return this.fullname.split(" ");
    }
}
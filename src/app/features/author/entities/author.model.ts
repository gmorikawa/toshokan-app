import { AuthorDTO } from "./author.dto";

export class Author implements AuthorDTO {
    private _id: string;
    private _name: string;

    public constructor(dto?: AuthorDTO) {
        this._id = dto?.id ?? "";
        this._name = dto?.name ?? "";
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
}
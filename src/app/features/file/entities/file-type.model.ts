import { FileTypeDTO } from "@features/file/entities/file-type.dto";

export class FileType implements FileTypeDTO {
    private _id: string;
    private _name: string;
    private _extension: string;

    constructor(dto?: FileTypeDTO) {
        this._id = dto?.id ?? "";
        this._name = dto?.name ?? "";
        this._extension = dto?.extension ?? "";
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get extension(): string {
        return this._extension;
    }

    set extension(value: string) {
        this._extension = value;
    }
}
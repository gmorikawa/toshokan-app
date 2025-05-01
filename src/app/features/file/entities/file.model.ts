import { FileDTO } from "@features/file/entities/file.dto";
import { FileTypeDTO } from "./file-type.dto";
import { FileState } from "../enum/file-state.enum";
import { Nullable } from "@common/types/helpers";

export class File implements FileDTO {
    private _id: string;
    private _path: string;
    private _filename: string;
    private _type: Nullable<FileTypeDTO>;
    private _state: FileState;

    constructor(dto?: FileDTO) {
        this._id = dto?.id ?? "";
        this._path = dto?.path ?? "";
        this._filename = dto?.filename ?? "";
        this._type = dto?.type ?? null;
        this._state = dto?.state ?? FileState.UPLOADING;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }

    get filename(): string {
        return this._filename;
    }

    set filename(value: string) {
        this._filename = value;
    }

    get type(): Nullable<FileTypeDTO> {
        return this._type;
    }

    set type(value: Nullable<FileTypeDTO>) {
        this._type = value;
    }

    get state(): FileState {
        return this._state;
    }

    set state(value: FileState) {
        this._state = value;
    }
}
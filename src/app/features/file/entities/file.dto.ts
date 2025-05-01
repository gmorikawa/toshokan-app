import { Nullable } from "@common/types/helpers";
import { FileTypeDTO } from "./file-type.dto";
import { FileState } from "@features/file/enum/file-state.enum";

export interface FileDTO {
    id: string;
    path: string;
    filename: string;
    type: Nullable<FileTypeDTO>;
    state: FileState;
}
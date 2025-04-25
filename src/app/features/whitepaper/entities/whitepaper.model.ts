import { WhitepaperDTO } from "@features/whitepaper/entities/whitepaper.dto";
import { CategoryDTO } from "@features/category/entities/category.dto";
import { TopicDTO } from "@features/topic/entities/topic.dto";

export class Whitepaper implements WhitepaperDTO {
    private _id: string;
    private _title: string;
    private _year: number;
    private _authors: string[];
    private _description?: string;
    private _categoryId: string;
    private _category: CategoryDTO | null;
    private _topics: TopicDTO[]

    constructor(dto?: WhitepaperDTO) {
        this._id = dto?.id ?? "";
        this._title = dto?.title ?? "";
        this._year = dto?.year ?? 0;
        this._authors = dto?.authors ?? [];
        this._description = dto?.description;
        this._categoryId = dto?.categoryId ?? "";
        this._category = dto?.category ?? null;
        this._topics = dto?.topics ?? [];
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        this._year = value;
    }

    get authors(): string[] {
        return this._authors;
    }

    set authors(value: string[]) {
        this._authors = value;
    }

    get description(): string | undefined {
        return this._description;
    }

    set description(value: string | undefined) {
        this._description = value;
    }

    get categoryId(): string {
        return this._categoryId;
    }

    set categoryId(value: string) {
        this._categoryId = value;
    }

    get category(): CategoryDTO | null {
        return this._category;
    }

    set category(value: CategoryDTO | null) {
        this._category = value;
    }

    get topics(): TopicDTO[] {
        return this._topics;
    }

    set topics(value: TopicDTO[]) {
        this._topics = value;
    }
}
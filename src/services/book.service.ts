import { Observable } from "rxjs";

import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { StorageService } from "@services/storage.service";
import { BookDTO } from "@features/book/entities/book.dto";

const API = "http://localhost:8080/api/";

@Injectable({ providedIn: "root" })
export class BookService {
    private http = inject(HttpClient);
    private storage = inject(StorageService);

    public getAll(): Observable<BookDTO[]> {
        return this.http.get<BookDTO[]>(
            API.concat("books"),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public getById(id: string): Observable<BookDTO> {
        return this.http.get<BookDTO>(
            API.concat(`books/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public create(book: BookDTO): Observable<BookDTO> {
        return this.http.post<BookDTO>(
            API.concat("books"),
            book,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public update(id: string, book: BookDTO): Observable<BookDTO> {
        return this.http.patch<BookDTO>(
            API.concat(`books/${id}`),
            book,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public remove(id: string): Observable<BookDTO> {
        return this.http.delete<BookDTO>(
            API.concat(`books/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }
}
import { Observable } from "rxjs";

import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { StorageService } from "@services/storage.service";
import { Author } from "@features/author/entities/author.model";
import { AuthorDTO } from "@features/author/entities/author.dto";

const API = "http://localhost:8080/api/";

@Injectable({ providedIn: 'root' })
export class AuthorService {
    private http = inject(HttpClient);
    private storage = inject(StorageService);

    public getAll(): Observable<AuthorDTO[]> {
        return this.http.get<AuthorDTO[]>(
            API.concat("authors"),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public getById(id: string): Observable<AuthorDTO> {
        return this.http.get<AuthorDTO>(
            API.concat(`authors/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public create(author: AuthorDTO): Observable<AuthorDTO> {
        return this.http.post<AuthorDTO>(
            API.concat("authors"),
            author,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public update(id: string, author: AuthorDTO): Observable<AuthorDTO> {
        return this.http.patch<AuthorDTO>(
            API.concat(`authors/${id}`),
            author,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public remove(id: string): Observable<AuthorDTO> {
        return this.http.delete<AuthorDTO>(
            API.concat(`authors/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }
}
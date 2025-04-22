import { Observable } from "rxjs";

import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { StorageService } from "@services/storage.service";
import { CategoryDTO } from "@features/category/entities/category.dto";

const API = "http://localhost:8080/api/";

@Injectable({ providedIn: "root" })
export class CategoryService {
    private http = inject(HttpClient);
    private storage = inject(StorageService);

    public getAll(): Observable<CategoryDTO[]> {
        return this.http.get<CategoryDTO[]>(
            API.concat("categories"),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public getById(id: string): Observable<CategoryDTO> {
        return this.http.get<CategoryDTO>(
            API.concat(`categories/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public create(category: CategoryDTO): Observable<CategoryDTO> {
        return this.http.post<CategoryDTO>(
            API.concat("categories"),
            category,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public update(id: string, category: CategoryDTO): Observable<CategoryDTO> {
        return this.http.patch<CategoryDTO>(
            API.concat(`categories/${id}`),
            category,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public remove(id: string): Observable<CategoryDTO> {
        return this.http.delete<CategoryDTO>(
            API.concat(`categories/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }
}
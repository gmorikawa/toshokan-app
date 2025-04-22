import { Observable } from "rxjs";

import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { StorageService } from "@services/storage.service";
import { Publisher } from "@features/publisher/entities/publisher.model";
import { PublisherDTO } from "@features/publisher/entities/publisher.dto";

const API = "http://localhost:8080/api/";

@Injectable({ providedIn: 'root' })
export class PublisherService {
    private http = inject(HttpClient);
    private storage = inject(StorageService);

    public getAll(): Observable<PublisherDTO[]> {
        return this.http.get<PublisherDTO[]>(
            API.concat("publishers"),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public getById(id: string): Observable<PublisherDTO> {
        return this.http.get<PublisherDTO>(
            API.concat(`publishers/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public create(publisher: PublisherDTO): Observable<PublisherDTO> {
        return this.http.post<PublisherDTO>(
            API.concat("publishers"),
            publisher,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public update(id: string, publisher: PublisherDTO): Observable<PublisherDTO> {
        return this.http.patch<PublisherDTO>(
            API.concat(`publishers/${id}`),
            publisher,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public remove(id: string): Observable<PublisherDTO> {
        return this.http.delete<PublisherDTO>(
            API.concat(`publishers/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }
}
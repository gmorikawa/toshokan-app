import { Observable } from "rxjs";

import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { StorageService } from "@services/storage.service";
import { WhitepaperDTO } from "@features/whitepaper/entities/whitepaper.dto";

const API = "http://localhost:8080/api/";

@Injectable({ providedIn: "root" })
export class WhitepaperService {
    private http = inject(HttpClient);
    private storage = inject(StorageService);

    public getAll(): Observable<WhitepaperDTO[]> {
        return this.http.get<WhitepaperDTO[]>(
            API.concat("whitepapers"),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public getById(id: string): Observable<WhitepaperDTO> {
        return this.http.get<WhitepaperDTO>(
            API.concat(`whitepapers/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public create(whitepaper: WhitepaperDTO): Observable<WhitepaperDTO> {
        return this.http.post<WhitepaperDTO>(
            API.concat("whitepapers"),
            whitepaper,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public update(id: string, whitepaper: WhitepaperDTO): Observable<WhitepaperDTO> {
        return this.http.patch<WhitepaperDTO>(
            API.concat(`whitepapers/${id}`),
            whitepaper,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public remove(id: string): Observable<WhitepaperDTO> {
        return this.http.delete<WhitepaperDTO>(
            API.concat(`whitepapers/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }
}
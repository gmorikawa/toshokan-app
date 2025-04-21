import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Topic } from "../app/features/topic/entities/topic.model";
import { StorageService } from "./storage.service";
import { TopicDTO } from "../app/features/topic/entities/topic.dto";

const API = "http://localhost:8080/api/";

@Injectable({ providedIn: 'root' })
export class TopicService {
    private http = inject(HttpClient);
    private storage = inject(StorageService);

    public getAll(): Observable<TopicDTO[]> {
        return this.http.get<TopicDTO[]>(
            API.concat("topics"),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public getById(id: string): Observable<TopicDTO> {
        return this.http.get<TopicDTO>(
            API.concat(`topics/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public create(topic: TopicDTO): Observable<TopicDTO> {
        return this.http.post<TopicDTO>(
            API.concat("topics"),
            topic,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public update(id: string, topic: TopicDTO): Observable<TopicDTO> {
        return this.http.patch<TopicDTO>(
            API.concat(`topics/${id}`),
            topic,
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }

    public remove(id: string): Observable<TopicDTO> {
        return this.http.delete<TopicDTO>(
            API.concat(`topics/${id}`),
            {
                headers: {
                    Authorization: this.storage.getData("access_token") ?? ""
                }
            }
        );
    }
}
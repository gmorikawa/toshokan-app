import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CredentialDTO } from "../app/features/user/entities/credential.dto";
import { TokenDTO } from "../app/features/user/entities/token.dto";

const API = "http://localhost:8080/api/";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    public login(credential: CredentialDTO): Observable<TokenDTO> {
        return this.http.post<TokenDTO>(API.concat("auth/login"), credential);
    }
}
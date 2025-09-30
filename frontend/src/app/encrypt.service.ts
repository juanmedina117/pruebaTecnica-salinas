import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class EncryptService {
    constructor(private http: HttpClient) { }

    encrypt(text: string): Observable<{ encrypted: string }> {
        return this.http.post<{ encrypted: string }>("http://localhost:3000/api/encrypt", { text });
    }
}

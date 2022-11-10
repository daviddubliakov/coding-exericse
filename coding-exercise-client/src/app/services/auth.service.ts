import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { AuthRes } from "../shared/auth";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthRes> {
    return this.http.post(
      `${environment.apiUrl}/user/login`,
      {
        email,
        password,
      },
      httpOptions
    ) as Observable<AuthRes>;
  }

  register(email: string, password: string): Observable<AuthRes> {
    return this.http.post(
      `${environment.apiUrl}/user/registration`,
      {
        email,
        password,
      },
      httpOptions
    ) as Observable<AuthRes>;
  }

  public check(): Observable<AuthRes> {
    return this.http.get(
      `${environment.apiUrl}/user/check`,
      httpOptions
    ) as Observable<AuthRes>;
  }
}

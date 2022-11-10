import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { Bus } from "../shared/models/bus";

@Injectable({
  providedIn: "root",
})
export class BusService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Bus[]> {
    return this.http.get(`${environment.apiUrl}/bus/`) as Observable<Bus[]>;
  }

  getById(id: number): Observable<Bus> {
    return this.http.get(`${environment.apiUrl}/bus/${id}`) as Observable<Bus>;
  }
}

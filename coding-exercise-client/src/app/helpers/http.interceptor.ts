import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { StorageService } from "../services/storage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth_token = this.storageService.getUser();

    let clonedRequest = req.clone({
      withCredentials: true,
    });

    if (!req.headers.get("authorization") && auth_token) {
      clonedRequest = req.clone({
        withCredentials: true,
        headers: req.headers.append("authorization", `Bearer ${auth_token}`),
      });
    }

    return next.handle(clonedRequest);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];

import { Injectable } from "@angular/core";

const AUTH_TOKEN = "auth-token";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.localStorage.clear();
  }

  public saveUser(user: string): void {
    window.localStorage.removeItem(AUTH_TOKEN);
    window.localStorage.setItem(AUTH_TOKEN, JSON.stringify(user));
  }

  public getUser(): string | null {
    const user = window.localStorage.getItem(AUTH_TOKEN);

    if (user) return JSON.parse(user);

    return null;
  }
}

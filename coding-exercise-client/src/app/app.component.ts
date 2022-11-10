import { Component, OnChanges, SimpleChanges } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { StorageService } from "./services/storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnChanges {
  isLoggedIn: boolean = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.authService.check().subscribe({
          next: () => {
            if (
              this.router.url === "/login" ||
              this.router.url === "/register"
            ) {
              this.router.navigate(["home"]);
            }

            this.isLoggedIn = true;
          },
          error: () => {
            this.logout();
          },
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.storageService.clean();
    this.router.navigate(["login"]);
  }
}

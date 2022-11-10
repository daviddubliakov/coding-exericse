import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

import { BusService } from "src/app/services/bus.service";

import { Bus } from "src/app/shared/models/bus";
import { ErrorRes } from "src/app/shared/models/error";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  buses: Bus[] = [];
  displayedColumns: string[] = [
    "id",
    "year",
    "manufacturer",
    "model",
    "isElectric",
  ];
  loadingBuses: boolean = false;

  constructor(
    private busService: BusService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllBuses();
  }

  redirectToBusDetails(busId: number) {
    this.router.navigate(["bus", busId]);
  }

  private getAllBuses() {
    this.loadingBuses = true;

    this.busService.getAll().subscribe({
      next: (data: Bus[]) => {
        this.buses = data;
        this.loadingBuses = false;
      },
      error: (err) => {
        let errMessageHtml = "";

        err.error.forEach((error: ErrorRes) => {
          errMessageHtml = errMessageHtml + `• ${error.msg} \n`;
        });

        this._snackBar.open(errMessageHtml, "Close", {
          duration: 2000,
          verticalPosition: "top",
          panelClass: ["success-snackbar"],
        });

        this.loadingBuses = false;
      },
    });
  }
}

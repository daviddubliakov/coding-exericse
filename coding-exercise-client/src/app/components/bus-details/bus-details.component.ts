import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";

import { BusService } from "src/app/services/bus.service";
import { Bus } from "src/app/shared/models/bus";
import { ErrorRes } from "src/app/shared/models/error";

@Component({
  selector: "app-bus-details",
  templateUrl: "./bus-details.component.html",
  styleUrls: ["./bus-details.component.scss"],
})
export class BusDetailsComponent implements OnInit {
  bus: Bus | null = null;
  loadingBus: boolean = false;
  busId: number | null = null;

  constructor(
    private busService: BusService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.busId = Number(this.route.snapshot.params["id"]);
    this.getBusById();
  }

  private getBusById() {
    this.loadingBus = true;

    if (this.busId) {
      this.busService.getById(this.busId).subscribe({
        next: (data: Bus) => {
          this.bus = data;
          this.loadingBus = false;
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
          this.loadingBus = false;
        },
      });
    }
  }
}

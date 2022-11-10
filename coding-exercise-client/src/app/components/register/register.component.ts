import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

import { ErrorRes } from "../../shared/models/error";

import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl<string>("", [Validators.required]),
    password: new FormControl<string>("", [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  get registerFormData() {
    return {
      email: this.registerForm.controls.email.value as string,
      password: this.registerForm.controls.password.value as string,
    };
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService
      .register(this.registerFormData.email, this.registerFormData.password)
      .subscribe({
        next: (data) => {
          this.storageService.saveUser(data.auth_token);
          this.router.navigate(["home"]);
          this._snackBar.open("You're registered successfully", "Close", {
            duration: 2000,
            verticalPosition: "top",
            panelClass: ["success-snackbar"],
          });
        },
        error: (err) => {
          let errMessageHtml = "";

          err.error.forEach((error: ErrorRes) => {
            this.registerForm.controls[error.param].setErrors({
              incorrect: true,
            });
            errMessageHtml = errMessageHtml + `• ${error.msg} \n`;
          });

          this._snackBar.open(errMessageHtml, "Close", {
            duration: 2000,
            verticalPosition: "top",
            panelClass: ["success-snackbar"],
          });
        },
      });
  }
}

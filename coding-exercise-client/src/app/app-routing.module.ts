import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BusDetailsComponent } from "./components/bus-details/bus-details.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";

import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "bus/:id", component: BusDetailsComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

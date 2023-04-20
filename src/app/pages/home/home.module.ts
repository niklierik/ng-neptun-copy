import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { HeaderModule } from "../../shared/header/header.module";

@NgModule({
    declarations: [HomeComponent],
    providers: [],
    imports: [CommonModule, HomeRoutingModule, HeaderModule],
})
export class HomeModule {}

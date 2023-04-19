import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { HeaderComponent } from "src/app/shared/header/header.component";
import { HeaderModule } from "src/app/shared/header/header.module";

@NgModule({
    declarations: [HomeComponent],
    providers: [],
    imports: [CommonModule, HomeRoutingModule, HeaderModule],
})
export class HomeModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { HeaderModule } from "../../shared/header/header.module";
import { CourseCardComponent } from "./course-card/course-card.component";
import { MatCardModule } from "@angular/material/card";

@NgModule({
    declarations: [HomeComponent, CourseCardComponent],
    providers: [],
    imports: [CommonModule, HomeRoutingModule, HeaderModule, MatCardModule],
})
export class HomeModule {}

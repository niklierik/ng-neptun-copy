import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { HeaderModule } from "../../shared/header/header.module";
import { CourseCardComponent } from "./course-card/course-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatCommonModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [HomeComponent, CourseCardComponent],
    providers: [],
    imports: [
        CommonModule,
        HomeRoutingModule,
        HeaderModule,
        MatCardModule,
        MatCommonModule,
        MatListModule,
        MatButtonModule,
    ],
})
export class HomeModule {}

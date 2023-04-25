import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WriteMarkRoutingModule } from "./write-mark-routing.module";
import { WriteMarkComponent } from "./write-mark.component";
import { HeaderModule } from "../../shared/header/header.module";
import { CourseComponent } from "./course/course.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    declarations: [WriteMarkComponent, CourseComponent],
    imports: [
        CommonModule,
        WriteMarkRoutingModule,
        HeaderModule,
        MatDividerModule,
        MatSelectModule,
    ],
})
export class WriteMarkModule {}

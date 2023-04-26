import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MarksRoutingModule } from "./marks-routing.module";
import { MarksComponent } from "./marks.component";
import { MatTableModule } from "@angular/material/table";
import { HeaderModule } from "src/app/shared/header/header.module";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
    declarations: [MarksComponent],
    imports: [
        CommonModule,
        MarksRoutingModule,
        MatTableModule,
        HeaderModule,
        MatDividerModule,
    ],
})
export class MarksModule {}

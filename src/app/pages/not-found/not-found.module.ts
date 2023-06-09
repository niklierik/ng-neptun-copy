import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NotFoundRoutingModule } from "./not-found-routing.module";
import { NotFoundComponent } from "./not-found.component";
import { HeaderModule } from "../../shared/header/header.module";

@NgModule({
    declarations: [NotFoundComponent],
    imports: [CommonModule, NotFoundRoutingModule, HeaderModule],
})
export class NotFoundModule {}

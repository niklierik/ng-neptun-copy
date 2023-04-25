import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { HeaderModule } from "src/app/shared/header/header.module";
import { MatCardModule } from "@angular/material/card";

@NgModule({
    declarations: [UserComponent],
    imports: [CommonModule, UserRoutingModule, HeaderModule, MatCardModule],
})
export class UserModule {}

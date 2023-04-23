import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
    constructor(
        private readonly usersService: UserService,
        private readonly router: Router,
    ) {}
    logout() {
        this.usersService
            .logout()
            .then(() => {
                this.router.navigate(["/login"]);
            })
            .catch((e) => console.log(e));
    }
}

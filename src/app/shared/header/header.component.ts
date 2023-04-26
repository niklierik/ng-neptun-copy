import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
    userStr: string;
    markText: string;
    markRoute: string;
    constructor(
        private readonly usersService: UserService,
        private readonly router: Router,
    ) {
        this.userStr = `${usersService.userData.familyname} ${usersService.userData.forename} (${usersService.currentUser?.email})`;
        if (usersService.userData.isTeacher) {
            this.markText = "Jegybeírás";
            this.markRoute = "/write-mark";
            return;
        }
        this.markText = "Jegyek";
        this.markRoute = "/marks";
    }
    logout() {
        this.usersService
            .logout()
            .then(() => {
                this.router.navigate(["/login"]);
            })
            .catch((e) => console.log(e));
    }
}

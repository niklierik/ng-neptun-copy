import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
})
export class UserComponent {
    user?: User;
    private sub?: Subscription;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly usersService: UserService,
    ) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe((params) => {
            this.usersService
                .getUser(params["id"])
                .then((u) => (this.user = u));
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}

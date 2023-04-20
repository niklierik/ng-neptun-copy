import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private readonly usersService: UserService,
    ) {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
        });
    }

    async onSubmit() {
        if (this.loginForm.valid) {
            return this.usersService.login(
                this.loginForm.get("email")?.value,
                this.loginForm.get("password")?.value,
            );
        }
        return null;
    }
}

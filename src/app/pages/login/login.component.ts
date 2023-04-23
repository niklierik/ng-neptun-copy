import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    loginForm: FormGroup;
    error: string;
    disableLogin: boolean;

    constructor(
        private readonly fb: FormBuilder,
        private readonly usersService: UserService,
        private readonly router: Router,
    ) {
        this.disableLogin = false;
        this.error = "";
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
        });
    }

    async onSubmit() {
        if (this.loginForm.valid) {
            this.disableLogin = true;
            this.usersService
                .login(this.email, this.password)
                .then(() => {
                    this.router.navigate(["/home"]);
                })
                .catch((e) => {
                    this.error = this.usersService.fireauthErrorPrettier(e);
                })
                .finally(() => {
                    this.disableLogin = false;
                });
        }
        return null;
    }

    get email() {
        return this.loginForm.get("email")?.value;
    }

    get password() {
        return this.loginForm.get("password")?.value;
    }
}

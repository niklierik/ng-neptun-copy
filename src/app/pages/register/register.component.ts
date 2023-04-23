import { Component } from "@angular/core";
import {
    FormBuilder,
    Validators,
    FormGroup,
    ValidatorFn,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
    registerForm: FormGroup;
    error: string;
    disableRegister: boolean;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private readonly usersService: UserService,
    ) {
        this.disableRegister = false;
        this.error = "";
        this.registerForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
            confirmPassword: [
                "",
                [Validators.required, this.passwordMatch.bind(this)],
            ],
            familyname: ["", Validators.required],
            forename: ["", Validators.required],
            birthdate: ["", Validators.required],
            address: ["", Validators.required],
            teacher: [false],
        });
    }

    onSubmit() {
        this.disableRegister = true;
        this.usersService
            .register(this)
            .then(() => {
                this.router.navigate(["/"]);
            })
            .catch((e) => {
                console.log(e);
                this.error = this.usersService.fireauthErrorPrettier(e);
            })
            .finally(() => (this.disableRegister = false));
    }

    passwordMatch: ValidatorFn = () => {
        if (this.passwordsDoNotMatch) {
            return { passwordsDoNotMatch: this.passwordsDoNotMatch };
        }
        return null;
    };

    get email(): string {
        return this.registerForm?.get("email")?.value;
    }

    get password(): string {
        return this.registerForm?.get("password")?.value;
    }

    get passwordAgain(): string {
        return this.registerForm?.get("confirmPassword")?.value;
    }

    get familyname(): string {
        return this.registerForm?.get("familyname")?.value;
    }

    get forename(): string {
        return this.registerForm?.get("forename")?.value;
    }

    get birthdate(): string {
        return this.registerForm?.get("birthdate")?.value;
    }

    get address(): string {
        return this.registerForm?.get("address")?.value;
    }

    get isTeacher(): boolean {
        return this.registerForm?.get("teacher")?.value;
    }

    get passwordsDoNotMatch() {
        return (
            this.registerForm?.get("password")?.value !==
            this.registerForm?.get("confirmPassword")?.value
        );
    }
}

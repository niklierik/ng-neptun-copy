import { Component } from "@angular/core";
import {
    FormBuilder,
    Validators,
    FormGroup,
    ValidatorFn,
} from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
    registerForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private readonly usersService: UserService,
    ) {
        this.registerForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
            confirmPassword: [
                "",
                [Validators.required, this.passwordMatch.bind(this)],
            ],
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            birthdate: ["", Validators.required],
            address: ["", Validators.required],
            teacher: [false],
        });
    }

    async onSubmit() {
        if (this.registerForm.valid) {
            return this.usersService.register(
                this.registerForm.get("email")?.value,
                this.registerForm.get("password")?.value,
                this.registerForm.get("confirmPassword")?.value,
                this.registerForm.get("firstName")?.value,
                this.registerForm.get("lastName")?.value,
                this.registerForm.get("birthdate")?.value,
                this.registerForm.get("address")?.value,
                this.registerForm.get("teacher")?.value,
            );
        }
        return null;
    }

    passwordMatch: ValidatorFn = () => {
        if (this.passwordsDoNotMatch) {
            return { passwordsDoNotMatch: this.passwordsDoNotMatch };
        }
        return null;
    };

    get passwordsDoNotMatch() {
        return (
            this.registerForm?.get("password")?.value !==
            this.registerForm?.get("confirmPassword")?.value
        );
    }
}

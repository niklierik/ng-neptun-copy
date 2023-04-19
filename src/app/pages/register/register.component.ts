import { Component } from "@angular/core";
import {
    FormBuilder,
    Validators,
    FormGroup,
    ValidatorFn,
} from "@angular/forms";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
    registerForm: FormGroup;
    constructor(private formBuilder: FormBuilder) {
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
        });
    }

    onSubmit() {
        // Handle form submission
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

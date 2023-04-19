import { Component } from "@angular/core";
import {
    FormBuilder,
    Validators,
    FormGroup,
    AbstractControl,
    ValidationErrors,
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
            confirmPassword: ["", Validators.required],
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            birthdate: ["", Validators.required],
            address: ["", Validators.required],
        });
        this.registerForm.addValidators(this.passwordsMatchValidator);
    }

    onSubmit() {
        // Handle form submission
    }

    private passwordsMatchValidator(
        control: AbstractControl
    ): ValidationErrors {
        const password = control.get("password");
        const confirmPassword = control.get("confirmPassword");
        let errors: ValidationErrors = { passwordsDoNotMatch: false };
        if (
            password &&
            confirmPassword &&
            password.value !== confirmPassword.value
                ? { passwordsDoNotMatch: true }
                : null
        ) {
            errors = { passwordsDoNotMatch: true };
        }
        return errors;
    }

    get passwordsDoNotMatch() {
        return this.registerForm.hasError("passwordsDoNotMatch");
    }
}

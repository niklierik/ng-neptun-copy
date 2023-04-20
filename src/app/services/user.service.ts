import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private readonly auth: AngularFireAuth) {}

    async login(email: string, password: string): Promise<User | null> {
        const result = await this.auth.signInWithEmailAndPassword(
            email,
            password,
        );
        return {};
    }
}

import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "../models/user.model";

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
        if (result.user == null) {
            return null;
        }
        return {
            email: result.user.email,
        };
    }
}

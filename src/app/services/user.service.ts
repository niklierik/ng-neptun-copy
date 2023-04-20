import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import {
    Firestore,
    doc,
    getDoc,
    DocumentSnapshot,
} from "@angular/fire/firestore";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private readonly auth: Auth, private readonly db: Firestore) {}

    async register(email: string, password: string, passwordAgain: string) {}

    async login(
        email: string,
        password: string,
    ): Promise<DocumentSnapshot | null> {
        const result = await signInWithEmailAndPassword(
            this.auth,
            email,
            password,
        );
        if (result?.user?.email == null) {
            return null;
        }
        const docRef = doc(this.db, `users/${email}`);
        if (docRef?.id == null) {
            return null;
        }
        return getDoc(docRef);
    }

    async logout() {
        return signOut(this.auth);
    }
}

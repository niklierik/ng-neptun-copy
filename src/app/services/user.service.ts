import { Injectable } from "@angular/core";
import {
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "@angular/fire/auth";
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

    async register(
        email?: string,
        password?: string,
        passwordAgain?: string,
        firstname?: string,
        lastname?: string,
        birthdate?: string,
        address?: string,
        teacher?: boolean,
    ) {
        if (
            !email ||
            !password ||
            !passwordAgain ||
            !firstname ||
            !lastname ||
            !birthdate ||
            !address ||
            !teacher ||
            password !== passwordAgain
        ) {
            return null;
        }
        const res = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password,
        );
        if (res?.user?.email == null) {
            return null;
        }
        return res;
    }

    async login(
        email?: string,
        password?: string,
    ): Promise<DocumentSnapshot | null> {
        if (!email || !password) {
            return null;
        }
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
        const docSnapshot = await getDoc(docRef);
        return docSnapshot;
    }

    async logout() {
        return signOut(this.auth);
    }
}

import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import {
    collectionData,
    Firestore,
    collection,
    doc,
    getDoc,
    DocumentSnapshot,
    docData,
} from "@angular/fire/firestore";
import { Observable } from "@firebase/util";
import { User } from "../models/user.model";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private readonly auth: Auth, private readonly db: Firestore) {}

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

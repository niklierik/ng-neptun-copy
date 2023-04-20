import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
import {
    collectionData,
    Firestore,
    collection,
    doc,
    getDoc,
    DocumentSnapshot,
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
    ): Promise<DocumentSnapshot<User> | null> {
        const result = await signInWithEmailAndPassword(
            this.auth,
            email,
            password,
        );
        if (result?.user?.email == null) {
            return null;
        }
        const collectionRef = collection<User>(this.db);
        const docRef = doc<User>(this.db, "users");
        if (docRef == null) {
            return null;
        }
        return getDoc<User>(docRef);
    }
}

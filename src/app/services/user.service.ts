import { forwardRef, Inject, Injectable } from "@angular/core";
import { FirebaseError } from "@angular/fire/app";
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "@angular/fire/auth";
import {
    doc,
    Firestore,
    collection,
    setDoc,
    getDoc,
} from "@angular/fire/firestore";
import { CourseUnpopulated } from "../models/course.model";
import { User, UserUnpopulated } from "../models/user.model";
import { RegisterComponent } from "../pages/register/register.component";
import { CourseService } from "./course.service";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(
        private readonly auth: Auth,
        private readonly firestore: Firestore,
    ) {}

    get collection() {
        return collection(this.firestore, "users");
    }

    async getPopulatedUser(id: string) {
        const user = await this.getUser(id);
        if (user == null) {
            return undefined;
        }
        return this.populate(user);
    }

    async getCourse(id: string) {
        const res = (
            await getDoc(doc(collection(this.firestore, "courses"), id))
        ).data() as CourseUnpopulated;
        res.id = id;
        return res;
    }

    async register(register: RegisterComponent) {
        if (register.password !== register.passwordAgain) {
            console.log(register);
            throw "Jelszavak nem egyeznek";
        }
        const result = await createUserWithEmailAndPassword(
            this.auth,
            register.email,
            register.password,
        );
        console.log("Regisztráció sikeres, adatok feltöltése...");
        if (result?.user?.email == null) {
            throw "Sikertelen regisztráció.";
        }
        const usersCol = collection(this.firestore, "users");
        const usersDoc = doc(usersCol, result.user.uid);
        const userData = {
            email: register.email,
            birthdate: register.birthdate,
            isTeacher: register.isTeacher,
            familyname: register.familyname,
            forename: register.forename,
            address: register.address,
        };
        await setDoc(usersDoc, userData);
        const json = JSON.stringify(userData);
        window.localStorage.setItem("user", json);
    }

    async login(email: string, password: string) {
        const result = await signInWithEmailAndPassword(
            this.auth,
            email,
            password,
        );
        if (result?.user?.email == null) {
            return null;
        }
        const usersCol = collection(this.firestore, "users");
        const usersDoc = doc(usersCol, result.user.uid);
        if (usersDoc?.id == null) {
            return null;
        }
        const res = await getDoc(usersDoc);
        const json = JSON.stringify(res.data());
        window.localStorage.setItem("user", json);
        return res;
    }

    async populate(user: UserUnpopulated): Promise<User> {
        return {
            ...user,
            relatedCourses: await Promise.all(
                user.relatedCourses.map(async (c) => this.getCourse(c.id)),
            ),
        };
    }

    async getUser(id: string): Promise<UserUnpopulated | undefined> {
        const res = (
            await getDoc(doc(this.collection, id))
        ).data() as UserUnpopulated;
        res.id = id;
        return res;
    }

    async logout() {
        await signOut(this.auth);
        window.localStorage.removeItem("user");
    }

    fireauthErrorPrettier(error: FirebaseError) {
        switch (error.code) {
            case "auth/email-already-in-use": {
                return "Ez az email cím alatt már létezik felhasználó.";
            }
            case "auth/internal-error": {
                return "A Firebase nem működik, kérlek próbáld újra később.";
            }
            case "auth/invalid-email": {
                return "Érvénytelen e-mail cím.";
            }
            case "auth/invalid-password": {
                return "A jelszó nem megfelelő. Legalább 6 karakterhosszúnak kell lenni-e.";
            }
            case "auth/user-not-found": {
                return "Nem létezik ilyen felhasználó.";
            }
            case "auth/wrong-password": {
                return "Érvénytelen jelszó.";
            }
        }
        return error.code;
    }

    get userData(): UserUnpopulated {
        return JSON.parse(localStorage.getItem("user") ?? "null");
    }

    get currentUser() {
        return this.auth.currentUser;
    }

    get isLoggedIn() {
        return Boolean(this.currentUser);
    }
}

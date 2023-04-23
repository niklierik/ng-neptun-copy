import { Injectable } from "@angular/core";
import {
    collectionGroup,
    doc,
    Firestore,
    getDoc,
    getDocs,
    query,
    where,
} from "@angular/fire/firestore";
import { collection } from "@firebase/firestore";
import { Course } from "../models/course.model";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root",
})
export class CourseService {
    constructor(
        private readonly firestore: Firestore,
        private readonly usersService: UserService,
    ) {}

    get collection() {
        return collection(this.firestore, "courses");
    }

    get collectionGroup() {
        return collectionGroup(this.firestore, "courses");
    }

    async getAll() {
        const docRef = doc(
            collection(this.firestore, "users"),
            this.usersService.currentUser?.uid,
        );
        const filterByStudents = where("students", "array-contains", docRef);
        const res = await getDocs(query(this.collection, filterByStudents));
        return res.docs.map((doc) => doc.data()) as Course[];
    }
}

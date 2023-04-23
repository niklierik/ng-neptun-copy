import { Injectable } from "@angular/core";
import { collection, Firestore } from "@angular/fire/firestore";

@Injectable({
    providedIn: "root",
})
export class SubjectService {
    constructor(private readonly firestore: Firestore) {}

    getSubjects() {
        const subjectsCol = collection(this.firestore, "subjects");
    }
}

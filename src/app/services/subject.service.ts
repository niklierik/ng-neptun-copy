import { Injectable } from "@angular/core";
import { collection, doc, Firestore, getDoc } from "@angular/fire/firestore";
import { Subject } from "../models/subject.model";

@Injectable({
    providedIn: "root",
})
export class SubjectService {
    constructor(private readonly firestore: Firestore) {}

    async getSubjects() {
        const subjectsCol = collection(this.firestore, "subjects");
    }

    async getSubject(id: string): Promise<Subject> {
        return (
            await getDoc(doc(collection(this.firestore, "subjects"), id))
        ).data() as Subject;
    }
}

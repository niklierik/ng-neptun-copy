import { Injectable } from "@angular/core";
import { collection, doc, Firestore, getDoc } from "@angular/fire/firestore";
import { SubjectUnpopulated } from "../models/subject.model";

@Injectable({
    providedIn: "root",
})
export class SubjectService {
    constructor(private readonly firestore: Firestore) {}

    get collection() {
        return collection(this.firestore, "subjects");
    }

    async getSubjects() {}

    async getSubject(id: string): Promise<SubjectUnpopulated> {
        const docRef = doc(this.collection, id);
        const res = (await getDoc(docRef)).data() as SubjectUnpopulated;
        res.id = id;
        return res;
    }
}

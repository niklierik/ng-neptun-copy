import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import {
    collection,
    doc,
    Firestore,
    getDoc,
    orderBy,
    query,
    where,
} from "@angular/fire/firestore";
import { getDocs } from "@firebase/firestore";
import { Mark, MarkUnpopulated } from "../models/mark.model";
import { SubjectService } from "./subject.service";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root",
})
export class MarkService {
    constructor(
        private firestore: Firestore,
        private auth: Auth,
        private readonly subjectsService: SubjectService,
        private readonly usersService: UserService,
    ) {}

    get collection() {
        return collection(this.firestore, "marks");
    }

    async getPopulatedMarks(): Promise<Mark[]> {
        const marks = await this.getMarks();
        const res = await Promise.all(
            marks.map(async (mark) => {
                return {
                    ...mark,
                    subject: await this.subjectsService.getSubject(
                        mark.subject.id,
                    ),
                    user: await this.usersService.getUser(mark.user.id),
                };
            }),
        );
        return res.sort((a, b) => a.subject.name.localeCompare(b.subject.name));
    }

    async getMarks(): Promise<MarkUnpopulated[]> {
        if (this.auth.currentUser?.uid == null) {
            return [];
        }
        const filter = where(
            "user",
            "==",
            doc(collection(this.firestore, "users"), this.auth.currentUser.uid),
        );
        const order = orderBy("mark", "desc");
        const res = await getDocs(query(this.collection, filter, order));
        console.log(res);
        const docs = await Promise.all(res.docs.map((doc) => doc.data()));
        console.log(docs);
        return docs as MarkUnpopulated[];
    }
}

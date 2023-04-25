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
import { Course, CourseUnpopulated } from "../models/course.model";
import { User } from "../models/user.model";
import { SubjectService } from "./subject.service";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root",
})
export class CourseService {
    constructor(
        private readonly firestore: Firestore,
        private readonly usersService: UserService,
        private readonly subjectsService: SubjectService,
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

    async populateCourse(course: CourseUnpopulated): Promise<Course> {
        return {
            subject: await this.subjectsService.getSubject(course.subject),
            students: (
                await Promise.all(
                    course.students.map(async (id) =>
                        this.usersService.getUser(id),
                    ),
                )
            ).filter((u) => u) as User[],
            teachers: (
                await Promise.all(
                    course.teachers.map(async (id) =>
                        this.usersService.getUser(id),
                    ),
                )
            ).filter((u) => u) as User[],
            day: course.day,
            hour: course.hour,
        };
    }
}

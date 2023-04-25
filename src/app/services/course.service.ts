import { forwardRef, Inject, Injectable } from "@angular/core";
import {
    collectionGroup,
    doc,
    Firestore,
    getDoc,
    getDocs,
    query,
    where,
} from "@angular/fire/firestore";
import { collection, or } from "@firebase/firestore";
import { Course, CourseUnpopulated } from "../models/course.model";
import { UserUnpopulated } from "../models/user.model";
import { SubjectService } from "./subject.service";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root",
})
export class CourseService {
    constructor(
        private readonly firestore: Firestore,
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,
        @Inject(forwardRef(() => SubjectService))
        private readonly subjectsService: SubjectService,
    ) {}

    get collection() {
        return collection(this.firestore, "courses");
    }

    get collectionGroup() {
        return collectionGroup(this.firestore, "courses");
    }

    async getAll(): Promise<CourseUnpopulated[]> {
        const docRef = doc(
            collection(this.firestore, "users"),
            this.usersService.currentUser?.uid,
        );
        const filterByStudents = or(
            where("students", "array-contains", docRef),
            where("teachers", "array-contains", docRef),
        );
        const res = await getDocs(query(this.collection, filterByStudents));
        return res.docs.map((doc) => doc.data()) as CourseUnpopulated[];
    }
    async getAllPopulated(): Promise<Course[]> {
        const courses = await this.getAll();
        return Promise.all(courses.map((c) => this.populateCourse(c)));
    }

    async getCourse(id: string) {
        const res = (
            await getDoc(doc(this.collection, id))
        ).data() as CourseUnpopulated;
        res.id = id;
        return res;
    }

    async populateCourse(course: CourseUnpopulated): Promise<Course> {
        const res: Course = {
            id: course.id,
            subject: await this.subjectsService.getSubject(course.subject.id),
            students: (
                (
                    await Promise.all(
                        course.students.map(async (u) =>
                            this.usersService.getUser(u.id),
                        ),
                    )
                ).filter((u) => u) as UserUnpopulated[]
            ).sort((a, b) =>
                (a.familyname + " " + a.forename).localeCompare(
                    b.familyname + " " + b.forename,
                ),
            ),
            teachers: (
                (
                    await Promise.all(
                        course.teachers.map(async (u) =>
                            this.usersService.getUser(u.id),
                        ),
                    )
                ).filter((u) => u) as UserUnpopulated[]
            ).sort((a, b) =>
                (a.familyname + " " + a.forename).localeCompare(
                    b.familyname + " " + b.forename,
                ),
            ),
            day: course.day,
            hour: course.hour,
        };
        return res;
    }
}

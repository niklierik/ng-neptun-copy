import { Timestamp } from "@angular/fire/firestore";
import { Course, CourseUnpopulated } from "./course.model";
import { UnpopulatedDoc } from "./unpopulated-doc";

export interface UserUnpopulated {
    id: string;
    email: string;
    isTeacher: boolean;
    birthdate: Timestamp;
    address: string;
    familyname: string;
    forename: string;
    relatedCourses: UnpopulatedDoc[];
}

export function getFullName(user?: UserUnpopulated) {
    if (!user) {
        return "";
    }
    return `${user.familyname} ${user.forename}`;
}

export interface User {
    id: string;
    email: string;
    isTeacher: boolean;
    birthdate: Timestamp;
    address: string;
    familyname: string;
    forename: string;
    relatedCourses: CourseUnpopulated[];
}

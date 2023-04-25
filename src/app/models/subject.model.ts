import { Course, CourseUnpopulated } from "./course.model";
import { UnpopulatedDoc } from "./unpopulated-doc";

export interface SubjectUnpopulated {
    id: string;
    name: string;
    credit: number;
    hoursAWeek: number;
    courses: UnpopulatedDoc[];
}

export interface Subject {
    id: string;
    name: string;
    credit: number;
    hoursAWeek: number;
    courses: CourseUnpopulated[];
}

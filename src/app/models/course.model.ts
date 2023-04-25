import { Subject } from "./subject.model";
import { User } from "./user.model";

export enum DayOfWeek {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
}

export interface CourseUnpopulated {
    day: DayOfWeek;
    hour: number;
    subject: string;
    teachers: string[]; // e-mails
    students: string[]; // e-mails
}

export interface Course {
    day: DayOfWeek;
    hour: number;
    subject: Subject | undefined;
    teachers: User[]; // e-mails
    students: User[]; // e-mails
}

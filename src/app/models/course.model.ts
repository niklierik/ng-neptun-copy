import { Subject } from "./subject.model";

type User = string; //  e-mail

export enum DayOfWeek {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
}

export interface Course {
    course: Course;
    day: DayOfWeek;
    hour: number;
    subject: Subject;
    teachers: User[]; // e-mails
    students: User[]; // e-mails
}

import { SubjectUnpopulated } from "./subject.model";
import { UnpopulatedDoc } from "./unpopulated-doc";
import { UserUnpopulated } from "./user.model";

export enum DayOfWeek {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
}

export interface CourseUnpopulated {
    id: string;
    day: DayOfWeek;
    hour: number;
    subject: UnpopulatedDoc;
    teachers: UnpopulatedDoc[]; // e-mails
    students: UnpopulatedDoc[]; // e-mails
}

export interface Course {
    id: string;
    day: DayOfWeek;
    hour: number;
    subject: SubjectUnpopulated | undefined;
    teachers: UserUnpopulated[]; // e-mails
    students: UserUnpopulated[]; // e-mails
}

export function courseToString(course: Course) {
    return course.subject?.name + " " + courseTime(course);
}

export function courseTime(course: Course) {
    return (
        dayOfWeekToString(course.day) +
        " | " +
        course.hour +
        ":00 - " +
        (course.hour + (course.subject?.hoursAWeek ?? 0)) +
        ":00"
    );
}

export function dayOfWeekToString(dayOfWeek: DayOfWeek) {
    switch (dayOfWeek) {
        case DayOfWeek.Monday:
            return "Hétfő";
        case DayOfWeek.Tuesday:
            return "Kedd";
        case DayOfWeek.Wednesday:
            return "Szerda";
        case DayOfWeek.Thursday:
            return "Csütörtök";
        case DayOfWeek.Friday:
            return "Péntek";
    }
}

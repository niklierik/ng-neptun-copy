import { SubjectUnpopulated } from "./subject.model";
import { UnpopulatedDoc } from "./unpopulated-doc";
import { User } from "./user.model";

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
    teachers: User[]; // e-mails
    students: User[]; // e-mails
}

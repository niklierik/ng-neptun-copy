import { Course } from "./course.model";

export interface Subject {
    name: string;
    credit: number;
    hoursAWeek: number;
    courses: (Course | string)[];
}

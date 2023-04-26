import { Component, Input } from "@angular/core";
import { Course } from "src/app/models/course.model";

@Component({
    selector: "write-mark-course",
    templateUrl: "./course.component.html",
    styleUrls: ["./course.component.scss"],
})
export class CourseComponent {
    @Input() course?: Course;
    marks: number[];

    constructor() {
        this.marks = [];
        for (let i = 1; i <= 5; i++) {
            this.marks.push(i);
        }
    }
}

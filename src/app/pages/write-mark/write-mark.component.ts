import { Component } from "@angular/core";
import { Course } from "src/app/models/course.model";
import { CourseService } from "src/app/services/course.service";

@Component({
    selector: "app-write-mark",
    templateUrl: "./write-mark.component.html",
    styleUrls: ["./write-mark.component.scss"],
})
export class WriteMarkComponent {
    courses: Course[];

    constructor(private readonly courseService: CourseService) {
        this.courses = [];
        courseService.getAllPopulated().then((res) => (this.courses = res));
    }
}

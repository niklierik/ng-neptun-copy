import { Component } from "@angular/core";
import { Course } from "src/app/models/course.model";
import { CourseService } from "src/app/services/course.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
    courses: Course[];

    constructor(private readonly courseService: CourseService) {
        this.courses = [];
        this.courseService
            .getAll()
            .then((c) => (this.courses = c as unknown as Course[]))
            .catch((err) => console.log(err));
    }

    stringify(course: Course) {
        return JSON.stringify(course);
    }
}

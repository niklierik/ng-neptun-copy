import { Component } from "@angular/core";
import { Course, CourseUnpopulated } from "src/app/models/course.model";
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
            .getAllPopulated()
            .then((courses) => (this.courses = courses))
            .catch((err) => console.log(err));
    }

    stringify(data: any) {
        return JSON.stringify(data);
    }
}

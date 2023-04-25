import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Course, courseToString } from "src/app/models/course.model";
import { User } from "src/app/models/user.model";
import { CourseService } from "src/app/services/course.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
})
export class UserComponent {
    user?: User;
    courses?: Course[];
    private sub?: Subscription;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly usersService: UserService,
        private readonly coursesService: CourseService,
    ) {}

    teacherTxt() {
        return this.user?.isTeacher ? "Tanár" : "Diák";
    }

    teacherTxt2() {
        return this.user?.isTeacher ? "Tanít:" : "Kurzuson részt vesz:";
    }

    courseStr(course: Course) {
        return courseToString(course);
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe((params) => {
            this.usersService.getPopulatedUser(params["id"]).then(async (u) => {
                this.user = u;
                if (this.user != null) {
                    this.courses = await Promise.all(
                        this.user.relatedCourses.map((course) =>
                            this.coursesService.populateCourse(course),
                        ),
                    );
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}

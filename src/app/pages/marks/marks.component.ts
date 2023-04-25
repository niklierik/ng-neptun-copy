import { Component } from "@angular/core";
import { Mark } from "src/app/models/mark.model";
import { MarkService } from "src/app/services/mark.service";
import * as _ from "lodash";

@Component({
    selector: "app-marks",
    templateUrl: "./marks.component.html",
    styleUrls: ["./marks.component.scss"],
})
export class MarksComponent {
    marks: Mark[];
    avg: number;

    constructor(private readonly marksService: MarkService) {
        this.avg = 0;
        this.marks = [];
        marksService.getPopulatedMarks().then((res) => {
            console.log(res);
            this.marks = res;
            const weightedCredits = _.sum(
                this.marks.map(
                    (mark) => mark.mark * (mark.subject?.credit ?? 0),
                ),
            );
            const weights = _.sum(
                this.marks.map((mark) => mark.subject?.credit ?? 0),
            );
            this.avg = weightedCredits / weights;
        });
    }
}

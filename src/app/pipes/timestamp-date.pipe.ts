import { Pipe, PipeTransform } from "@angular/core";
import { Timestamp } from "@angular/fire/firestore";
import { format } from "date-fns";

@Pipe({
    name: "timestampDate",
})
export class TimestampDateOnlyPipe implements PipeTransform {
    transform(
        value: Timestamp | Date | string | undefined,
        ...args: unknown[]
    ): string {
        if (value == null) {
            return "";
        }
        if (value instanceof Timestamp) {
            return this.transform(value.toDate());
        }
        if (value instanceof Date) {
            return format(value, "yyyy/MM/dd");
        }
        if (typeof value === "string") {
            return value;
        }
        throw new Error("Invalid argument for Timestamp pipe.");
    }
}

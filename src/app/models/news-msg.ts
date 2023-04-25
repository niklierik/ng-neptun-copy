import { SubjectUnpopulated } from "./subject.model";

type User = string; // e-mail

export interface News {
    id: string;
    from: User;
    content: string;
    createdAt: Date;
    subject: SubjectUnpopulated | string;
}

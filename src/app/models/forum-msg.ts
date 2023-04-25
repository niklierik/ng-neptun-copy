import { SubjectUnpopulated } from "./subject.model";

type User = string; // e-mail

export interface ForumMsg {
    from: User;
    content: string;
    createdAt: Date;
    subject: SubjectUnpopulated | string;
}

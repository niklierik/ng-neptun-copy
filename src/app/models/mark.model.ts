import { SubjectUnpopulated } from "./subject.model";
import { UnpopulatedDoc } from "./unpopulated-doc";
import { UserUnpopulated } from "./user.model";

export interface MarkUnpopulated {
    id: string;
    user: UnpopulatedDoc;
    subject: UnpopulatedDoc;
    mark: number;
}

export interface Mark {
    id: string;
    user?: UserUnpopulated;
    subject?: SubjectUnpopulated;
    mark: number;
}

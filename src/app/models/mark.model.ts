import { UnpopulatedDoc } from "./unpopulated-doc";

export interface Mark {
    id: string;
    user: UnpopulatedDoc;
    subject: UnpopulatedDoc;
    mark: number;
}

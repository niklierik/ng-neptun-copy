type User = string; //  e-mail

export interface Message {
    from: User;
    to: User;
    content: string;
    createdAt: Date;
}

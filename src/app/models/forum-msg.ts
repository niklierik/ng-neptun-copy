type User = string; // e-mail

export interface ForumMsg {
    from: User;
    content: string;
    createdAt: Date;
}

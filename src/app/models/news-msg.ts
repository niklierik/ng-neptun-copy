type User = string; // e-mail

export interface News {
    from: User;
    content: string;
    createdAt: Date;
}

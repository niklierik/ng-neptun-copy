export interface User {
    email: string;
    isTeacher: boolean;
    birthdate: string;
    address: string;
    familyname: string;
    forename: string;
}

export function getFullName(user?: User) {
    if (!user) {
        return "";
    }
    return `${user.familyname} ${user.forename}`;
}

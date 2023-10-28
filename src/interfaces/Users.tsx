export default interface User {
    uid?: string;
    createdAt?: number;
    displayName: string;
    email?: string;
    friendRequest?: number[];
    friends?: number[];
    updatedAt?: number;
    picture?: string;
}
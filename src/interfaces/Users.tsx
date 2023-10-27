export default interface User {
    createdAt?: number;
    displayName: string;
    email?: string;
    friendRequest?: number[];
    friends?: number[];
    uid?: string;
    updatedAt?: number;
    picture?: string;
}
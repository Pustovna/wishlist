export default interface User {
    uid: string;
    displayName: string | null;
    email?: string | null;
    friendRequest?: number[];
    friends?: number[];
    picture?: string;
    updatedAt?: number;
    createdAt?: number;
    wishlist?: string;
}
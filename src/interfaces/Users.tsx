export interface User {
    uid: string;
    displayName: string | null;
    email?: string | null;
    friendsRequest?: string[];
    friendsWaiting?: string[];
    friends?: number[] | any;
    picture?: string;
    updatedAt?: number;
    createdAt?: number;
    wishlist?: string;
}

export interface Friend {
    id: string;
    displayName: string | null;
}
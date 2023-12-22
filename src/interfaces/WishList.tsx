
interface wish {
    id: number;
    price: number;
    comment: string;
    
}

export default interface WishList {
    list: wish[];
    wasChecked: number[];
}
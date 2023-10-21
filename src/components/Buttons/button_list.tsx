import { useCartStore } from "@/store/zustand";
import exp from "constants";

type ButtonListProps = {
        typeOfDo: string;
}

const ButtonList: React.FC<ButtonListProps>  = ({ typeOfDo }) => {
    const {add: handleAdd, remove: handleDelete} = useCartStore();
        return (
            
                <button className="mr-10" type="button" onClick={typeOfDo === "add" ? handleAdd : handleDelete}>
                    {}
                </button>
          
        )
}
export default ButtonList;
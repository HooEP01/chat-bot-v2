import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import _ from "lodash";
import { deleteFaqType } from "../store/faqType/faqTypeSlice";

export const useButton = () => {
    const dispatch: AppDispatch = useDispatch();

    const [selectedButton, setButton] = useState<string | undefined>();

    const setSelectedButton = (e: React.MouseEvent<HTMLElement>) => {
        const key = (e.currentTarget as HTMLInputElement).value;

        setButton((prev) => {
            if (prev == key) {
                return;
            }
            return key;
        });
    };

    const onDelete = (items: unknown[]) => {
        if (selectedButton != null) {
            const exist = _.some(items, { id: parseInt(selectedButton) });

            if (exist) {
                // TODO: make it dynamic
                dispatch(deleteFaqType(parseInt(selectedButton)));
            }
            return;
        }
    };

    return {
        selectedButton,
        setSelectedButton,
        onDelete
    }
}
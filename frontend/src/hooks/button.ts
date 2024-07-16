import { useState } from "react";
import _ from "lodash";

export const useButton = () => {
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

    const onDelete = (items: unknown[], dispatchFunction: (selectedButton: string) => void) => {
        if (selectedButton != null) {
            const exist = _.some(items, { id: parseInt(selectedButton) });

            if (exist) {
                dispatchFunction(selectedButton);
            }
            return;
        }
    };

    return {
        selectedButton,
        setSelectedButton,
        setButton,
        onDelete
    }
}
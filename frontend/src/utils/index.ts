interface Item {
    id: number;
}

export const findIndexById = (items: Array<Item>, id: number) => {
    return items.findIndex((item) => item.id == id);
};
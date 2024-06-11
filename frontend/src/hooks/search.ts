import { useState } from "react";

type SearchFunc = {
    (arr: SearchItem[]): Promise<void>
}

type SearchItem = {
    key: string,
    value: string
}

export const useSearch = async (func: SearchFunc) => {
    const [search, setSearch] = useState([] as SearchItem[]);

    const setSearchItem = (item: SearchItem) => {
        setSearch((prev) => {
            return [...prev, item]
        });
    }

    const removeSearchItem = (key: string) => {
        const newSeachItem = search.filter(item => item.key !== key);
        setSearch(newSeachItem);
    }

    const searchResult = async () => {
        return await func(search);
    }

    return [
        search,
        setSearchItem,
        removeSearchItem,
        searchResult
    ]
} 
import { useEffect, useRef, useState } from "react";

type SearchFunc = {
    (arr: SearchItem): Promise<void>
}

export type SearchItem = {
    [key: string]: string;
}

export const useSearch = (func: SearchFunc) => {
    const [search, setSearch] = useState<SearchItem>({});
    const searchRef = useRef(search);

    useEffect(() => {
        searchRef.current = search
    }, [search])

    const showSearch = (key: string) => {
        if (search[key]) {
            return search[key];
        }

        return "0"
    }

    const setSearchItem = async (key: string, value: string) => {
        setSearch(prev => {
            return {
                ...prev,
                [key]: value
            };
        });

        if (parseInt(value) == 0) {
            removeSearchItem(key)
        }

        setTimeout(async () => {
            await searchResult();
        }, 100)
    };

    const searchResult = async () => {
        await func(searchRef.current);
    }

    const removeSearchItem = (key: string) => {
        setSearch(prev => {
            const newData = { ...prev };
            delete newData[key];
            return newData;
        });
    };

    return {
        showSearch,
        setSearchItem,
        searchResult
    };
} 
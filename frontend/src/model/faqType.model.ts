export interface FaqTypeItem {
    id: number,
    name: string,
    description?: string,
}

export interface FaqTypeForm {
    id?: number,
    name: string,
    description?: string,
}

export const DefaultFaqType: FaqTypeItem = {
    id: 0,
    name: "all",
    description: "this is default"
}
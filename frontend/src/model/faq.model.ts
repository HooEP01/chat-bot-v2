export interface FaqItem {
    id: number,
    top_id?: number,
    parent_id?: number,
    faq_type_id?: number,
    question: string,
    answer: string,
}


export interface FaqForm {
    id?: number,
    answer: string,
    question: string,
    top_id?: number,
    parent_id?: number,
}
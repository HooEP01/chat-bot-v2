export interface FaqItem {
    id: number,
    parent_id?: number,
    faq_type_id?: number,
    question: string,
    answer: string,
}

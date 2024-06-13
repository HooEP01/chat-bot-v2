import { RootState } from "../store";

export const getFaqItem = (id: number) => (state: RootState) => state.faq.items.find(item => item.id === id);
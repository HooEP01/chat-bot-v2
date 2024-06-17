import { RootState } from "../store";

export const getFaqTypeItem = (id: number) => (state: RootState) => state.faqType.items.find(item => item.id === id);
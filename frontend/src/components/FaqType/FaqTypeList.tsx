import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { FaqTypeItem } from "../../model/faqType.model";
import FaqTypeModal from "./FaqTypeModal";
import FaqTypeShow from "./FaqTypeShow";
import { SearchItem, useSearch } from "../../hooks/search";
import { fetchFaq } from "../../store/faq/faqSlice";

const FaqTypeList = () => {
  // select faqType items from store
  const faqTypeItems = useSelector(
    (state: RootState) => state.faqType.items
  ) as FaqTypeItem[];

  const dispatch: AppDispatch = useDispatch();

  // search faq
  const searchFaq = async (params: SearchItem) => {
    await dispatch(fetchFaq(params));
  };

  // search hook
  const { showSearch, setSearchItem } = useSearch(searchFaq);

  // handle search item
  const handleSearchItem = (key: string, value: number) => {
    setSearchItem(key, String(value));
  };

  return (
    <>
      <div className="flex flex-col gap-3 my-4 md:w-80">
        {faqTypeItems.map((item) => {
          return (
            <FaqTypeShow
              key={item.id}
              faqTypeId={item.id}
              showSearch={showSearch}
              handleSearchItem={handleSearchItem}
            />
          );
        })}

        {/* Faq type edit model */}
        <FaqTypeModal />
      </div>
    </>
  );
};

export default FaqTypeList;

import { useSelector } from "react-redux";
import { getFaqTypeItem } from "../../selectors/faqType";
import { IconTag } from "@tabler/icons-react";
import CustomIcon from "../CustomIcon";
import _ from "lodash";

interface SubFaqProps {
  faqTypeId: number;
  showSearch: (key: string) => string;
  handleSearchItem: (key: string, value: number) => void;
}

const FaqTypeShow = (props: SubFaqProps) => {
  const { faqTypeId, showSearch, handleSearchItem } = props;
  const faqTypeItem = useSelector(getFaqTypeItem(faqTypeId));

  return faqTypeItem ? (
    <button
      onClick={() => handleSearchItem("type", faqTypeItem.id)}
      className={`flex justify-start btn btn-outline w-full ${
        showSearch("type") == String(faqTypeItem.id) ? "btn-active" : ""
      }`}
    >
      <CustomIcon icon={IconTag} />
      <p className="text-start pl-4">{_.upperFirst(faqTypeItem.name) ?? "-"}</p>
    </button>
  ) : null;
};

export default FaqTypeShow;

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { FaqItem } from "../../model/faq.model";
import { deleteFaq } from "../../store/faq/faqSlice";
import { FormType } from "../../constant";
import {
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import CustomIcon from "../CustomIcon";
import FaqModal from "./FaqModal";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { ReactNode, useState } from "react";
import CustomDialog from "../CustomDialog";

const FaqList = () => {
  const items = useSelector(
    (state: RootState) => state.faq?.items
  ) as FaqItem[];

  const dispatch: AppDispatch = useDispatch();

  const [elementModal, setElementModal] = useState<ReactNode>();

  const handleModal = (type: FormType, item?: FaqItem) => {
    const key = uuidv4();

    if (type == FormType.Create) {
      setElementModal(<FaqModal key={key} type={FormType.Create} />);
    } else {
      setElementModal(
        <FaqModal key={key} type={FormType.Edit} faqId={item?.id} />
      );
    }
  };

  const removeFaq = (id: number) => {
    dispatch(deleteFaq(id));
  };

  const itemDialog = (id: number) => {
    setElementModal(<CustomDialog func={removeFaq} id={id} />);
  };

  return (
    <div className="card border w-full">
      <div className="card-body">
        {elementModal}

        {/* Add Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">FAQs List</h2>
          <button
            className={
              "btn btn-primary btn-circle"
            }
            onClick={() => handleModal(FormType.Create)}
          >
            <CustomIcon icon={IconPlus} stroke="2" size="20" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="table">
            <thead>
              <tr className="border-0">
                <th className="pl-0 w-32">Type</th>
                <th className="md:w-96">Question</th>
                <th className="">Answer</th>
                <th className="md:w-24">Sub Faqs</th>
                <th className="md:w-16">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index} className="border-0">
                    <td className="pl-0 text-left">
                      {_.upperFirst(item.faq_type?.name) ?? "-"}
                    </td>
                    <td className="text-left">
                      <p className="line-clamp-1">{item.question ?? "-"}</p>
                    </td>
                    <td className="text-left">
                      <p className="line-clamp-1">{item.answer ?? "-"}</p>
                    </td>
                    <td className="text-left">
                      <p className="line-clamp-1">{item.faqs?.length ?? "0"}</p>
                    </td>
                    <td className="pr-0 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className={"btn btn-outline btn-circle btn-neutral"}
                          onClick={() => handleModal(FormType.Edit, item)}
                        >
                          <CustomIcon icon={IconEdit} />
                        </button>

                        <button
                          onClick={() => itemDialog(item.id)}
                          className="btn btn-outline btn-circle btn-error"
                        >
                          <CustomIcon icon={IconTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FaqList;

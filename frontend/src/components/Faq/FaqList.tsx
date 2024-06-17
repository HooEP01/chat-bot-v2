import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { FaqItem } from "../../model/faq.model";
import { deleteFaq } from "../../store/faq/faqSlice";
import { FormType } from "../../constant";
import {
  IconDotsVertical,
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
    setElementModal(
      <CustomDialog func={removeFaq} id={id} />
    );
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
              "flex justify-start items-center btn btn-primary md:w-44"
            }
            onClick={() => handleModal(FormType.Create)}
          >
            <CustomIcon icon={IconPlus} stroke="2" size="20" />
            <span className="ml-2">Add FAQ</span>
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
                      <div className="flex justify-end">
                        <div
                          className={`flex items-center dropdown ${
                            (items.length % 10) - 3 < index
                              ? "dropdown-top dropdown-end"
                              : "dropdown-bottom dropdown-end"
                          }`}
                        >
                          <div tabIndex={item.id} className="btn btn-ghost">
                            <CustomIcon icon={IconDotsVertical} stroke={"2"} />
                          </div>
                          <ul
                            tabIndex={item.id}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <button
                                className={
                                  "flex justify-start btn btn-outline btn-neutral"
                                }
                                onClick={() => handleModal(FormType.Edit, item)}
                              >
                                <CustomIcon icon={IconEdit} />
                                <span className="ml-4">Edit</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => itemDialog(item.id)}
                                className="flex justify-start btn btn-outline btn-error"
                              >
                                <CustomIcon icon={IconTrash} />
                                <span className="ml-4">Delete</span>
                              </button>
                            </li>
                          </ul>
                        </div>
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

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deleteFaq, fetchFaq } from "../store/faq/faqSlice";
import { ReactElement, useEffect, useState } from "react";
import { FaqItem } from "../model/faq.model";
import FaqModel from "../components/FaqModel";
import { FormType } from "../constant";
import { fetchFaqType } from "../store/faqType/faqTypeSlice";
import {
  IconEdit,
  IconMenu,
  IconPlus,
  IconTag,
  IconTrash,
} from "@tabler/icons-react";
import CustomIcon from "../components/CustomIcon";
import { FaqTypeItem } from "../model/faqType.model";
import FaqTypeModel from "../components/FaqTypeModel";
import { v4 as uuidv4 } from "uuid";

const Faq = () => {
  const items = useSelector((state: RootState) => state.faq.items) as FaqItem[];
  const faqTypeItems = useSelector(
    (state: RootState) => state.faqType.items
  ) as FaqTypeItem[];
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFaq());
    dispatch(fetchFaqType());
  }, [dispatch]);

  const removeFaq = (id: number) => {
    dispatch(deleteFaq(id));
  };

  const [model, setModel] = useState<ReactElement>();

  const handleModel = (type: FormType, item?: FaqItem) => {
    const key = uuidv4();

    if (type == FormType.Create) {
      setModel(<FaqModel key={key} type={FormType.Create} />);
    } else {
      setModel(<FaqModel key={key} type={FormType.Edit} faqItem={item} />);
    }
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="basis-1/4 card bg-base-200 border">
          <div className="card-body">
            <h2 className="card-title">Type</h2>

            <div className="card-actions block">
              <div className="flex flex-col gap-3 my-4">
                {faqTypeItems.map((items, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-start items-center"
                    >
                      <button className="btn btn-outline w-full">
                        <CustomIcon icon={IconTag} />
                        <p className="text-start pl-4">{items.name ?? "-"}</p>
                      </button>
                    </div>
                  );
                })}

                {/* Faq type edit model */}
                <FaqTypeModel />
              </div>
            </div>
          </div>
        </div>

        <div className="basis-3/4 card border">
          <div className="card-body">
            {model}

            {/* Add Button */}
            <div className="flex justify-between items-center">
              <h2 className="card-title">FAQ</h2>
              <button
                className={"btn btn-primary"}
                onClick={() => handleModel(FormType.Create)}
              >
                <CustomIcon icon={IconPlus} stroke="2" />
              </button>
            </div>
            {/* Table */}
            {/* <div className="overflow-x-auto"> */}
            <div className="">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Answer</th>
                    <th>Question</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-left">{index + 1}</td>
                        <td className="text-left">{item.faq_type_id ?? "-"}</td>
                        <td className="text-left">{item.answer ?? "-"}</td>
                        <td className="text-left">{item.question ?? "-"}</td>
                        <td className="text-left w-16">
                          <div className="flex">
                            <div className="dropdown dropdown-bottom dropdown-end flex items-center btn btn-ghost">
                              <div tabIndex={index}>
                                <CustomIcon icon={IconMenu} stroke={"2"} />
                              </div>
                              <ul
                                tabIndex={index}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                              >
                                <li>
                                  <button
                                    className={
                                      "flex justify-start btn btn-outline btn-neutral"
                                    }
                                    onClick={() =>
                                      handleModel(FormType.Edit, item)
                                    }
                                  >
                                    <CustomIcon icon={IconEdit} />
                                    <span className="ml-4">Edit</span>
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => removeFaq(item.id)}
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
      </div>
    </>
  );
};

export default Faq;

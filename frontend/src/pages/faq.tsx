import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deleteFaq, fetchFaq } from "../store/faq/faqSlice";
import { useEffect } from "react";
import { FaqItem } from "../model/faq.model";
import FaqModel from "../components/FaqModel";
import { FormType } from "../constant";
import { fetchFaqType } from "../store/faqType/faqTypeSlice";
import { IconTag, IconTrash } from "@tabler/icons-react";
import CustomIcon from "../components/CustomIcon";
import { FaqTypeItem } from "../model/faqType.model";

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

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="basis-1/4 card bg-base-200 border">
          <div className="card-body">
            <h2 className="card-title">Type</h2>

            <div className="my-4">
              {faqTypeItems.map((items, index) => {
                return (
                  <div key={index} className="flex justify-start items-center">
                    <button className="btn btn-outline w-full">
                      <CustomIcon button={IconTag} />
                      <p className="text-start pl-4">{items.name ?? "-"}</p>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="card-actions">
              <button className="btn btn-primary w-full">Edit Type</button>
            </div>
          </div>
        </div>

        <div className="basis-3/4 card border">
          <div className="card-body">
            {/* Add Button */}
            <div className="flex justify-between items-center">
              <h2 className="card-title">FAQ</h2>
              <FaqModel type={FormType.Create} />
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
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
                        <td className="text-left">
                          <div className="flex gap-2">
                            {/* Edit Button */}
                            <FaqModel type={FormType.Edit} faqItem={item} />

                            {/* Delete Button */}
                            <button
                              onClick={() => removeFaq(item.id)}
                              className="btn btn-error"
                            >
                              <CustomIcon button={IconTrash} />
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
      </div>
    </>
  );
};

export default Faq;

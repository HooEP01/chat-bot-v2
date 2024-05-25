import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchFaq } from "../store/faq/faqSlice";
import { useEffect } from "react";
import { FaqItem } from "../model/faq.model";
import CustomIcon from "../components/CustomIcon";
import { IconEdit } from "@tabler/icons-react";
import FaqModel from "../components/FaqModel";
import { FormType } from "../constant";
import { fetchFaqType } from "../store/faqType/faqTypeSlice";

const Faq = () => {
  const items = useSelector((state: RootState) => state.faq.items) as FaqItem[];
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFaq());
    dispatch(fetchFaqType());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="basis-1/4 card bg-base-200 border">
          <div className="card-body">
            <h2 className="card-title">Type</h2>
            <p>Here will list Faq type</p>
            <div className="card-actions">
              <button className="btn btn-primary w-full">Edit Type</button>
            </div>
          </div>
        </div>

        <div className="basis-3/4 card bg-base-200 border">
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
                          {/* Edit Button */}
                          <button className="btn btn-primary">
                            <CustomIcon button={IconEdit} />
                          </button>
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

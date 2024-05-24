import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchFaq } from "../store/faq/faqSlice";
import { useEffect } from "react";
import { FaqItem } from "../model/faq.model";

const Faq = () => {
  const items = useSelector((state: RootState) => state.faq.items) as FaqItem[];
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFaq());
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
          {/* Table */}
          <div className="overflow-x-auto p-4">
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
                      <td className="text-left"></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;

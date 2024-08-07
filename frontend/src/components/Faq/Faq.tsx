import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFaq } from "../../store/faq/faqSlice";
import { fetchFaqType } from "../../store/faqType/faqTypeSlice";
import { AppDispatch } from "../../store";
import FaqTypeList from "../FaqType/FaqTypeList";
import FaqList from "./FaqList";

const Faq = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFaq({}));
    dispatch(fetchFaqType());
  }, [dispatch]);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>FAQs</li>
        </ul>
      </div>

      {/* Title */}
      <p className="text-2xl font-semibold mb-4">Frequently Asked Questions</p>

      <div className="flex flex-col xl:flex-row gap-6">
        <FaqTypeList />

        <FaqList />
      </div>
    </>
  );
};

export default Faq;

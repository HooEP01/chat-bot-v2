import { SubmitHandler, useForm } from "react-hook-form";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { FaqItem } from "../../model/faq.model";
import { AppDispatch } from "../../store";
import { createFaq, deleteFaq, updateFaq } from "../../store/faq/faqSlice";

interface SubFaqProps {
  faqItem?: FaqItem;
  parent?: FaqItem;
}

type SubFaqFornValues = {
  id?: number;
  parent_id: number;
  faq_type_id: number;
  answer: string;
  question: string;
};

const SubFaq = (props: SubFaqProps) => {
  const { parent, faqItem } = props;
  const dispatch: AppDispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm<SubFaqFornValues>({
    defaultValues: {
      parent_id: _.get(parent, ["id"], 0),
      faq_type_id: _.get(parent, ["faq_type_id"], 0),
      answer: _.get(faqItem, ["answer"], ""),
      question: _.get(faqItem, ["question"], ""),
    },
  });

  const onSubmit: SubmitHandler<SubFaqFornValues> = (data) => {
    console.log(data);
    const faqId = _.get(faqItem, ["id"], 0);
    if (faqId == 0) {
      dispatch(createFaq(data));
    } else {
      dispatch(updateFaq(data));
    }

    reset();
  };

  const onDelete = (faqId: number | undefined) => {
    if (faqId == undefined) return;
    dispatch(deleteFaq(faqId));
  };

  return (
    <div className="card bg-base-200 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="dialog"
        className="space-y-4"
      >
        {/* question field */}
        <div className="flex flex-col gap-2">
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("question", { required: true })}
            placeholder="Question"
            rows={1}
          ></textarea>
        </div>

        {/* <!-- answer field --> */}
        <div className="flex flex-col gap-2">
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("answer", { required: true })}
            placeholder="Answer"
            rows={2}
          ></textarea>
        </div>

        <div className="flex justify-between gap-2">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          <button
            onClick={() => onDelete(faqItem?.id)}
            type="button"
            className="btn btn-outline btn-error"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubFaq;

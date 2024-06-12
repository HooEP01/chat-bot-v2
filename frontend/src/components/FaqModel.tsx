import { FormType } from "../constant";
import { FaqItem } from "../model/faq.model";
import _ from "lodash";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { FaqTypeItem } from "../model/faqType.model";
import { createFaq, updateFaq } from "../store/faq/faqSlice";
import { useState } from "react";

interface FaqModelProps {
  type: FormType;
  faqItem?: FaqItem;
}

type FaqFormValues = {
  id?: number;
  top_id: number;
  parent_id?: number | null;
  faq_type_id: number;
  answer: string;
  question: string;
};

const FaqModel = (props: FaqModelProps) => {
  const { type, faqItem } = props;

  const dispatch: AppDispatch = useDispatch();

  const faqTypeItems = useSelector(
    (state: RootState) => state.faqType.items
  ) as FaqTypeItem[];

  const faqTypeId = _.get(faqItem, ["faq_type_id"], 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqFormValues>({
    defaultValues: {
      top_id: _.get(faqItem, ["top_id"], 0),
      parent_id: _.get(faqItem, ["parent_id"], null),
      faq_type_id: faqTypeId,
      answer: _.get(faqItem, ["answer"], ""),
      question: _.get(faqItem, ["question"], ""),
    },
  });

  const onSubmit: SubmitHandler<FaqFormValues> = (data) => {
    console.log(data);

    if (type == FormType.Create) {
      dispatch(createFaq(data));
    } else {
      data.id = _.get(faqItem, ["id"], 0);
      dispatch(updateFaq(data));
    }

    // reset form to default
    reset();
    toggleModel();
  };

  const [showModel, setShowModel] = useState(true)

  const toggleModel = () => {
    setShowModel((prev) => {
      return !prev;
    });
  };

  return (
    <>
      {/* <button
        className={`btn ${
          type == FormType.Create ? "btn-primary" : "btn-accent"
        }`}
        onClick={toggleModal}
      >
        {type == FormType.Create ? (
          <>
            <CustomIcon icon={IconPlus} stroke="2" />
          </>
        ) : (
          <>
            <CustomIcon icon={IconEdit} />
          </>
        )}
      </button> */}

      <dialog className={`modal ${showModel ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{_.upperFirst(type)} FAQ</h3>
          <div className="modal-action justify-start block">
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="dialog"
              className="space-y-4"
            >
              {/* type field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Faq Type
                </label>
                <select
                  {...register("faq_type_id", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                  // disabled={type === FormType.Edit}
                  className="select select-bordered w-full"
                  defaultValue={faqTypeId}
                  required
                >
                  <option key={"select one"} value={0} disabled={true}>
                    Select One
                  </option>
                  {faqTypeItems.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {errors.faq_type_id && (
                  <p className="text-error">Please select one type</p>
                )}
              </div>

              {/* question field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="question" className="text-sm font-medium">
                  Question
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  {...register("question", { required: true })}
                  placeholder="Question"
                  rows={1}
                ></textarea>
                {/* <label className="input input-bordered flex items-center gap-2">
                  <input
                    {...register("question", { required: true })}
                    type="text"
                    className="grow"
                  />
                </label> */}
              </div>

              {/* <!-- answer field --> */}
              <div className="flex flex-col gap-2">
                <label htmlFor="answer" className="text-sm font-medium">
                  Answer
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  {...register("answer", { required: true })}
                  placeholder="Answer"
                  rows={4}
                ></textarea>
              </div>

              <div className="flex justify-between">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="button" className="btn" onClick={toggleModel}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default FaqModel;

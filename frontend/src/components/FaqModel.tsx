import { FormType } from "../constant";
import _ from "lodash";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { FaqTypeItem } from "../model/faqType.model";
import { createFaq, updateFaq } from "../store/faq/faqSlice";
import { useState } from "react";
import CustomIcon from "./CustomIcon";
import { IconSubtask, IconX } from "@tabler/icons-react";
import SubFaq from "./SubFaq";
import { v4 as uuidv4 } from "uuid";
import { getFaqItem } from "../selectors/faq";

interface FaqModelProps {
  type: FormType;
  faqId?: number;
}

type FaqFormValues = {
  id?: number;
  parent_id?: number | null;
  faq_type_id: number;
  answer: string;
  question: string;
};

const FaqModel = (props: FaqModelProps) => {
  const { type, faqId = 0 } = props;

  const dispatch: AppDispatch = useDispatch();
  const faqItem = useSelector(getFaqItem(faqId));

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

  const [showModel, setShowModel] = useState(true);

  const toggleModel = () => {
    setShowModel((prev) => {
      return !prev;
    });
  };

  const subFaq = _.get(faqItem, ["faqs"], []);
  const [showSubTask, setSubTask] = useState(!!(subFaq?.length > 0));
  const toggleSubTask = () => {
    setSubTask((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <dialog className={`modal ${showModel ? "modal-open" : ""}`}>
        <div className="modal-box w-11/12 max-w-5xl p-0">

          <div className="flex justify-between items-center p-6">
            <h3 className="font-bold text-lg">{_.upperFirst(type)} FAQ</h3>
            <button className="btn btn-ghost btn-md" onClick={toggleModel}>
              <CustomIcon icon={IconX} size={20}/>
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-6 pt-0">
            <div className="modal-action justify-start block mt-0">
              <div className="mb-4">
                <button
                  className="btn btn-outline btn-accent"
                  onClick={toggleSubTask}
                >
                  <CustomIcon icon={IconSubtask} />
                  Sub Faq
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                method="dialog"
                className="space-y-4 ml-0"
                style={{ marginLeft: 0 }}
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

              <div hidden={!showSubTask}>
                <div className="divider divider-start"></div>
                <p className="font-semibold text-base mb-2">Sub FAQ</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {subFaq?.length > 0 ? (
                    <>
                      {faqItem?.faqs?.map((item, index) => {
                        return (
                          <SubFaq key={index} parent={faqItem} faqItem={item} />
                        );
                      })}
                      <SubFaq key={uuidv4()} parent={faqItem} />
                    </>
                  ) : (
                    <SubFaq key={uuidv4()} parent={faqItem} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default FaqModel;

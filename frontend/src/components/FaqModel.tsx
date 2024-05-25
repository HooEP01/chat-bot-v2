import { IconEdit, IconPlus } from "@tabler/icons-react";
import CustomIcon from "./CustomIcon";
import { FormType } from "../constant";
import { FaqItem } from "../model/faq.model";
import _ from "lodash";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FaqModelProps {
  type: FormType;
  faqItem?: FaqItem;
}

type FaqFormValues = {
  type: number;
  answer: string;
  question: string;
};

const FaqModel = (props: FaqModelProps) => {
  const { type } = props;

  const { register, handleSubmit } = useForm<FaqFormValues>();

  const onSubmit: SubmitHandler<FaqFormValues> = (data) => {
    console.log(data);
  };

  const [showModal, setShowModel] = useState(false);
  const toggleModal = () => {
    setShowModel((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <button className="btn btn-info" onClick={toggleModal}>
        {type == FormType.Create ? (
          <CustomIcon button={IconPlus} v-if="props.type === FormType.Create" />
        ) : (
          <CustomIcon button={IconEdit} v-if="props.type === FormType.Edit" />
        )}
      </button>

      <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
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
                  {...register("type")}
                  disabled={type === FormType.Edit}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="1">Blue</option>
                  <option value="2">Red</option>
                  {/* <option v-for="option in Object.keys(CameraType)" :key="option" :value="option">
                                {{ option }}
                            </option> */}
                </select>
              </div>

              {/* question field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="question" className="text-sm font-medium">
                  Question
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    {...register("question")}
                    type="text"
                    className="grow"
                    required
                  />
                </label>
              </div>

              {/* <!-- answer field --> */}
              <div className="flex flex-col gap-2">
                <label htmlFor="answer" className="text-sm font-medium">
                  Answer
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    {...register("answer")}
                    type="text"
                    className="grow"
                    required
                  />
                </label>
              </div>

              <div className="flex justify-between">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="button" className="btn" onClick={toggleModal}>
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

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { FaqTypeItem } from "../model/faqType.model";
import { SubmitHandler, useForm } from "react-hook-form";
import { createFaqType } from "../store/faqType/faqTypeSlice";
import { useState } from "react";

type FaqTypeFormValues = {
  id?: number;
  name: string;
  description?: string;
};

const FaqTypeModel = () => {
  const dispatch: AppDispatch = useDispatch();

  const faqTypeItems = useSelector(
    (state: RootState) => state.faqType.items
  ) as FaqTypeItem[];

  const { register, handleSubmit, reset } = useForm<FaqTypeFormValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FaqTypeFormValues> = (data) => {
    console.log(data);

    dispatch(createFaqType(data));

    // reset form to default
    reset();
  };

  const [showModal, setShowModel] = useState(false);
  const toggleModal = () => {
    setShowModel((prev) => {
      return !prev;
    });
  };

  return (
    <>
      {/* Button */}
      <button onClick={toggleModal}></button>

      <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">FAQ Type</h3>

          {/* Item list */}
          {faqTypeItems.map(() => {
            return <></>;
          })}

          <div className="modal-action justify-start block">
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="dialog"
              className="space-y-4"
            >
              {/* name field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="grow"
                  />
                </label>
              </div>

              {/* description field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="answer" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  {...register("description", { required: true })}
                  placeholder="Description"
                  rows={1}
                ></textarea>
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

export default FaqTypeModel;

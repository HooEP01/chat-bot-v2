import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { FaqTypeItem } from "../model/faqType.model";
import { SubmitHandler, useForm } from "react-hook-form";
import { createFaqType } from "../store/faqType/faqTypeSlice";
import { useState } from "react";
import CustomIcon from "./CustomIcon";
import { IconEdit, IconTag, IconTrash } from "@tabler/icons-react";
import _ from "lodash";

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
      id: 0,
      name: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FaqTypeFormValues> = (data) => {
    dispatch(createFaqType(data));

    // reset form to default
    reset();
  };

  // TODO: if edit link to onSubmit
  const onDelete = () => {
    if (selectedButton != null) {
      const exist = _.some(faqTypeItems, { id: parseInt(selectedButton) });

      if (exist) {
        // dispatch(deleteFaq(parseInt(selectedButton)));
      }
      return;
    }
  };

  const [showModal, setShowModel] = useState(false);
  const toggleModal = () => {
    setShowModel((prev) => {
      return !prev;
    });
  };

  const [selectedButton, setButton] = useState<string | undefined>();
  const setSelectedButton = (e: React.MouseEvent<HTMLElement>) => {
    const key = (e.currentTarget as HTMLInputElement).value;

    setButton((prev) => {
      if (prev == key) {
        return;
      }
      return key;
    });
  };

  return (
    <>
      {/* Button */}
      <button
        className="btn btn-primary w-full justify-start"
        onClick={toggleModal}
      >
        <CustomIcon button={IconEdit} />
        <p className="text-start pl-4">Edit Faq Type</p>
      </button>

      <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">FAQ Type</h3>

          <div className="modal-action justify-start block">
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="dialog"
              className="space-y-4"
            >
              {/* name field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Create New
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
              {/* <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  {...register("description", { required: true })}
                  placeholder="Description"
                  rows={1}
                ></textarea>
              </div> */}

              <div className="flex flex-col gap-3 mt-4">
                {/* Item list */}
                {faqTypeItems.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-start items-center"
                    >
                      <button
                        key={item.id}
                        onClick={(e: React.MouseEvent<HTMLElement>) =>
                          setSelectedButton(e)
                        }
                        value={item.id}
                        className={`btn btn-outline w-full ${
                          selectedButton == String(item.id) ? "btn-active" : ""
                        }`}
                      >
                        <CustomIcon button={IconTag} />
                        <p className="text-start pl-4">{item.name ?? "-"}</p>
                        <CustomIcon button={IconTrash} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between">
                {selectedButton != null ? (
                  <button onClick={onDelete} className="btn btn-error">
                    Delete
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                )}

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

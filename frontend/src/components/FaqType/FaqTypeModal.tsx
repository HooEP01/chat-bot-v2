import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomIcon from "../CustomIcon";
import { IconEdit, IconTag, IconTrash } from "@tabler/icons-react";
import { AppDispatch, RootState } from "../../store";
import { FaqTypeItem } from "../../model/faqType.model";
import { createFaqType, deleteFaqType } from "../../store/faqType/faqTypeSlice";
import { useModal } from "../../hooks/modal";
import { useButton } from "../../hooks/button";

type FaqTypeFormValues = {
  id?: number;
  name: string;
  description?: string;
};

const FaqTypeModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const faqTypeItems = useSelector(
    (state: RootState) => state.faqType.items
  ) as FaqTypeItem[];

  const { showModal, toggleModal } = useModal();
  const { selectedButton, setSelectedButton, setButton, onDelete } =
    useButton();

  const { register, handleSubmit, reset } = useForm<FaqTypeFormValues>({
    defaultValues: {
      id: 0,
      name: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FaqTypeFormValues> = (data) => {
    dispatch(createFaqType(data));
    reset();
  };

  const onDeleteFayType = (selectedButton: string) => {
    dispatch(deleteFaqType(parseInt(selectedButton))).then((response) => {
      if (deleteFaqType.fulfilled.match(response)) {
        // console.log(response);
        setButton(undefined);
      }
    });
  };

  return (
    <>
      {/* Button */}
      <button
        className="btn btn-primary btn-outline w-full justify-start"
        onClick={toggleModal}
      >
        <CustomIcon icon={IconEdit} />
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
                    autoFocus={false}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                {/* Item list */}
                {faqTypeItems.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-start items-center"
                    >
                      <button
                        type="button"
                        key={item.id}
                        onClick={(e: React.MouseEvent<HTMLElement>) =>
                          setSelectedButton(e)
                        }
                        value={item.id}
                        className={`flex justify-between btn btn-outline w-full ${
                          selectedButton == String(item.id) ? "btn-active" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <CustomIcon icon={IconTag} />
                          <p className="text-start pl-4">{item.name ?? "-"}</p>
                        </div>

                        <CustomIcon icon={IconTrash} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between">
                {selectedButton != null ? (
                  <button
                    onClick={() => onDelete(faqTypeItems, onDeleteFayType)}
                    type="button"
                    className="btn btn-error"
                  >
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

export default FaqTypeModal;

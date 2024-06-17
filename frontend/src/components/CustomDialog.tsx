import { useModal } from "../hooks/modal";

interface CustomDialogProps {
  func: (id: number) => void;
  id: number;
}

const CustomDialog = (props: CustomDialogProps) => {
  const { func, id } = props;
  const { showModal, toggleModal } = useModal(true);
  const handleFunc = () => {
    func(id);
    toggleModal();
  };

  return (
    <>
      <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          {/* TODO: make it dynamic */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl">
              Are you sure to delete this FAQ?
            </h3>
            {/* <button className="btn btn-ghost btn-md" onClick={toggleModal}>
              <CustomIcon icon={IconX} size={20} />
            </button> */}
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              onClick={handleFunc}
              className="btn btn-error"
            >
              Yes
            </button>
            <button type="button" onClick={toggleModal} className="btn">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CustomDialog;

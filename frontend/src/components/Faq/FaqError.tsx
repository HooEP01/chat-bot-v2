import { IconX } from "@tabler/icons-react";
import CustomIcon from "../CustomIcon";
import FaqSkeleton from "./FaqSkeleton";

const FaqError = () => {
    return (
        <FaqSkeleton>
            <div className="flex flex-col justify-center items-center w-full bg-rose-300 text-base-300 rounded-2xl p-4 mb-4 md:mb-6">
                <button className="btn btn-circle btn-error">
                    <CustomIcon icon={IconX} />
                </button>
                <p className="font-medium text-lg">Error Happaned</p>
                <p>Please check your connection and refresh you screen.</p>
            </div>
        </FaqSkeleton>
    );
};

export default FaqError;
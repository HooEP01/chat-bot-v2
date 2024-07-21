import { useDispatch } from "react-redux";
import { AppDispatch, store } from "../store";
import { useEffect, useRef } from "react";
import { logout } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useHttpError = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const sync = useRef(false);

    // TODO: Add throttling to prevent multiple logout dispatches
    useEffect(() => {
        if (store == null || sync.current == true) {
            return;
        }

        sync.current = true;
        window.addEventListener("unauthorized", function () {
            dispatch(logout()).then(() => {
                sync.current = false;
                navigate("/");
            });
        })

        return () => {
            window.removeEventListener("unauthorized", function () {});
        }
    }, [dispatch, navigate]);

    return true;
}
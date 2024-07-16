import { SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authSlice";
import { LoginForm } from "../../model/user.model";
import { useNavigate } from "react-router-dom";
import { getIsAuth, getStatus, getToken } from "../../selectors/auth";
import { StateStatus } from "../../model/state.model";
import { useEffect } from "react";

const Auth = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(getToken());
  const status = useSelector(getStatus());
  const isAuth = useSelector(getIsAuth());

  const { register, handleSubmit, reset } = useForm<LoginForm>({
    defaultValues: {
      email: "demo01@gmail.com",
      password: "11223344",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    dispatch(login(data));
    reset();
  };

  useEffect(() => {
    if (token && isAuth && status === StateStatus.Succeeded) {
      navigate("/faq");
    }
  }, [token, status, isAuth, navigate]);

  return (
    <div className="max-w-[24rem] mx-auto">
      <div className="card px-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <p className="card-title block text-2xl text-center">Welcome back.</p>
          <p className="text-center mb-4">
            New to us? {""}
            <a className="underline font-semibold" href="/">
              Sign Up
            </a>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              {/* email field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Your email
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    {...register("email", { required: true })}
                    type="text"
                    className="grow"
                  />
                </label>
              </div>

              {/* password field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Your password
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    className="grow"
                  />
                </label>
              </div>

              <div className="card-actions w-full mt-2">
                <button type="submit" className="btn btn-primary btn-block">
                  LOGIN
                </button>
              </div>
            </div>
          </form>

          <p className="mb-4">
            <a className="underline font-semibold" href="/">
              Trouble logging in?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

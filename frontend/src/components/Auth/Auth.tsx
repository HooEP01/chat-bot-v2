import { SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authSlice";
import { LoginForm } from "../../model/user.model";
import { useNavigate } from 'react-router-dom';
import { getStatus, getToken } from "../../selectors/auth";
import { StateStatus } from "../../model/state.model";
import { useEffect } from "react";

const Auth = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(getToken());
  const status = useSelector(getStatus());

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
    if (token && status === StateStatus.Succeeded) {
      navigate("/faq");
    }
  }, [token, status, navigate])

  return (
    <div className="card m-6 md:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Welcome to Chat Bot v2</h2>
        <p className="text-start mb-3">
          One of the best, best of the best chat bot in the world.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            {/* email field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
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
                Password
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
      </div>
    </div>
  );
};

export default Auth;

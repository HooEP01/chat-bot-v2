import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type AuthFormValues = {
  username: string;
  password: string;
};

const Auth = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<AuthFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthFormValues> = (data) => {
    console.log(data);
    navigate("/faq");

    reset();
  };

  return (
    <>
      <div className="card m-6 md:w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Welcome to CHATBOT</h2>
          <p className="text-start">
            Enter your username and pass below to login to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              {/* username field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    {...register("username", { required: true })}
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
            </div>

            <div className="card-actions w-full mt-2">
              <button type="submit" className="btn btn-primary btn-block">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;

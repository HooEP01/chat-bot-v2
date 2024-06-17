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
      username: "admin",
      password: "123456",
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
          <h2 className="card-title">Welcome to Chat Bot v2</h2>
          <p className="text-start mb-3">
           One of the best, best of the best chat bot in the world.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
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

              <div className="card-actions w-full mt-2">
                <button type="submit" className="btn btn-primary btn-block">
                  LOGIN
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;

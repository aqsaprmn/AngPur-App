import { MainCustomButton } from "@app/components/Buttons";
import { roleExtractor } from "@app/utils/Processor";
import { useAuthStore } from "@app/zustand/Auth/auth";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { initialRoute } = useAuthStore((state) => state);

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 10000);
  // }, []);
  return (
    <div className="h-screen w-screen flex justify-center text-center flex-col items-center">
      <span
        onClick={() =>
          console.log(
            roleExtractor({
              env: import.meta.env.VITE_ALLOWED_ROLE_OCC_DUTY_PAGES,
            })
          )
        }
      >
        Page you're looking for doesn't exist
      </span>
      <span>You will automatically redirect in 10 second</span>
      <MainCustomButton
        onClick={() => {
          navigate(initialRoute);
        }}
      >
        Back
      </MainCustomButton>
    </div>
  );
};

export default PageNotFound;

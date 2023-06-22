import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchProfileAPI } from ".";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";

const StudentTokenCheck = () => {
  const router = useRouter();
  const { throwError } = useCustomError();
  const fallbackAction = () => {
    throwError("Session expired. Please log in!");
    router.push("/login");
  };
  useEffect(() => {
    const checkToken = async () => {
      console.log("checking for token...");
      try {
        const response = await fetchProfileAPI();
        if (response.status === 200) console.log("ok");
        else fallbackAction();
      } catch (error) {
        console.log(error);
        fallbackAction();
      }
    };

    checkToken();
  }, []);

  return null;
};

export default StudentTokenCheck;

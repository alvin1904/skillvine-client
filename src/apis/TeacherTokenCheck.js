import { useEffect } from "react";
import { useRouter } from "next/router";
import { getTeacherAPI } from "./teacher";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";

const TeacherTokenCheck = () => {
  const router = useRouter();
  const {throwError} = useCustomError();
  useEffect(() => {
    const fallbackAction = () => {
      throwError("Session expired. Please log in!");
      router.push("/login");
    };
    const checkToken = async () => {
      console.log("checking for token...");
      try {
        const response = await getTeacherAPI();
        if (response.status === 200) console.log("ok");
        else if (response.status === 401 || response.status === 403)
          fallbackAction();
        else console.log("Token present, some other error");
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    };

    checkToken();
  }, []);

  return null;
};

export default TeacherTokenCheck;

import { useEffect } from "react";
import { useRouter } from "next/router";
import { getTeacherAPI } from "./teacher";

const TeacherTokenCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      console.log("checking for token...")
      try {
        const response = await getTeacherAPI();
        if (response.status === 200) console.log("ok");
        else router.push("/login");
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

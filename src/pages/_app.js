import "@/styles/globals.css";
import "@/components/ErrorHandler/ErrorHandler.css";
import { CustomError } from "@/components/ErrorHandler/ErrorContext";

export default function App({ Component, pageProps }) {
  return (
    <CustomError>
      <Component {...pageProps} />;
    </CustomError>
  );
}

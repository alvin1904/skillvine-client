import TeacherTokenCheck from "@/apis/TeacherTokenCheck";
import ReportComponent from "@/componentsAdmin/ReportGenerator/ReportComponent";
import useReport from "@/utils/useReport";
import Head from "next/head";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();
  const { slug } = router.query;
  const { backLinkStudentWise, status, targets, getData, generate } =
    useReport();

  const handleBack = () => router.push(backLinkStudentWise + slug);
  const handlePrepare = async () => await getData(targets.STUDENT, slug);
  const handleDownload = () => generate(targets.STUDENT);
  return (
    <>
      <Head>
        <title>StudentWise Report Generation</title>
      </Head>
      <TeacherTokenCheck />
      <ReportComponent
        target={targets.STUDENT}
        status={status}
        handleBack={handleBack}
        handlePrepare={handlePrepare}
        handleDownload={handleDownload}
      />
    </>
  );
}

export default index;

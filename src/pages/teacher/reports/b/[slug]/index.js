import ReportComponent from "@/componentsAdmin/ReportGenerator/ReportComponent";
import useReport from "@/utils/useReport";
import Head from "next/head";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();
  const { slug } = router.query;
  const { backLinkBatchWise, status, targets, getData, generate } = useReport();

  const handleBack = () => router.push(backLinkBatchWise);
  const handlePrepare = async () => await getData(targets.BATCH, slug);
  const handleDownload = () => generate(targets.BATCH);
  return (
    <>
      <Head>
        <title>BatchWise Report Generation</title>
      </Head>
      <ReportComponent
        target={targets.BATCH}
        status={status}
        handleBack={handleBack}
        handlePrepare={handlePrepare}
        handleDownload={handleDownload}
      />
    </>
  );
}

export default index;

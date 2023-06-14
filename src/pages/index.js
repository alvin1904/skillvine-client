"use client";

import ContentImage from "@/components/LandingPage/ContentImage";
import ContentText from "@/components/LandingPage/ContentText";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  let isMobile = false;
  if (typeof window !== "undefined") {
    const viewport = window.innerWidth;
    isMobile = viewport <= 768;
  }
  const bg = isMobile ? "/assets/homeMobile.svg" : "/assets/homeDesktop.svg";

  const router = useRouter();
  return (
    <>
      <Head>
        <title>SkillVine</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="main" style={{ backgroundImage: `url(${bg})` }}>
        <div className="homepage">
          <div className="homepage__header">
            <Image
              src={"/assets/skillvine-logo-white.png"}
              height={150}
              width={150}
              alt="Logo"
            />
            <h1>SkillVine</h1>
            <p>
              An Activity Points Management System that lets students upload,
              store, track all certificates and activity points required for
              B.Tech certification.
            </p>
            <button
              onClick={() => {
                router.push("/login");
              }}
            >
              Log In to SkillVine!
            </button>
          </div>
          <div className="homepage__content">
            <div className="hp_content">
              <ContentImage href="/assets/sample_image.jpg" />
              <ContentText>
                lorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb
                dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb
                jdbv dvb dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d
                bfv dvb jdbv dvb dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh
                dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem ipsum fdg sfbvdf
                dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem ipsum fdg
                sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem
              </ContentText>
            </div>
            <div className="hp_content">
              <ContentImage href="/assets/sample_image.jpg" />
              <ContentText>
                lorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb
                dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb
                jdbv dvb dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d
                bfv dvb jdbv dvb dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh
                dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem ipsum fdg sfbvdf
                dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem ipsum fdg
                sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem
              </ContentText>
            </div>
            <div className="hp_content">
              <ContentImage href="/assets/sample_image.jpg" />
              <ContentText>
                lorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb
                dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb
                jdbv dvb dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d
                bfv dvb jdbv dvb dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh
                dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem ipsum fdg sfbvdf
                dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem ipsum fdg
                sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem
              </ContentText>
            </div>
            <div className="hp_content">
              <ContentImage href="/assets/sample_image.jpg" />
              <ContentText>
                lorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb
                dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb
                jdbv dvb dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh dvfhebfhg d
                bfv dvb jdbv dvb dvb dbvlorem ipsum fdg sfbvdf dbvvbvxcbvh
                dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem ipsum fdg sfbvdf
                dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem ipsum fdg
                sfbvdf dbvvbvxcbvh dvfhebfhg d bfv dvb jdbv dvb dvb dbvlorem
              </ContentText>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

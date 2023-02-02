import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "../styles/Home.module.css";

import { api } from "../utils/api";
import { cn } from "../utils/cssutil";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>NU-IAM-Vendor-Example</title>
        <meta
          name="description"
          content="This isi example 3rd party application (vendor) thats use NU.IAM as the authorization platform (single-sign-on)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1
            className={cn(
              "text-xl",
              "font-extrabold",
              "tracking-tight",
              "text-white",
              "sm:text-[3rem]"
            )}
          >
            <span className={cn("text-[hsl(280,100%,70%)]")}>NU.ID Auth Client Demo</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-8">
            {/* <NUIAMQRCodeAuth /> */}

            <AuthShowcase />
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default Home;

const NUIAMQRCodeAuth: React.FC = () => {
  // return (<p className="py-5">{_L("home.scanqr")}</p>
  //       {qrAuthCode.data ? (
  //         <QRCode data={qrAuthCode.data} />
  //       ) : (
  //         <p>Loading QR Code...</p>
  //       )})

  return <></>;
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="flex flex-col place-items-center items-center justify-center pt-10">
        <div className="py-10 text-center">
          Copyright &copy; 2023 NU-IAM-Vendor-Example. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

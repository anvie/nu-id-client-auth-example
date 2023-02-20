import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "../styles/Home.module.css";

import { api } from "../utils/api";
import { cn } from "../utils/cssutil";

const Home: NextPage = () => {
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
              "text-gray-500",
              "sm:text-[3rem]"
            )}
          >
            <span className={cn("text-[hsl(280,100%,70%)]")}>
              NU.ID Auth Client Demo
            </span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-8">
            {/* <NUIAMQRCodeAuth /> */}

            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

// const NUIAMQRCodeAuth: React.FC = () => {
//   return (<p className="py-5">{_L("home.scanqr")}</p>
//         {qrAuthCode.data ? (
//           <QRCode data={qrAuthCode.data} />
//         ) : (
//           <p>Loading QR Code...</p>
//         )})
//   return <></>;
// };

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="py-10">
        {sessionData && (
          <h1 className="text-4xl">Welcome {sessionData.user?.name}</h1>
        )}
      </div>
      <p className="text-center text-2xl text-gray-500">
        {sessionData && (
          <div className="flex flex-col items-center gap-4 pb-5">
            {sessionData.user?.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sessionData.user?.image}
                alt=""
                width={100}
                height={100}
              />
            )}
            <div>
              your name:{" "}
              <span className="font-semibold">{sessionData.user?.name}</span>
            </div>
            <div>id: {sessionData.user?.id}</div>
            <div>email: {sessionData.user?.email}</div>
            {/* <code>{JSON.stringify(sessionData)}</code> */}
          </div>
        )}
      </p>
      <button
        className={cn(
          "rounded-full px-10 py-3 font-semibold no-underline transition",
          sessionData ? "bg-red-500 text-white" : "bg-green-600 text-white"
        )}
        onClick={sessionData ? () => void signOut() : () => void signIn("nu.id")}
      >
        {sessionData ? "SIGN OUT" : "SIGN IN"}
      </button>
    </div>
  );
};

/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import Container from "./common/Container";
import { GlobalContext } from "../state/contexts/GlobalContext";
import Head from "next/head";
import Button from "./common/Button";
import Header from "./common/Header";
import { useRouter } from "next/router";

function App() {
  const {
    state: {},
    dispatch,
  } = useContext(GlobalContext);

  const [active, setActive] = useState("storage provider");
  const [options, setOptions] = useState([
    {
      name: "business",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-20 h-20">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
          />
        </svg>
      ),
      desc: "Get the decentralized, cheapest, safest, privacy-preserving KYC screening",
    },
    {
      name: "individual",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-20 h-20">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
          />
        </svg>
      ),
      desc: "View KYC Portal to join an event and Generate a ZK KYC for your identity",
    },
  ]);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (active === "individual") {
      router.push("/individual/all-events");
    } else if (active === "business") {
      router.push("/business/create-event");
    }
  };

  return (
    <Container>
      <Head>
        <title>Select Role</title>
      </Head>
      <Header />
      <div className="flex flex-col items-stretch w-full h-full">
        {/* <h1 className="text-2xl font-semibold text-center text-brand-500">
          Get started from here
        </h1> */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid items-stretch w-full h-full grid-cols-1 md:grid-cols-2">
          {options.map((d) => {
            return (
              <Card
                key={d.name}
                data={d}
                active={active === d.name}
                setActive={() => setActive(d.name)}
              />
            );
          })}
          {/* <Button
            type="submit"
            fullWidth={true}
            className="flex flex-row items-center justify-center col-span-1 gap-2 md:col-span-2 group">
            <p>NEXT</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 transition-all group-hover:translate-x-1">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </Button> */}
        </form>
      </div>
    </Container>
  );
}

function Card({ data, active, setActive }: any) {
  return (
    <div
      onClick={setActive}
      className={`flex flex-col gap-6 p-6  transition-all duration-500 text-white items-center justify-center cursor-pointer h-full select-none
      ${
        data.name === "individual"
          ? "bg-brand-100 hover:bg-brand-200"
          : "bg-accent-50 hover:bg-accent-100"
      }`}>
      <div
        className={`flex items-center justify-center w-40 h-40 rounded-full
        shadow-xl
        ${
          data.name === "individual"
            ? "bg-gradient-to-tr from-brand-800  to-brand-400"
            : "bg-gradient-to-tr from-accent-800  to-accent-400"
        }
        `}>
        {data.icon}
      </div>
      <div className="flex flex-col gap-2">
        <p
          className={`text-center font-semibold 
          ${data.name === "individual" ? "text-brand-800" : "text-accent-800"}
        `}>
          {data.name}
        </p>
        <p
          className={`text-sm lowercase text-center 
          ${data.name === "individual" ? "text-brand-700" : "text-accent-700"}
        `}>
          {data.desc}
        </p>
      </div>
      <Button
        type="submit"
        variant={data.name === "individual" ? "primary" : "secondary"}
        // fullWidth={true}
        className="flex flex-row items-center justify-center col-span-1 gap-2 md:col-span-2 group">
        <p>as {data.name}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 transition-all group-hover:translate-x-1">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </Button>
    </div>
  );
}
export default App;

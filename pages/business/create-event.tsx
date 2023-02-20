import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/common/Container";
import { GlobalContext } from "../../state/contexts/GlobalContext";
import Head from "next/head";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";
import { Dialog } from "@headlessui/react";
import Stepper, { Step } from "../../components/stepper/Stepper";
import Verify from "../../components/stepper/steps/Verify";
import EventInfo from "../../components/stepper/steps/EventInfo";
import Final from "../../components/stepper/steps/Final";

const CreateEvent = () => {
  const {
    state: {},
    dispatch,
  } = useContext(GlobalContext);
  let [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/user/token-and-members");
  };

  const steps: Step[] = [
    {
      heading: "Terms of Use",
      subHeading:
        "Do you already have a KYC process in place for an event? Please read these terms of use carefully before you create:",
      render: (handleNext: Function) => <Verify next={handleNext} />,
    },
    {
      heading: "Event Information",
      subHeading: "",
      render: (handleNext: Function) => <EventInfo next={handleNext} />,
    },
    {
      heading: "Submitted Successfully!",
      subHeading: "Congratulations,your event has entered the PendingProcess.",
      render: (handleNext: Function) => <Final next={handleNext} />,
    },
  ];

  const [buttonText, setButtonText] = useState("Apply");
  const handleConfirm = () => {
    setButtonText("Approval Pending");
    setIsOpen(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (buttonText === "Approval Pending") {
      timer = setTimeout(() => {
        setButtonText("Approved");
      }, 30000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [buttonText]);

  return (
    <Container>
      <Head>
        <title>ZK KYC</title>
      </Head>
      <Header />
      <div className="flex flex-col items-start w-full h-full gap-10 p-8 overflow-y-auto bg-accent-50">
        {/* <h1 className="text-2xl text-brand-400"></h1> */}
        <Stepper steps={steps} />

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50">
          <div className="fixed inset-0 bg-black/30"></div>
          <div className="fixed inset-0 overflow-y-auto">
            {/* Container to center the panel */}
            <div className="flex items-center justify-center min-h-full p-4">
              <Dialog.Panel className="flex flex-col w-full max-w-lg gap-4 p-4 mx-auto bg-white rounded md:w-1/3 ">
                <Dialog.Title className="">Enter the id&apos;s</Dialog.Title>
                <form className="flex flex-col w-full gap-4">
                  <div className="flex flex-col w-full gap-4">
                    <input
                      className="w-full border-b border-grey-300 focus:outline-none"
                      placeholder="Deal ID"
                    />
                    <input
                      className="w-full border-b border-grey-300 focus:outline-none"
                      placeholder="PieceCID"
                    />
                  </div>
                  <div className="flex justify-end gap-4 pt-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-semibold text-blue-500 uppercase hover:text-blue-600 active:text-blue-500">
                      Cancel
                    </button>
                    <button
                      onClick={() => handleConfirm()}
                      className="text-sm font-semibold text-blue-500 uppercase hover:text-blue-600 active:text-blue-500">
                      Confirm
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </div>
    </Container>
  );
};

export default CreateEvent;

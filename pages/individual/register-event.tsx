import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/common/Container";
import { GlobalContext } from "../../state/contexts/GlobalContext";
import Head from "next/head";
import Header from "../../components/common/Header";
import { Dialog } from "@headlessui/react";
import Stepper, { Step } from "../../components/stepper/Stepper";
import UploadRegistration from "../../components/stepper/steps/UploadRegistration";
import ServerAuthorization from "../../components/stepper/steps/ServerAuthorization";

const RegisterEvent = () => {
  const {
    state: {},
  } = useContext(GlobalContext);

  let [isOpen, setIsOpen] = useState(false);

  const steps: Step[] = [
    {
      heading: "Server Authorization",
      subHeading:
        "You need to click to authorize ZK KYC to perform multiparty computation and ZK KYC generate tasks, please note that we don't save any user data.",
      render: (handleNext: Function) => (
        <ServerAuthorization next={handleNext} />
      ),
    },
    {
      heading: "Upload ZK KYC Proof",
      subHeading: "Please upload your ZK KYC to Blockchain",
      render: (handleNext: Function) => (
        <UploadRegistration next={handleNext} />
      ),
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
      <div className="flex flex-col items-start w-full h-full p-8 bg-brand-50">
        <div className="max-w-4xl mx-auto">
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
      </div>
    </Container>
  );
};

export default RegisterEvent;

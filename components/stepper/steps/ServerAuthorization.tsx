import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";

const ServerAuthorization = ({ next }: { next: any }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    next();
    // router.push("/individuals/all-events");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("Multi-party calculation in progress...");
  const [state, setState] = useState({
    discord: false,
    twitter: false,
  });

  const handleDiscord = () => {
    setIsOpen(true);
    setText("Generate ZK KYC data...");
    setTimeout(() => {
      setState((prev) => ({ ...prev, discord: true }));
      setIsOpen(false);
    }, 3000);
  };

  const handleTwitter = () => {
    setIsOpen(true);
    setText("Multi-party calculation in progress...");
    setTimeout(() => {
      setState((prev) => ({ ...prev, twitter: true }));
      setIsOpen(false);
    }, 3000);
  };

  useEffect(() => {
    if (state.discord && state.twitter) {
      next();
    }
  }, [state.discord, state.twitter, next]);

  return (
    <div className="flex flex-col w-full overflow-hidden text-center rounded-xl">
      <div className="flex items-center bg-brand-200">
        <div className="flex-1 p-2">Server</div>
        <div className="flex-1 p-2">Server Link</div>
        <div className="flex-1 p-2">Authorization</div>
      </div>
      <div className="flex items-center bg-brand-100">
        <div className="flex-1 p-2">Twitter</div>
        <div className="flex-1 p-2 ">https://twitter.com</div>
        <div className="flex-1 p-2 text-center">
          {!state.twitter ? (
            <a target="_blank" rel="noreferrer" href="https://twitter.com">
              <Button variant="secondary" onClick={() => handleTwitter()}>
                Auth
              </Button>
            </a>
          ) : (
            <Button>Done</Button>
          )}
        </div>
      </div>
      <div className="flex items-center bg-brand-100">
        <div className="flex-1 p-2">Discord</div>
        <div className="flex-1 p-2">https://discord.com/login</div>
        <div className="flex-1 p-2 text-center">
          {!state.discord ? (
            <a
              target="_blank"
              rel="noreferrer"
              href="https://discord.com/login">
              <Button
                variant="secondary"
                className=""
                onClick={() => handleDiscord()}>
                Auth
              </Button>
            </a>
          ) : (
            <Button>Done</Button>
          )}
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50">
        <div className="fixed inset-0 bg-black/30"></div>
        <div className="fixed inset-0 overflow-y-auto">
          {/* Container to center the panel */}
          <div className="flex items-center justify-center min-h-full p-4">
            <Dialog.Panel className="flex flex-col w-full max-w-lg gap-4 p-24 mx-auto text-center bg-white rounded md:w-1/3 ">
              {text}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ServerAuthorization;

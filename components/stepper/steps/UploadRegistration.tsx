import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { setWalletAddress, updateEvent } from "../../../state/actions/global";
import { GlobalContext } from "../../../state/contexts/GlobalContext";
import Button from "../../common/Button";

const UploadRegistration = ({ next }: { next: any }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // next();
    // router.push("/individuals/all-events");
  };
  const router = useRouter();

  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "newAddress",
          type: "address",
        },
      ],
      name: "ContractCreated",
      type: "event",
    },
    {
      inputs: [],
      name: "allFoundations",
      outputs: [
        {
          internalType: "contract Kangaroo[]",
          name: "coll",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "createKangaroo",
      outputs: [
        {
          internalType: "contract Kangaroo",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const setup = async () => {
    try {
      console.log("SEtYP");
      const addressContract = "0xdCc106447cE2ac2DB24eb10fE257dd57D89Ae9d3";
      const ethereum = (window as any).ethereum;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const walletAddress = accounts[0];
      dispatch(setWalletAddress(walletAddress));
      dispatch(updateEvent(state.currentEvent!));
      router.push("/individual/all-events");
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   if (!(window as any).ethereum) return;
  //   try {
  //     setup();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md gap-8">
      {/* <div className="flex flex-col w-full gap-4"></div> */}
      <Button fullWidth={true} type="submit" onClick={setup}>
        Upload to Blockchain
      </Button>
    </form>
  );
};

export default UploadRegistration;

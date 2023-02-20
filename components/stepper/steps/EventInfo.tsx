import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { addEvent, setWalletAddress } from "../../../state/actions/global";
import { GlobalContext } from "../../../state/contexts/GlobalContext";
import Button from "../../common/Button";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";

const EventInfo = ({ next }: { next: any }) => {
  const { state, dispatch } = useContext(GlobalContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      currentEvent.eventTopic === "" ||
      currentEvent.eventLink === "" ||
      currentEvent.eventDescription === ""
    ) {
      return;
    }
    await connect();
    dispatch(addEvent(currentEvent));
    next();
  };

  const [currentEvent, setCurrentEvent] = useState({
    eventTopic: "",
    eventLink: "",
    from: new Date().toString(),
    to: new Date().toString(),
    eventDescription: "",
    registered: false,
  });

  const handleChange = (name: string, value: string) => {
    setCurrentEvent({
      ...currentEvent,
      [name]: value.toString(),
    });
  };

  const setup = async () => {
    try {
      const ethereum = (window as any).ethereum;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      new ethers.providers.Web3Provider((window as any).ethereum);
      const walletAddress = accounts[0];
      dispatch(setWalletAddress(walletAddress));
    } catch (e) {
      console.log(e);
    }
  };

  const connect = async () => {
    if (!(window as any).ethereum) return;
    try {
      await setup();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md gap-8">
      <div className="flex flex-col w-full gap-4">
        <Input
          label="Event Topic"
          placeholder="Campaigns, Hackathons, Contests or other events"
          value={currentEvent.eventTopic}
          onChange={(e) => handleChange("eventTopic", e.target.value)}
        />
        <Input
          startText="www.event.com/"
          label="Event Link"
          subLabel="optional"
          placeholder="Enter the source link"
          value={currentEvent.eventLink}
          onChange={(e) => handleChange("eventLink", e.target.value)}
        />
        <Input
          label="Date and Time"
          subLabel="from"
          type="datetime-local"
          placeholder="Enter the source link"
          value={currentEvent.from.toString()}
          onChange={(e) => handleChange("from", e.target.value)}
        />
        <Input
          label="Date and Time"
          subLabel="to"
          type="datetime-local"
          placeholder="Enter the source link"
          value={currentEvent.to.toString()}
          onChange={(e) => handleChange("to", e.target.value)}
        />
        <TextArea
          label="Event Description"
          placeholder="Please describe the purpose of the event"
          value={currentEvent.eventDescription}
          onChange={(e) =>
            handleChange("eventDescription", e.target.value)
          }></TextArea>
      </div>
      <Button variant="secondary" fullWidth={true} type="submit">
        Create Event
      </Button>
    </form>
  );
};

export default EventInfo;

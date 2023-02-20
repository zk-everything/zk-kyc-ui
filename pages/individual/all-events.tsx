import React, { useContext, useState } from "react";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import { Event, GlobalContext } from "../../state/contexts/GlobalContext";
import Head from "next/head";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";
import { setDaoData, setEvent } from "../../state/actions/global";
import { format } from "date-fns";

const AllEvents = () => {
  const {
    state: { events },
    dispatch,
  } = useContext(GlobalContext);

  const [formData, setFormData] = useState([
    { label: "DAO Name", value: "" },
    { label: "DAO Token Name", value: "" },
    { label: "DAO Token Supply", value: "" },
  ]);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      setDaoData(formData[0].value, formData[1].value, formData[2].value)
    );
    router.push("/user/token-and-members");
  };

  const handleChange = (label: string, value: string) => {
    const newData = formData.map((data) => {
      if (data.label === label) {
        return { ...data, value };
      }
      return data;
    });
    setFormData(newData);
  };

  const registerEvent = (event: Event) => {
    dispatch(setEvent(event));
    router.push("/individual/register-event");
  };

  return (
    <Container>
      <Head>
        <title>All Events</title>
      </Head>
      <Header />
      <div className="flex flex-col w-full h-full gap-10 p-8 overflow-hidden bg-brand-50">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl text-center text-brand-700">All Events</h1>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {events.map((event) => (
              <div
                className="flex flex-col justify-between gap-4 p-4 border rounded-xl bg-brand-100 border-brand-100"
                key={event.eventTopic}>
                <div className="flex flex-col gap-4">
                  <div className="">{event.eventTopic}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="text-brand-500">Created by</div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="text-brand-600">ZK KYC</div>
                  </div>
                  <div className="text-sm text-brand-500">
                    {event.eventDescription}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 pt-4 border-t border-brand-200">
                  <div className="flex flex-col flex-1 text-brand-700">
                    <div className="flex items-center justify-between">
                      <div className="text-xs">FROM:</div>
                      <div className="text-sm font-semibold text-brand-400">
                        {format(new Date(event.from), "dd-MMM-yy HH:MM")}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs">TO:</div>
                      <div className="text-sm font-semibold text-brand-400">
                        {format(new Date(event.from), "dd-MMM-yy HH:MM")}
                      </div>
                    </div>
                  </div>
                  {event.registered ? (
                    <Button variant="secondary">Registered</Button>
                  ) : (
                    <Button onClick={() => registerEvent(event)}>
                      Register
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {events.length === 0 && (
              <div className="col-span-3 text-lg font-semibold text-center text-brand-800">
                No events at the moment
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AllEvents;

import { useRouter } from "next/router";
import React from "react";
import Button from "../../common/Button";

const Final = ({ next }: { next: any }) => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // next();
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md gap-12">
      <Button variant="secondary" fullWidth={true} type="submit">
        View Events
      </Button>
    </form>
  );
};

export default Final;

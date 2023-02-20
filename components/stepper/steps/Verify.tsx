import React from "react";
import Button from "../../common/Button";

const Verify = ({ next }: { next: any }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    next();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col w-full max-w-md gap-8">
      <div className="p-4 text-xs text-gray-700 bg-gray-100">
        Nowadays, the number of cellphone users rises rapidly and the time that
        people keep their eyes on their mobile screens is increasing as well.
        This behavior really creates lots of stress upon your eyes which is
        unhealthy. To combat this, one must be serious and aware. First of all,
        you should control your time of play phones. You’d better have a rest
        after focusing on the screen for an hour. Second, you may do eyes
        exercise and eat some fruit and vegetable which is good for your eyes’
        health. In a word, taking care of your eyes, if you get eye disease,
        that won’t be a happy thing. Ever since I was little I have had the
        security and love of a whole family. I’m sure all of you have lost a
        loved one, ranging from a dear pet to a beloved family member. I have
        lost many cherished hamsters, but never in my childhood did I think I
        would lose a family member. have many family members; I even have two
        living great-grandparents and I also had four grandparents. All that
        changed at the beginning of 2002. At that time our family was astonished
      </div>
      <div className="text-sm font-semibold text-gray-600">
        You&apos;re already a business user, go ahead and create a KYC event!
      </div>
      <Button variant="secondary" fullWidth={true} type="submit">
        Create a KYC Event
      </Button>
    </form>
  );
};

export default Verify;

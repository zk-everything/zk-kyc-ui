import { Fragment, ReactNode, useState } from "react";
import StepperContent from "./StepperContent";
import StepperCircle from "./StepperCircle";

export type Step = {
  heading: string;
  subHeading: string;
  render: (prop: Function) => ReactNode;
};

const Stepper = ({ steps }: { steps: Step[] }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = () => {
    setActiveStep((prevStep) => (prevStep + 1) % steps.length);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full gap-10 md:justify-center md:gap-16">
      <div className="flex items-center w-full max-w-md">
        {steps.map((step, index) => {
          return (
            <Fragment key={step.heading}>
              <StepperCircle
                // onClick={() => setActiveStep(index)}
                activeStep={activeStep}
                currentStep={index}
                steps={steps.length}>
                {index + 1}
              </StepperCircle>
            </Fragment>
          );
        })}
      </div>
      <StepperContent
        steps={steps.length}
        activeStep={activeStep}
        handleNext={handleNextStep}
        data={steps[activeStep]}
      />
    </div>
  );
};

export default Stepper;

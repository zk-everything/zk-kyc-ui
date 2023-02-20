import { FC, ReactNode } from "react";

type StepperCircleProps = {
  children: ReactNode;
  activeStep: number;
  currentStep: number;
  steps: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const StepperCircle: FC<StepperCircleProps> = ({
  activeStep,
  currentStep,
  steps,
  children,
  ...props
}) => {
  const lastStep = currentStep === steps - 1;
  const active = currentStep === activeStep;
  const completed = currentStep < activeStep;

  return (
    <>
      <div
        {...props}
        className={`relative select-none  flex items-center justify-center w-10 h-10  border rounded-full ${
          completed || active
            ? "bg-accent-600 text-gray-300"
            : "border-gray-300 text-gray-700 dark:text-gray-300"
        }`}>
        {children}
      </div>
      {!lastStep && (
        <>
          <div
            className={`flex-1 border-t ${
              completed && "border-t-accent-600 dark:border-t-accent-500"
            } ${
              active && "border-t-brand-600 dark:border-t-brand-500"
            } `}></div>
          <div
            className={`flex-1 border-t ${
              completed && "border-t-brand-600 dark:border-t-brand-500"
            }`}></div>
        </>
      )}
    </>
  );
};

export default StepperCircle;

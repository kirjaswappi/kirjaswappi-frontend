import { useState } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  label: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface UseStepManagerProps {
  initialSteps: Step[];
  validateStep: () => Promise<boolean>;
}

export const useStepManager = ({ initialSteps, validateStep }: UseStepManagerProps) => {
  const [active, setActive] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  const handleNext = async () => {
    const valid = await validateStep();
    if (valid) {
      setSteps((prevStep) =>
        prevStep.map((step, index) => {
          if (index === active) {
            return { ...step, isActive: false, isCompleted: true };
          } else if (index === active + 1) {
            return { ...step, isActive: true };
          }
          return step;
        }),
      );
      setActive((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => {
        if (index === active) {
          // Current step becomes inactive and not completed
          return { ...step, isActive: false, isCompleted: false };
        } else if (index === active - 1) {
          // Previous step becomes active and not completed (since user is going back)
          return { ...step, isActive: true, isCompleted: false };
        }
        return step;
      }),
    );
    if (active === 0) return;
    setActive((prev) => prev - 1);
  };

  const handleStepClick = async (stepId: number) => {
    const targetStep = stepId - 1; // stepId is 1-based, but array index is 0-based

    // Only allow navigation to previous steps or the next step if current step is valid
    if (targetStep < active) {
      // Going back - no validation needed
      setSteps((prevSteps) =>
        prevSteps.map((step, index) => {
          if (index === targetStep) {
            return { ...step, isActive: true, isCompleted: false };
          } else {
            return { ...step, isActive: false, isCompleted: index < targetStep };
          }
        }),
      );
      setActive(targetStep);
    } else if (targetStep === active + 1) {
      // Going forward - validate current step first
      const valid = await validateStep();
      if (valid) {
        setSteps((prevSteps) =>
          prevSteps.map((step, index) => {
            if (index === active) {
              return { ...step, isActive: false, isCompleted: true };
            } else if (index === targetStep) {
              return { ...step, isActive: true };
            }
            return step;
          }),
        );
        setActive(targetStep);
      }
    }
    // Don't allow skipping steps (targetStep > active + 1)
  };

  return {
    active,
    steps,
    handleNext,
    handlePrev,
    handleStepClick,
  };
};

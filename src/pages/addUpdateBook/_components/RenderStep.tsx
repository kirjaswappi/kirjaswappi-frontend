import { FieldErrors } from 'react-hook-form';
import { IAddUpdateBookData, TOptions } from '../types/interface';
import BookDetailsStep from './BookDetailsStep';
import ConditionsStep from './ConditionsStep';
import OtherDetailsStep from './OtherDetailsStep';
interface StepContentProps {
  activeStep: number;
  languages: TOptions[];
  conditions: TOptions[];
  errors: FieldErrors<IAddUpdateBookData>;
}
const RenderStepContent = ({ activeStep, languages, conditions, errors }: StepContentProps) => {
  const stepComponents = [
    <BookDetailsStep key={0} languageOptions={languages} conditionOptions={conditions} />,
    <OtherDetailsStep key={1} errors={errors} />,
    <ConditionsStep key={2} errors={errors} />,
  ];

  return stepComponents[activeStep] || null;
};
export default RenderStepContent;

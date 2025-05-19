import { TOptions } from '../types/interface';
import BookDetailsStep from './BookDetailsStep';
import ConditionsStep from './ConditionsStep';
import OtherDetailsStep from './OtherDetailsStep';

const BookFormStep = ({
  activeStep,
  errors,
  languages,
  conditions,
}: {
  activeStep: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  languages: TOptions[] | undefined;
  conditions: TOptions[] | undefined;
}) => {
  switch (activeStep) {
    case 0:
      return <BookDetailsStep languageOptions={languages} conditionOptions={conditions} />;
    case 1:
      return <OtherDetailsStep errors={errors} />;
    case 2:
      return <ConditionsStep errors={errors} />;
    default:
      return null;
  }
};

export default BookFormStep;

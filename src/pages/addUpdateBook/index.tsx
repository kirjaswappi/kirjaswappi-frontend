import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import yup from 'yup';
import NextArrowIcon from '../../assets/arrow1.png';
import PrevArrowIcon from '../../assets/arrow2.png';
import Image from '../../components/shared/Image';
import Loader from '../../components/shared/Loader';
import {
  useAddBookMutation,
  useGetBookByIdQuery,
  useGetSupportConditionQuery,
  useGetSupportLanguageQuery,
  useUpdateBookMutation,
} from '../../redux/feature/book/bookApi';
import { options } from '../../utility/helper';
import Stepper from './_components/Stepper';
import { validationSchemas } from './Schema';

import AddGenre from '../../components/shared/AddGenre';
import Button from '../../components/shared/Button';
import { useAppSelector } from '../../redux/hooks';
import BookAddUpdateHeader from './_components/BookAddUpdateHeader';
import BookFormStep from './_components/BookFormStep';
import { buildFormData, getDefaultValues } from './helper';
import { IAddUpdateBookData } from './types/interface';
import { useStepManager } from '../../hooks/useStepManager';

const initialSteps = [
  {
    id: 1,
    title: 'Book Details',
    description: 'Add your book details here',
    label: 'Book Details',
    isCompleted: false,
    isActive: true,
  },
  {
    id: 2,
    title: 'Other Details',
    description: 'Add other details here',
    label: 'Other Details',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 3,
    title: 'Swap Condition',
    description: 'Set your swap condition',
    label: 'Swap Condition',
    isCompleted: false,
    isActive: false,
  },
];

export default function AddUpdateBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInformation } = useAppSelector((state) => state.auth);

  // LANGUAGE, CONDITION, & BOOK QUERY
  const { data: languageDataOptions, isLoading: languageLoading } =
    useGetSupportLanguageQuery(undefined);
  const { data: conditionDataOptions, isLoading: conditionLoading } =
    useGetSupportConditionQuery(undefined);
  const { data: bookData, isLoading: bookLoading } = useGetBookByIdQuery({ id: id }, { skip: !id });

  // ADD BOOK & UPDATE BOOK MUTATION
  const [addBook, { isLoading }] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const methods = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(validationSchemas[0] as yup.ObjectSchema<any>),
    mode: 'onChange',
    defaultValues: getDefaultValues(bookData),
  });

  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = methods;

  // STEP MANAGEMENT HOOK
  const { active, steps, handleNext, handlePrev, handleStepClick } = useStepManager({
    initialSteps,
    validateStep: trigger,
  });

  // MEMORIZED LANGUAGE & CONDITION DATA
  const languages = useMemo(() => options(languageDataOptions), [languageDataOptions]);

  const conditions = useMemo(() => options(conditionDataOptions), [conditionDataOptions]);

  // LOAD BOOK DATA AFTER RELOAD THE BROWSER
  useEffect(() => {
    if (bookData) reset(getDefaultValues(bookData));
  }, [bookData, reset]);

  const handleAddUpdateBookFn = async <T extends IAddUpdateBookData>(data: T) => {
    const formData = await buildFormData(data, userInformation.id, bookData?.id);
    try {
      const mutation = bookData?.id
        ? updateBook({ data: formData, id: bookData.id })
        : addBook(formData);

      await mutation.unwrap();
      navigate(`/profile/user-profile`);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const loading = () => {
    if (languageLoading) return true;
    if (conditionLoading) return true;
    if (bookLoading) return true;
    else return false;
  };

  if (loading()) return <Loader />;

  return (
    <div className="min-h-screen font-poppins">
      {/* Mobile Header */}
      <div className="md:hidden">
        <BookAddUpdateHeader
          title={`${id ? 'Update' : 'Add'} Book`}
          onBack={() => navigate('/profile/user-profile')}
        />
      </div>

      {/* Mobile Layout - Original */}
      <div className="md:hidden">
        <div className="">
          <div className="pt-16 border-b border-[#E4E4E4] pb-4">
            <Stepper steps={steps} onStepClick={handleStepClick} />
          </div>
          <FormProvider {...methods}>
            <AddGenre
              genresValue={active === 1 ? watch('genres') : watch('swappableGenres')}
              setEditValuesChanged={() => console.log('Genres updated')}
              setValue={setValue}
              trigger={trigger}
              addGenreName={active === 1 ? 'genres' : 'swappableGenres'}
            />
            <form onSubmit={handleSubmit((data) => handleAddUpdateBookFn(data))}>
              <BookFormStep
                activeStep={active}
                errors={errors}
                languages={languages}
                conditions={conditions}
              />
              <div className="mt-4 flex justify-between gap-3 pb-4">
                {active > 0 && (
                  <Button
                    onClick={handlePrev}
                    type="button"
                    className="bg-primary-light text-primary w-full py-4 rounded-lg border border-primary flex items-center justify-center font-poppins text-base font-medium"
                  >
                    <Image src={PrevArrowIcon} alt="Next" className="w-4" /> Back
                  </Button>
                )}
                {active <= 1 && (
                  <Button
                    onClick={handleNext}
                    type="button"
                    className="bg-primary text-white w-full py-4 rounded-lg flex items-center justify-center  font-poppins text-base font-medium"
                  >
                    Next <Image src={NextArrowIcon} alt="Next" className="w-4" />
                  </Button>
                )}
                {active === 2 && (
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="bg-primary text-white w-full py-4 rounded-lg"
                  >
                    {' '}
                    {isLoading ? 'Loading...' : 'Save'}
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* Desktop/Tablet Layout - Sidebar + Main Content */}
      <div className="container hidden md:flex py-8">
        {/* Left Sidebar - Stepper */}
        <div className="w-80 bg-white min-h-screen">
          {/* Desktop/Tablet Header */}
          <div className="hidden md:flex items-center pl-6 pt-6">
            <button
              onClick={() => navigate('/profile/user-profile')}
              className="p-2 rounded-lg bg-[#F5F6F7] hover:bg-[#e4e4e4] transition flex items-center justify-center"
              style={{ minWidth: 40, minHeight: 40 }}
            >
              <img src={PrevArrowIcon} alt="Back" className="w-4" />
            </button>
            <span className="ml-4 font-poppins font-semibold text-[24px] text-base text-[#262626]">
              {id ? 'Update' : 'Add'} Book
            </span>
          </div>
          <div className="pt-8">
            <Stepper steps={steps} onStepClick={handleStepClick} />
          </div>
        </div>

        {/* Right Main Content */}
        <div className="flex-1 bg-white">
          <div className="max-w-4xl mx-auto py-8 px-8 mt-[55px]">
            <div className="mb-6">
              <h2
                className="text-black mb-2 font-Poppins"
                style={{
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '32px',
                }}
              >
                {steps[active].title}
              </h2>
            </div>
            <FormProvider {...methods}>
              <AddGenre
                genresValue={active === 1 ? watch('genres') : watch('swappableGenres')}
                setEditValuesChanged={() => console.log('Genres updated')}
                setValue={setValue}
                trigger={trigger}
                addGenreName={active === 1 ? 'genres' : 'swappableGenres'}
              />
              <form onSubmit={handleSubmit((data) => handleAddUpdateBookFn(data))}>
                <BookFormStep
                  activeStep={active}
                  errors={errors}
                  languages={languages}
                  conditions={conditions}
                />
                <div className="mt-8 flex justify-end gap-4 pb-4">
                  {active > 0 && (
                    <Button
                      onClick={handlePrev}
                      type="button"
                      className="bg-primary-light text-primary px-8 py-3 rounded-lg border border-primary flex items-center justify-center font-poppins text-base font-medium"
                    >
                      <Image src={PrevArrowIcon} alt="Back" className="w-4 mr-2" /> Back
                    </Button>
                  )}
                  {active <= 1 && (
                    <Button
                      onClick={handleNext}
                      type="button"
                      className="bg-primary text-white px-8 py-3 rounded-lg flex items-center justify-center font-poppins text-base font-medium"
                    >
                      Next <Image src={NextArrowIcon} alt="Next" className="w-4 ml-2" />
                    </Button>
                  )}
                  {active === 2 && (
                    <Button
                      disabled={isLoading}
                      type="submit"
                      className="bg-primary text-white px-8 py-3 rounded-lg"
                    >
                      {isLoading ? 'Loading...' : 'Save'}
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

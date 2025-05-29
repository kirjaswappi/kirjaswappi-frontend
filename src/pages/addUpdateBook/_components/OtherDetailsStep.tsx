import Button from '../../../components/shared/Button';
import Image from '../../../components/shared/Image';
import { setOpen } from '../../../redux/feature/open/openSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import closeIcon from '../../../assets/close.svg';
import { useFormContext } from 'react-hook-form';
import InputLabel from '../../../components/shared/InputLabel';
import MultipleImageFileInput from './MultipleImageControllerField';
import { FieldErrors, FieldError } from 'react-hook-form';
import locationIcon from '../../../assets/location-icon.png';

export default function OtherDetailsStep({ errors }: { errors: FieldErrors }) {
  const { open } = useAppSelector((state) => state.open);
  const dispatch = useAppDispatch();
  const { getValues, setValue } = useFormContext();
  const genres = getValues('genres');

  const handleRemoveGenre = (genreValue: string) => {
    if (!genreValue) return;
    const genres = getValues('genres');
    setValue(
      'genres',
      genres?.filter((genre: string) => genre !== genreValue),
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5 items-start">
      {/* Cover Photo Section */}
      <div>
        <InputLabel label="Cover Photo" required />
        <MultipleImageFileInput errors={errors as Record<string, FieldError>} name="coverPhotos" />
      </div>

      {/* Genre + Location Section */}
      <div className="flex flex-col gap-4 justify-start mt-4">
        {/* Genre Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <InputLabel label="Genre" required />
            <button
              type="button"
              onClick={() => dispatch(setOpen(!open))}
              className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline"
            >
              Add
            </button>
          </div>
          <div>
            {genres && genres.length > 0 ? (
              <div className="flex flex-col gap-2 pt-4">
                {genres.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg"
                  >
                    <h3 className="font-poppins text-sm font-light">{item}</h3>
                    <Button onClick={() => handleRemoveGenre(item)}>
                      <Image src={closeIcon} alt="close" className="h-2" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[50px] bg-white mt-3 flex items-center justify-center rounded-md">
                <p className="text-xs text-grayDark">No Genre Added.</p>
              </div>
            )}
            {errors && errors['genres'] && (
              <div className="text-rose-500 text-xs mt-1 pl-2">
                {(errors['genres'] as FieldError)?.message}
              </div>
            )}
          </div>
        </div>

        {/* Location Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <InputLabel label="Location" />
            <button
              type="button"
              className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline"
            >
              Edit
            </button>
          </div>
          <div className="bg-[#F5F5F5] border border-[#E6E6E6] rounded-lg px-4 py-4 flex items-center gap-2">
            <Image src={locationIcon} alt="location" className="w-5 h-5" />
            <span className="font-poppins text-sm font-normal text-black">Helsinki, Finland</span>
          </div>
        </div>
      </div>
    </div>
  );
}

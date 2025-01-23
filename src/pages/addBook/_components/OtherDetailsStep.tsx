import { setOpen } from "../../../redux/feature/open/openSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

export default function OtherDetailsStep({errors}: {
  errors: any
}) {
  const { open } = useAppSelector((state) => state.open);
  const dispatch = useAppDispatch()
  console.log(errors)
  return (
    <div>
      <div>
      <div className="flex items-center justify-between py-4">
        <h1 className="font-poppins text-sm font-medium leading-none">Genre</h1>
        <button
          onClick={() => dispatch(setOpen(!open))}
          className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline"
        >
          Add
        </button>
      </div>
      {errors && errors['favGenres'] && (
                <div className="text-rose-500 text-xs mt-1 pl-2">{errors['favGenres']?.message}</div>
            )}
      </div>
    </div>
  );
}

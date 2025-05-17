import InputLabel from "../../../components/shared/InputLabel";
import ControlledInputField from "../../../components/shared/ControllerField";
import { IBookDetailsProps } from "../interface";

export default function BookDetailsStep({languageOptions, conditionOptions}: IBookDetailsProps) {
  return (
    <div>
      <div className="mt-4 pb-4 border-b border-platinumDark">
        <InputLabel label="Book Title" required />
        <ControlledInputField
          name="title"
          placeholder="Enter book title"
          className="rounded-md"
          showErrorMessage
        />
      </div>
      <div className="mt-4 pb-4 border-b border-platinumDark">
        <InputLabel label="Author Name" required />
        <ControlledInputField
          name="author"
          placeholder="Enter book author"
          className="rounded-md"
          showErrorMessage
        />
      </div>
      <div className="mt-4 pb-4 border-b border-platinumDark">
        <InputLabel label="Short Description" required />
        <ControlledInputField
        type="textarea"
          name="description"
          placeholder="Enter a short description of the book"
          className="rounded-md h-[83px]"
          showErrorMessage
        />
      </div>
      <div className="mt-4 pb-4 border-b border-platinumDark">
        <InputLabel label="Book Language" required />
        <ControlledInputField
          type="select"
          name="language"
          className="rounded-md bg-white"
          options={languageOptions}
          showErrorMessage
        />
      </div>
      <div className="mt-4 pb-4 border-b border-platinumDark">
        <InputLabel label="Book Condition" />
        <ControlledInputField
          type="select"
          name="condition"
          className="rounded-md bg-white"
          options={conditionOptions}
          showErrorMessage
        />
      </div>
    </div>
  );
}

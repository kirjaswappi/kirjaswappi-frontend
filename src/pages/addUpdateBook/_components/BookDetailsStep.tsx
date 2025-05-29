import ControlledInputField from '../../../components/shared/ControllerField';
import InputLabel from '../../../components/shared/InputLabel';
import { IBookDetailsProps } from '../types/interface';

export default function BookDetailsStep({ languageOptions, conditionOptions }: IBookDetailsProps) {
  return (
    <div className="bg-white">
      <div className="mb-6">
        <h2
          className="text-black mb-2"
          style={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '32px',
            letterSpacing: '0px',
          }}
        >
          Book Details
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <InputLabel label="Book Title" required />
          <ControlledInputField
            name="title"
            placeholder="Write Here"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            showErrorMessage
          />
        </div>
        <div>
          <InputLabel label="Author Name" required />
          <ControlledInputField
            name="author"
            placeholder="Write Here"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            showErrorMessage
          />
        </div>
        <div>
          <InputLabel label="Book Condition" required />
          <ControlledInputField
            type="select"
            name="condition"
            className="rounded-md bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            options={conditionOptions}
            showErrorMessage
          />
        </div>
        <div>
          <InputLabel label="Book Language" required />
          <ControlledInputField
            type="select"
            name="language"
            className="rounded-md bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            options={languageOptions}
            showErrorMessage
          />
        </div>
        <div>
          <InputLabel label="Short Description" />
          <ControlledInputField
            type="textarea"
            name="description"
            placeholder="A brief description written by the user, displayed under the username. This could include their interests, favorite genres, or a personal quote."
            className="rounded-md h-[112px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
            showErrorMessage
          />
        </div>
        <div>
          <InputLabel label="Book Edition" />
          <ControlledInputField
            name="edition"
            placeholder="Write Here"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            showErrorMessage
          />
        </div>
      </div>
    </div>
  );
}

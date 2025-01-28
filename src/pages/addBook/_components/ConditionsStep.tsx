import InputLabel from "../../../components/shared/InputLabel";
import ControlledInputField from "./ControllerField";

export default function ConditionsStep({watch}:{watch:any}) {
  const conditionType = watch("conditionType");
  console.log(conditionType)
  return (
    <div>
      <h3>Condition Type</h3>
      <div className="flex flex-col gap-2">
        <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
          <ControlledInputField
            name="conditionType"
            type="radio"
            radioLabel="Open to Offer"
            radioValue="openToOffer"
          />
        </div>
        <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
          <ControlledInputField
            name="conditionType"
            type="radio"
            radioLabel="By Book"
            radioValue="byBook"
          />
        </div>
        <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
          <ControlledInputField
            name="conditionType"
            type="radio"
            radioLabel="By Genre"
            radioValue="byGenre"
          />
        </div>
      </div>
      {conditionType === "byBook" && <div>
      <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
        <InputLabel label="Book Title" required />
        <ControlledInputField
          name="bookTitle"
          placeholder="Enter your title"
          className="rounded-md"
        />
      </div>
      <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
        <InputLabel label="Author Name" />
        <ControlledInputField
          name="authorName"
          placeholder="Enter your author"
          className="rounded-md"
        />
      </div>
      </div>}
    </div>
  );
}

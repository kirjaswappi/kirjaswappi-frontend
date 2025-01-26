import { radioOptions } from "../constant";
import ControlledInputField from "./ControllerField";

export default function ConditionsStep() {

  return (
    <div>
      <h3>Condition Type</h3>
        <div className="flex flex-col gap-2">
        <ControlledInputField
          name="conditionType"
          type="radio"
          radioOptions={radioOptions}
        />
        <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
        </div>
        <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
        </div>
        <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
        </div>
        </div>
    </div>
  )
}

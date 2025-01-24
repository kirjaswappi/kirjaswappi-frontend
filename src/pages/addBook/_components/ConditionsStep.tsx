import Radio from "../../../components/shared/Radio";

export default function ConditionsStep() {
  return (
    <div>
      <h3>Condition Type</h3>
        <div className="flex flex-col gap-2">
        <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
          <Radio value={'Open to Offer'} />
        </div>
        <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
          <Radio value={'By Book'} />
        </div>
        <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
          <Radio value={'By Genre'} />
        </div>
        </div>
    </div>
  )
}

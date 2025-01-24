interface IRadio {
    value: string;
    onChange?: () => void;
    className?: string;
}
export default function Radio({value, onChange}: IRadio) {
  return (
    <div>
        <label className={`flex flex-row items-center gap-2`}>
            <input
              type="radio"
              value={value}
              onChange={onChange}
              name="radio"
            />
            <p className="leading-none font-poppins text-sm font-normal text-[#0D0D0D]">{value}</p>
          </label>
    </div>
  )
}

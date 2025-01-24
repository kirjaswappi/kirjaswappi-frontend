import { Noop, RefCallBack } from "react-hook-form";

interface IRadio {
  value: string | undefined; onChange: (event: any) => void; onBlur: Noop; name: string; ref: RefCallBack
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

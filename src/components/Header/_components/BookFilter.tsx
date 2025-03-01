import Button from "../../shared/Button";
import Image from "../../shared/Image";
import deleteIcon from "../../../assets/deleteIcon.png";
import Line from "../../shared/Line";
import InputLabel from "../../shared/InputLabel";
import CheckboxControllerField from "./CheckboxInputControllerField";

export default function BookFilter() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-grayDark font-poppins font-medium text-sm">
          Book Filter
        </h3>
        <Button className="flex items-center gap-1 h-[26px] bg-[#DBEDFF] border border-primary text-xs font-poppins font-normal text-primary px-2 py-1 rounded-lg">
          <div className="w-3 h-3 flex items-center justify-center">
            <Image src={deleteIcon} alt="Delete Icon" className="h-fit" />
          </div>
          Clear all
        </Button>
      </div>
      <Line className="my-4" />
      <InputLabel label="Genre" className="mb-4" />
      <div className="pl-3">
        {[
          "Fantasy",
          "Romantic Novel",
          "Thriller",
          "Science Fiction",
          "Historical",
          "Psychology",
        ].map((genre, index) => (
          <CheckboxControllerField key={index} name="genre" value={genre} />
        ))}
      </div>
      <Line className="my-4" />
        <InputLabel label="Language" className="mb-4" />
        <div className="pl-3">
        {["All", "English", "Finnish", "Swedish"].map((language, index) => (
          <CheckboxControllerField
            key={index}
            name="language"
            value={language}
          />
        ))}
        </div>
        <Line className="my-4" />
        <InputLabel label="Swap Condition" className="mb-4" />
        <div className="pl-3">
        {["Any", "Open to offer", "Specific Condition"].map(
          (condition, index) => (
            <CheckboxControllerField
              key={index}
              name="condition"
              value={condition}
            />
          )
        )}
        </div>
    </div>
  );
}

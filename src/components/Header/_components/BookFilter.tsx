import Button from "../../shared/Button";
import Image from "../../shared/Image";
import deleteIcon from "../../../assets/deleteIcon.png";
import Line from "../../shared/Line";
import InputLabel from "../../shared/InputLabel";
import CheckboxControllerField from "./CheckboxInputControllerField";
import { useGetGenreQuery } from "../../../redux/feature/genre/genreApi";
import GenreSkelton from "./GenreSkelton";

import {
  useGetSupportConditionQuery,
  useGetSupportLanguageQuery,
} from "../../../redux/feature/book/bookApi";
import { useFormContext } from "react-hook-form";

export default function BookFilter() {
  const { data: genreData = [], isLoading: genreLoading } =
    useGetGenreQuery(undefined);
  const { data: languageDataOptions, isLoading: languageLoading } =
    useGetSupportLanguageQuery(undefined);
  const { data: conditionDataOptions, isLoading: conditionLoading } =
    useGetSupportConditionQuery(undefined);
  const { reset } = useFormContext();
  return (
    <div className="overflow-y-scroll h-screen custom-scrollbar px-2">
      <div className="flex items-center justify-between">
        <h3 className="text-grayDark font-poppins font-medium text-sm">
          Book Filter
        </h3>
        <Button
          type="reset"
          onClick={() => reset()}
          className="flex items-center gap-1 h-[26px] bg-[#DBEDFF] border border-primary text-xs font-poppins font-normal text-primary px-2 py-1 rounded-lg"
        >
          <div className="w-3 h-3 flex items-center justify-center">
            <Image src={deleteIcon} alt="Delete Icon" className="h-fit" />
          </div>
          Clear all
        </Button>
      </div>
      <Line className="my-4" />
      <InputLabel label="Genre" className="mb-4" />
      <div className="pl-3">
        {genreLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }, (_, index) => (
              <GenreSkelton key={index} />
            ))}
          </div>
        ) : (
          genreData?.map(
            (genre: { id: string; name: string }, index: number) => (
              <CheckboxControllerField
                key={index}
                name="genre"
                value={genre.name}
              />
            )
          )
        )}
      </div>
      <Line className="my-4" />
      <InputLabel label="Language" className="mb-4" />
      <div className="pl-3">
        {languageLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }, (_, index) => (
              <GenreSkelton key={index} />
            ))}
          </div>
        ) : (
          languageDataOptions?.map((language: string, index: number) => (
            <CheckboxControllerField
              key={index}
              name="language"
              value={language}
            />
          ))
        )}
      </div>
      <Line className="my-4" />
      <InputLabel label="Swap Condition" className="mb-4" />
      <div className="pl-3">
        {conditionLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }, (_, index) => (
              <GenreSkelton key={index} />
            ))}
          </div>
        ) : (
          conditionDataOptions?.map((condition: string, index: number) => (
            <CheckboxControllerField
              key={index}
              name="condition"
              value={condition}
            />
          ))
        )}
      </div>
      <Line className="my-4" />
      <Button type="submit" className="bg-primary text-white mb-12 w-full py-3 rounded-lg font-poppins font-medium text-base">Apply Filter</Button>
    </div>
  );
}

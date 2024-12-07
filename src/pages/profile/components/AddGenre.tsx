import React, { SetStateAction } from "react";
import plusIcon from "../../../assets/plusIcon.png";
import tickMarkIcon from "../../../assets/tickmark.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import Loader from "../../../components/shared/Loader";
import { useGetGenreQuery } from "../../../redux/feature/genre/genreApi";
import { IEditInfo, IGenreItemType } from "../interface/interface";
import SideDrawer from "./SideDrawer";

export default function AddGenre({
    editInfo,
    setEditInfo,
    setEditValuesChanged
}: {
    editInfo: IEditInfo;
    setEditInfo: React.Dispatch<SetStateAction<IEditInfo>>;
    setEditValuesChanged: React.Dispatch<SetStateAction<boolean>>
}) {
    const { data, isLoading } = useGetGenreQuery(undefined);

    const { favGenres } = editInfo;

    const handleAddGenre = (genreValue: string) => {
        if (!favGenres?.includes(genreValue)) {
            setEditInfo((prev) => ({
              ...prev,
              favGenres: [...prev.favGenres?? [], genreValue],
            }));
            setEditValuesChanged(true)
          }
    };

    if (isLoading) return <Loader />;
    return (
        <SideDrawer title="Genre">
            <div className="flex flex-col gap-2 pb-4 mt-8">
                {data?.map(
                    (
                        genreItem: IGenreItemType,
                        index: string | number
                    ) => {
                        const isGenActive = favGenres?.includes(genreItem.name);
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg"
                            >
                                <h3 className="font-sofia text-sm font-light">
                                    {genreItem.name}
                                </h3>
                                {isGenActive ? (
                                    <Button>
                                        <Image
                                            src={tickMarkIcon}
                                            alt="Selected"
                                            className="h-auto"
                                        />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() =>
                                            handleAddGenre(genreItem.name)
                                        }
                                    >
                                        <Image
                                            src={plusIcon}
                                            alt="Add"
                                            className="h-auto"
                                        />
                                    </Button>
                                )}
                            </div>
                        );
                    }
                )}
            </div>
        </SideDrawer>
    );
}

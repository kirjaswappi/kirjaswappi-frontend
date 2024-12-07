export interface IEditInfo {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    aboutMe: string | undefined;
    streetName: string | undefined;
    houseNumber: string | undefined;
    zipCode: number | undefined;
    city: string | undefined;
    country: string | undefined;
    phoneNumber: string | undefined;
    favGenres: string[] | undefined;
}

export interface IGenreItemType { name: string; id: string | undefined }
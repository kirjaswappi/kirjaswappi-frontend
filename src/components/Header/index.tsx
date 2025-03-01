import { useLocation } from "react-router-dom";
import Search from "../shared/Search";
import TopBar from "./_components/TopBar";
import filterIcon from "../../assets/filter.png";

import Image from "../shared/Image";
import SideLeftDrawer from "./_components/LeftSideDrawer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOpen } from "../../redux/feature/open/openSlice";
import BookFilter from "./_components/BookFilter";
import { FormProvider, useForm } from "react-hook-form";
export default function Header() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.open);
  const showTopHeaderPath = ["/"];
  const isHeaderShow = showTopHeaderPath.find(
    (path) => path === location.pathname
  );
  const methods = useForm({
    mode: "onChange",
    defaultValues:{
      genre: [],
      language: [],
      condition:[] 
    }
  });
  const { handleSubmit } = methods;
  return (
    <header className={`${isHeaderShow ? "pb-28" : "pb-0"}`}>
      <FormProvider {...methods}>
        <SideLeftDrawer>
          <form onSubmit={handleSubmit((data) => console.log({ data }))}>
            <BookFilter />
          </form>
        </SideLeftDrawer>
      </FormProvider>
      <div
        className={`${
          isHeaderShow ? "block bg-light" : "hidden"
        } fixed w-full px-5 py-2 flex flex-col gap-[12px]`}
      >
        <TopBar />
        <div className="flex items-center gap-1">
          <div
            onClick={() => dispatch(setOpen(!open))}
            className="w-[48px] h-[42px] rounded-[24px] bg-primary flex items-center justify-center px-[10px] py-2"
          >
            <Image src={filterIcon} alt="filter icon" />
          </div>
          <Search />
        </div>
      </div>
    </header>
  );
}

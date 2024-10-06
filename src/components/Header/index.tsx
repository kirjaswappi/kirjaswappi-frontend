import { useLocation } from "react-router-dom";
import Search from "../shared/Search";
import TopBar from "./_components/TopBar";

export default function Header() {
  const location = useLocation()
  const showTopHeaderPath =['/']

  const isHeaderShow = showTopHeaderPath.find((path) => path === location.pathname)

  return (
    <header className={`${isHeaderShow ? "pb-28":"pb-0"}`}>
      {/* Mobile Header */}
      <div className={`${isHeaderShow ? 'block bg-light':"hidden"} fixed w-full px-5 py-2 flex flex-col gap-[12px]`}>
        <TopBar />
        <Search />
      </div>
    </header>
  );
}
import { useAppSelector } from "../../../redux/hooks";

export default function SideLeftDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useAppSelector((state) => state.open);
  return (
    <div
      className={`bg-black bg-opacity-50 inset-0 w-full h-screen fixed top-0 left-0 z-50 ${
        open ? "" : ""
      }`}
    >
      <div className="w-9/12 h-full bg-white px-4 py-8">
      {children}
      </div>
    </div>
  );
}

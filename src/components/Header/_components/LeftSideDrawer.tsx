export default function SideLeftDrawer({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`
        fixed inset-0 w-full h-screen bg-black bg-opacity-50
        transition-opacity duration-500 ease-in-out
        ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        z-50
      `}
    >
      <div
        className={`
          fixed top-0 left-0 h-full bg-white px-4 py-8
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0 w-[70%]' : '-translate-x-full'}
        `}
      >
        {children}
      </div>
    </div>
  );
}

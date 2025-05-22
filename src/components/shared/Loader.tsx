import icon from '../../assets/offerBookIcon.png';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative rounded-full w-8 h-8 bg-white flex items-center justify-center">
        <img src={icon} alt="loader" className=" animate-pulse" />
        <div className="absolute -top-1 -left-1 w-10 h-10 border-4 border-transparent border-t-4 border-t-primary border-r-4 border-r-white rounded-full animate-spin" />
      </div>
    </div>
  );
}

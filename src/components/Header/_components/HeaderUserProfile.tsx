import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import blankProfileIcon from '../../../assets/blankProfileIcon.png';
import { useGetUserProfileImageQuery } from '../../../redux/feature/auth/authApi';
import { useAppSelector } from '../../../redux/hooks';
import Image from '../../shared/Image';
import UserProfileSkeleton from './UserProfileSkeleton';

export default function HeaderUserProfile() {
  // const { clicked, setClicked, reference } = useMouseClick();
  const { userInformation } = useAppSelector((state) => state.auth);
  const { data: profilePicture, isLoading } = useGetUserProfileImageQuery(
    { userId: userInformation.id },
    {
      skip: !userInformation.id,
    },
  );
  return (
    <div>
      {isLoading ? (
        <UserProfileSkeleton />
      ) : (
        <div>
          {!userInformation.id ? (
            <Link to="/auth/login">
              <Image
                src={blankProfileIcon}
                alt="profile"
                className="w-10 h-10 object-cover rounded-full border border-primary"
              />
            </Link>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src={profilePicture?.imageUrl ?? blankProfileIcon}
                  alt="profile"
                  className="w-10 h-10 object-cover rounded-full border border-primary"
                />
                <div className=" items-center gap-2 hidden lg:flex">
                  <p className="text-grayDark font-poppins font-normal text-sm">
                    {userInformation.firstName}
                  </p>
                  <MdOutlineKeyboardArrowDown size={24} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

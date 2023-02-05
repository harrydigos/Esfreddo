import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext } from "react";

type ProfileDropdownProps = {
  showDropdown: boolean;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
};

const ProfileDropdownContext = createContext<ProfileDropdownProps>({
  showDropdown: false,
  setShowDropdown: () => {},
});

const ProfileDropdownProvider: FC<PropsWithChildren<ProfileDropdownProps>> = ({ children, ...props }) => {
  return <ProfileDropdownContext.Provider value={{ ...props }}>{children}</ProfileDropdownContext.Provider>;
};

export const useProfileDropdownContext = () => useContext(ProfileDropdownContext);

export default ProfileDropdownProvider;

import { CalendarIcon, LogoutIcon, ProfileIcon, SettingsIcon, SupportIcon } from "@components/icons";
import { useNavbarContext } from "@components/navbar/NavbarProvider";
import { useCloseDropdown } from "@hooks/useCloseDropdown";
import { FC, SVGProps, useRef, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useUserCartContext } from "@components/user/UserCartProvider";

const ProfileDropdown = () => {
  const { visible } = useNavbarContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const user = useUser();
  const firstName = user?.user_metadata.full_name.split(" ")[0];

  const wrapperRef = useRef<HTMLDivElement>(null);
  useCloseDropdown<HTMLDivElement>(wrapperRef, setShowDropdown);

  return (
    <div ref={wrapperRef} className="relative">
      <button className="inline-flex items-center gap-3" onClick={() => setShowDropdown((oldValue) => !oldValue)}>
        <div className="max-w-[140px] select-none overflow-hidden text-ellipsis whitespace-nowrap text-dark">
          {firstName}
        </div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-300 to-purple-400" />
      </button>
      <ProfileDropdown.Content visible={showDropdown && visible} />
    </div>
  );
};

export default ProfileDropdown;

ProfileDropdown.Content = function ({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="absolute right-0 top-full z-10 mt-3 flex min-w-[165px] animate-anim-dropdown flex-col rounded-xl border border-black/5 bg-white text-sm font-medium text-dark">
      <ButtonGroup>
        <SimpleButton Icon={ProfileIcon} text="Profile" />
        <SimpleButton Icon={SettingsIcon} text="Settings" />
      </ButtonGroup>
      <Line />
      <ButtonGroup>
        <SimpleButton Icon={CalendarIcon} text="Order History" />
        <SimpleButton Icon={SupportIcon} text="Support" />
      </ButtonGroup>
      <Line />
      <LogoutButton />
    </div>
  );
};

const ButtonGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col py-2">{children}</div>
);

const SimpleButton = ({ Icon: IconComponent, text }: { Icon: FC<SVGProps<SVGSVGElement>>; text: string }) => {
  return (
    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
      <IconComponent className="fill-dark" height={20} />
      <div>{text}</div>
    </button>
  );
};

const Line = () => <div className="h-[2px] w-full bg-black/5" />;

const LogoutButton = () => {
  const supabase = useSupabaseClient();
  const { clearCart } = useUserCartContext();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    clearCart();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-between rounded-b-2xl px-4 py-3 hover:bg-gray-50"
    >
      <div className="font-semibold text-red-600">Logout</div>
      <LogoutIcon className="fill-dark" height={20} />
    </button>
  );
};

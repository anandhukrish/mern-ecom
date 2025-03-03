import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logoutUser } from "../../store/auth/authSlice.ts";
import { useAppDispatch } from "../../store/hooks/hooks.ts";
import { Dispatch, SetStateAction } from "react";

type AdminHeaderProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
function AdminHeader({ setOpen }: AdminHeaderProps) {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;

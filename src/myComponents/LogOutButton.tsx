import { Button } from "@/components/ui/button";
import { useRolesStore } from "@/lib/stores/useRolesStore";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};  

const LogOutButton = ({className}: Props) => {
  const setRoles = useRolesStore(state => state.setRoles);
   const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("auth_token");
    setRoles([]);
    localStorage.removeItem('roles-storage');
    router.replace("/login");
  };
  return (
    <Button onClick={handleLogOut} className={cn(className, "cursor-pointer")}>
      <LogOut />
      <span className="sm:inline hidden">Вихід</span>
    </Button>
  );
};

export default LogOutButton;

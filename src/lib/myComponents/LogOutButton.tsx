import { Button } from "@/components/ui/button";
import { clearToken } from "@/lib/auth";
import { useRolesStore } from "@/lib/stores/useRolesStore";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

const LogOutButton = ({ className }: Props) => {
  const setRoles = useRolesStore((state) => state.setRoles);
  const router = useRouter();

  const handleLogOut = () => {
    router.replace("/login");
    clearToken();
    setRoles([]);
  };
  return (
    <Button onClick={handleLogOut} className={cn(className, "cursor-pointer")}>
      <span className="sm:inline hidden">Вихід</span>
      <LogOut />
    </Button>
  );
};

export default LogOutButton;

import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "@/routes/hooks";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/auth-slice";
import { useDispatch } from "react-redux";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export default function DashboardNav({
  items,
  setOpen,
  isMobileNav = false,
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  if (!items?.length) {
    return null;
  }
  console.log("isActive", isMobileNav, isMinimized);

  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    navigateTo("/admin-login");
  };

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.disabled ? "/" : item.href}
                    className={cn(
                      "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:text-muted-foreground",
                      path === item.href
                        ? "bg-white text-black hover:text-black"
                        : "transparent",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    <Icon className={`ml-2.5 size-5`} />

                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ""
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? "hidden" : "inline-block"}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:text-muted-foreground"
              onClick={() => {
                handleLogout();
              }}
            >
              <Icons.logout className={`ml-2.5 size-5`} />
              <span className="mr-2 truncate">Logout</span>
            </button>
          </TooltipTrigger>
          <TooltipContent
            align="center"
            side="right"
            sideOffset={8}
            className={!isMinimized ? "hidden" : "inline-block"}
          >
            Logout
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  );
}

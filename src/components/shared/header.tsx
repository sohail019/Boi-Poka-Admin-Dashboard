import Heading from "@/components/shared/heading";
import UserNav from "@/components/shared/user-nav";
import { useMatchedPath } from "@/hooks/use-matched-path";
import { usePathname } from "@/routes/hooks";
import { ModeToggle } from "./theme-toggle";


export default function Header() {
  const pathname = usePathname();
    const headingText = useMatchedPath(pathname);

  return (
    <div className="hidden md:flex items-center justify-between bg-secondary px-4 py-2 shadow-md">
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <Heading title={headingText} />
      </div>
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-4">
          <a href="/dashboard" className="text-sm font-medium text-primary">
            Dashboard
          </a>
          <a href="/users" className="text-sm font-medium text-primary">
            Users
          </a>
          <a href="/books" className="text-sm font-medium text-primary">
            Books
          </a>
        </nav>
        <ModeToggle />
        <UserNav />
        {/* <button
          onClick={handleLogout}
          className="text-sm font-medium text-primary"
        >
          Logout
        </button> */}
      </div>
    </div>
  );
}

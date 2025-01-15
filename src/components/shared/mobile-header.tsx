import { usePathname } from "@/routes/hooks";
import Heading from "./heading";
import UserNav from "./user-nav";
import { ModeToggle } from "./theme-toggle";
import { useMatchedPath } from "@/hooks/use-matched-path";

export default function MobileHeader() {
  const pathname = usePathname();
  const headingText = useMatchedPath(pathname);

  return (
    <div className="flex flex-1 items-center justify-between bg-secondary px-4">
      <Heading title={headingText} />
      <div className="ml-4 flex items-center md:ml-6">
        <UserNav />
        <ModeToggle />
      </div>
    </div>
  );
}

import Image from "next/image";
import LoginDropdown from "./login-dropdown";
import Link from "next/link";
import NavbarNavigation from "./navbar-navigation";

export default function Navbar() {
  return (
    <div className="my-8 grid grid-cols-3 items-center">
      <Link href="/" className="flex items-center gap-x-2 justify-self-start">
        <Image
          src="./images/logo-small.svg"
          width={40}
          height={40}
          alt="small flashcard logo"
        />
        <p className="font-semibold text-2xl max-md:hidden">Flashcard</p>
      </Link>

      <NavbarNavigation />

      <div className="justify-self-end">
        <LoginDropdown />
      </div>
    </div>
  );
}

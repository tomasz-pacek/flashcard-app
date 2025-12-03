import Image from "next/image";
import LoginDropdown from "./login-dropdown";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="my-8 flex items-center justify-between relative">
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-x-2">
        <Image
          src="./images/logo-small.svg"
          width={40}
          height={40}
          alt="small flashcard logo"
        />
        <p className="font-semibold text-2xl">Flashcard</p>
      </Link>
      {/* NAVIGATION */}
      <div className="absolute -translate-x-1/2 left-1/2">czesc</div>
      {/* LOGIN */}
      <LoginDropdown />
    </div>
  );
}

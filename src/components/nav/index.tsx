import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeSwitcher } from "./theme-switcher";
import { useTheme } from "next-themes";

export const Nav = () => {
  const { data: sessionData } = useSession();

  // const { theme, setTheme } = useTheme()

  return (
    <nav className=" flex h-14 w-screen items-center justify-around border-b-[1px] border-neutral-300 bg-white py-10 shadow-sm dark:border-neutral-600 dark:bg-neutral-800">
      <ThemeSwitcher />
      <div>
        {" "}
        <h1 className="font-bold"> Dec</h1>{" "}
      </div>
      <div className="flex items-center gap-3">
        {sessionData && (
          <Image
            src={sessionData?.user?.image!}
            alt="Profile-picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <button
          className="rounded-full bg-black/10 px-6 py-2 font-semibold text-black no-underline transition hover:bg-black/20 dark:bg-black/10 dark:text-white dark:hover:bg-black/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
};

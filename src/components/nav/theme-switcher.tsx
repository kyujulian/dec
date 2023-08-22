import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const iconClasses = "w-7 h-7 text-neutral-700 dark:text-neutral-200  ";
  const icon =
    theme === "dark" ? (
      <MoonIcon className={iconClasses} />
    ) : (
      <SunIcon className={iconClasses} />
    );

  return (
    <div className="hidden text-neutral-200  dark:text-black md:flex">
      <div
        className="rounded-md border-[1px] border-neutral-400 p-2 drop-shadow-md hover:cursor-pointer dark:border-neutral-500"
        onClick={() => toggleTheme()}
      >
        {" "}
        {icon}{" "}
      </div>
    </div>
  );
};

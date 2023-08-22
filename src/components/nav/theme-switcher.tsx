import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { useTheme } from "next-themes"

export const ThemeSwitcher = () => {

  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {

    setTheme(theme === "light" ? "dark" : "light")
  }

  const iconClasses = "w-7 h-7 text-neutral-700 dark:text-neutral-200  "
  const icon = theme === "dark" ? <MoonIcon className={iconClasses} /> : <SunIcon className={iconClasses} />

  return (
    <div className="hidden md:flex  text-neutral-200 dark:text-black">
      <div className="border-[1px] hover:cursor-pointer dark:border-neutral-500 border-neutral-400 drop-shadow-md rounded-md p-2"
        onClick={() => toggleTheme()}
      > {icon} </div>
    </div>
  )
}


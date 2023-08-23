import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ThemeSwitcher } from './theme-switcher';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import UserMenu from './menu';

export const Nav = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className=" flex h-14 w-screen items-center justify-around border-b-[1px] border-neutral-300 bg-white py-10 shadow-sm dark:border-neutral-600 dark:bg-neutral-800">
      <ThemeSwitcher />
      <div>
        {' '}
        <h1 className="font-bold"> Dec</h1>{' '}
      </div>
      <div className="flex items-center gap-3">
        {sessionData ? (
          <UserMenu />
        ) : (
          <button
            className="rounded-full bg-black/10 px-6 py-2 font-semibold text-black no-underline transition hover:bg-black/20 dark:bg-black/10 dark:text-white dark:hover:bg-black/20"
            onClick={() => void signIn()}>
            {'Sign in'}
          </button>
        )}
      </div>
    </nav>
  );
};

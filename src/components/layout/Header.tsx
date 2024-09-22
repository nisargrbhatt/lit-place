"use client";
import { useAuth, UserButton, GoogleOneTap } from "@clerk/nextjs";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "../ui/button";

interface Props {}

const Header: FC<Props> = () => {
  const { isSignedIn } = useAuth();
  return (
    <header className="w-full shadow">
      <nav className="mx-auto flex w-full max-w-screen-xl items-center justify-start px-2 py-2">
        <div className="w-full flex-1">
          <Link href="/" className="text-xl font-bold">
            Literature Place
          </Link>
        </div>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <>
            <Link
              href={`/sign-in?${new URLSearchParams({
                redirect_url: window.location.href,
              }).toString()}`}
            >
              <Button type="button">Sign In</Button>
            </Link>
            <GoogleOneTap />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";
import { useSession } from "next-auth/react";
import { RxAvatar } from "react-icons/rx"; // Importing the avatar icon
import { FaGift } from "react-icons/fa";
function Navbar() {
  const { data: session, status } = useSession();

  console.log("session", session);
  const userScore = 120; // Example score, replace with actual logic

  return (
    <nav className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm'>
      <MaxWidthWrapper>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center space-x-2'
            >
              <span className='text-2xl font-bold text-primary'>LearnAI</span>
            </Link>
            <div className='hidden md:flex md:items-center md:space-x-4 ml-8'>
              <Link
                href='/video'
                className='text-sm font-medium text-muted-foreground hover:text-primary'
              >
                Videos
              </Link>
              <Link
                href='/topics'
                className='text-sm font-medium text-muted-foreground hover:text-primary'
              >
                Topics
              </Link>
              <Link
                href='/about'
                className='text-sm font-medium text-muted-foreground hover:text-primary'
              >
                About
              </Link>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <form className='hidden md:block'>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search...'
                  className='w-[200px] pl-8 md:w-[300px]'
                />
              </div>
            </form>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
            >
              <Search className='h-5 w-5' />
              <span className='sr-only'>Search</span>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
            >
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Menu</span>
            </Button>

            {session ? (
              <div className='flex items-center space-x-2 gap-2'>
                <div className='flex items-center gap-2'>
                  <RxAvatar className='w-6 h-6 text-muted-foreground' />
                  <span className='text-sm font-semibold'>
                    {session.user.name}
                  </span>
                </div>
                <div className='flex items-center ml-6 gap-2'>
                  <FaGift className='w-6 h-6 text-muted-foreground' />
                  <span className='text-sm font-semibold '>
                    Rewards: {session.user.rewards}
                  </span>
                </div>
              </div>
            ) : (
              <div className='space-x-4'>
                <Link
                  href='/login'
                  className=''
                >
                  <Button
                    variant='outline'
                    className='hidden md:inline-flex'
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  href='/signup'
                  className=''
                >
                  <Button className='hidden md:inline-flex'>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;

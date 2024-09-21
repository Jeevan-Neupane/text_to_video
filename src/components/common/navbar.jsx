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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

function Navbar() {
  const { data: session, status } = useSession();

  const { toast } = useToast();

  console.log("session", session);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/user");

      console.log("response", response);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("User fetched:", data);
    },
    onError: (error) => {
      console.error("Error fetching user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch videos. Please try again.",
      });
    },
    select: (data) => data.user,
  });
  console.log("user", user);

  return (
    <nav className='sticky top-0 z-50 w-full bg-white bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90 border-b border-border shadow-sm'>
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
                href='/'
                className='text-base font-medium text-muted-foreground hover:text-primary'
              >
                Home
              </Link>
              <Link
                href='/reels'
                className='text-base font-medium text-muted-foreground hover:text-primary flex items-center'
              >
                Watch Reels
              </Link>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
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
                    <p className='text-sm font-semibold '>{user?.role}</p>
                  </span>
                </div>
                <div className='flex items-center ml-6 gap-2'>
                  <FaGift className='w-6 h-6 text-muted-foreground' />
                  <span className='text-sm font-semibold '>
                    Rewards: {user?.rewards || 0}
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

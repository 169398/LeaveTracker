import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/Theme';
import { UserButton, auth } from "@clerk/nextjs";
import { SignUp } from '@clerk/nextjs';
import LeaveForm from '@/components/LeaveForm';



export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;


     

  return (
    <div> <div className="flex justify-end p-4">
    <UserButton afterSignOutUrl='/' />
  </div>

  

  <div className=" absolute   top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
  </div>

  <ModeToggle />

  {isAuth ? (
      <>
      <LeaveForm />
    </>
  ) : (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Link href="/Sign-in">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          SignUp
        </Button>
        <h3>   Welcome to leave tracker</h3>
      </Link>
    </div>
  )}</div>
     
    
  );
}
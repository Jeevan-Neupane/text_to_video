//create a navbar coponent in next.js

import Image from "next/image";

export default function Navbar() {
  return (
    <div className='h-[52px] bg-white border-b border-b-gray-200 shadow-md flex items-center'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center'>
          <Image
            src='/logo.png'
            alt='logo'
            width={100}
            height={100}
          />
          <h1 className='text-2xl font-bold ml-2'>LearnIt</h1>
        </div>
        <div>
          <button className='text-lg'>Login</button>
          <button className='text-lg ml-2'>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

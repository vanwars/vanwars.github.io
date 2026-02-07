'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="h-[55px] bg-[#fffff7] sticky top-0 w-full z-[100] flex justify-center items-center">
      <ul className="flex justify-center items-center p-0 m-0">
        <li className="list-none p-[5px] flex">
          <Link 
            href="/#home" 
            className="p-2 text-[#222] font-medium no-underline outline-none relative after:content-[''] after:h-[3px] after:absolute after:bottom-0 after:left-0 after:w-0 after:bg-orange after:transition-[0.2s] hover:after:w-full focus:after:w-full"
          >
            Home
          </Link>
        </li>
        <li className="list-none p-[5px] flex">
          <Link 
            href="/#teaching" 
            className="p-2 text-[#222] font-medium no-underline outline-none relative after:content-[''] after:h-[3px] after:absolute after:bottom-0 after:left-0 after:w-0 after:bg-orange after:transition-[0.2s] hover:after:w-full focus:after:w-full"
          >
            Teaching
          </Link>
        </li>
        <li className="list-none p-[5px] flex">
          <Link 
            href="/#publications" 
            className="p-2 text-[#222] font-medium no-underline outline-none relative after:content-[''] after:h-[3px] after:absolute after:bottom-0 after:left-0 after:w-0 after:bg-orange after:transition-[0.2s] hover:after:w-full focus:after:w-full"
          >
            Scholarship
          </Link>
        </li>
        <li className="list-none p-[5px] flex">
          <Link 
            href="/#contact" 
            className="p-2 text-[#222] font-medium no-underline outline-none relative after:content-[''] after:h-[3px] after:absolute after:bottom-0 after:left-0 after:w-0 after:bg-orange after:transition-[0.2s] hover:after:w-full focus:after:w-full"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

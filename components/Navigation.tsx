'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { href: '/#teaching', label: 'Teaching' },
  { href: '/#publications', label: 'Scholarship' },
  { href: '/#contact', label: 'Contact' },
] as const;

const linkClassName =
  'p-2 text-[#222] font-medium no-underline outline-none relative after:content-[\'\'] after:h-[3px] after:absolute after:bottom-0 after:left-0 after:w-0 after:bg-orange after:transition-[0.2s] hover:after:w-full focus:after:w-full';

export default function Navigation() {
  return (
    <nav className="h-[55px] bg-[#fffff7] sticky top-0 w-full z-[100] flex justify-center items-center">
      <ul className="flex justify-center items-center p-0 m-0">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href} className="list-none p-[5px] flex">
            <Link href={href} className={linkClassName}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link href="/#home">Home</Link></li>
        <li><Link href="/#teaching">Teaching</Link></li>
        <li><Link href="/#publications">Scholarship</Link></li>
        <li><Link href="/#contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

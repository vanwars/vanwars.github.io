'use client';

import { useEffect } from 'react';

export default function MobileMenu() {
  useEffect(() => {
    const initHamburger = () => {
      const menuToggle = document.querySelector('.menu-toggle');
      if (menuToggle) {
        const parent = menuToggle.parentElement;
        if (parent) {
          parent.onclick = (e) => {
            const nav = document.querySelector('nav');
            if (nav) {
              nav.classList.toggle('mobile');
            }
            e.preventDefault();
          };
        }
      }
    };

    initHamburger();
  }, []);

  return null;
}

interface HeaderProps {
  heading?: string;
}

export default function Header({ heading = "Sarah Van Wart" }: HeaderProps) {
  return (
    <>
      <div className="poppies"></div>
      <header id="home" className="flex justify-center items-end">
        <h1 className="mb-0 text-[3em] max-md:text-[3.5em] mt-10 font-cursive">{heading}</h1>
        <a className="menu-toggle hidden md:hidden" href="#" aria-label="button to toggle navigation menu">
          <i className="fas fa-bars"></i>
        </a>
      </header>
    </>
  );
}

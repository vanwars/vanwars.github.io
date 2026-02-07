interface HeaderProps {
  heading?: string;
}

export default function Header({ heading = "Sarah Van Wart" }: HeaderProps) {
  return (
    <>
      <div className="poppies"></div>
      <header id="home">
        <h1>{heading}</h1>
        <a className="menu-toggle mobile" href="#" aria-label="button to toggle navigation menu">
          <i className="fas fa-bars"></i>
        </a>
      </header>
    </>
  );
}

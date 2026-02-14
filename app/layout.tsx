import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Sarah Van Wart",
  description: "Assistant Professor in the Department of Computer Science at the University of North Carolina Asheville",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Cedarville+Cursive|Delius|Itim|Mali|Sue+Ellen+Francisco|Open+Sans:400,600,700|Open+Sans+Condensed:300|Amatic+SC|Roboto|Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400|Source+Sans+Pro:wght@300;400;600"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
      </head>
      <body>
        <Header />
        <Navigation />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}

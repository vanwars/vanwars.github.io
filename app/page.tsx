import News from "@/components/News";
import Courses from "@/components/Courses";
import Publications from "@/components/Publications";

export default function Home() {
  return (
    <main className="pt-10 min-h-[65vh] max-w-[800px] mx-auto md:max-w-[1000px] md:grid md:items-start md:grid-cols-[220px_auto] md:gap-[60px] md:mx-auto md:max-w-[1000px]">
      <div className="hidden md:block">
        <News />
      </div>
      <div className="md:pl-0 md:max-md:pl-[5vw]">
        <p className="leading-[1.6em] text-[1.0em] mt-0">
          I am an Assistant Professor in the{' '}
          <a href="https://cs.unca.edu/">Department of Computer Science</a> at the
          University of North Carolina Asheville. As an educator, I develop and teach
          courses in human-computer interaction, web development, software engineering,
          introductory programming, and computing and data ethics. As a researcher, I
          design and study educational interventions that aim to broaden participation
          in computing, and help emerging computer scientists recognize and engage with
          the societal and ethical implications of their work. I also build
          computational tools that support civic advocacy and citizen science
          initiatives.
        </p>
        <p className="leading-[1.6em] text-[1.0em] mt-0">
          Prior to joining UNCA, I was an Assistant Professor of Instruction at
          Northwestern University, where I co-directed the TREE Lab with Sepehr Vakil.
          My Ph.D. is from the UC Berkeley{' '}
          <a href="https://www.ischool.berkeley.edu/">School of Information</a>, where I
          was advised by Tapan Parikh, and worked with Kris Gutiérrez, Paul Duguid, and
          Coye Cheshire. Before academia, I worked as a software designer/developer,
          building data and communication systems to support public accountability for
          city and regional development projects.
        </p>

        <h1 id="teaching" className="font-cursive text-[2.5em] text-black m-0 pt-[60px] -mt-[30px]">Teaching & Course Design</h1>
        <Courses />

        <h1 id="publications" className="font-cursive text-[2.5em] text-black m-0 pt-[60px] -mt-[30px]">Scholarship</h1>
        <Publications />

        <h1 id="contact" className="font-cursive text-[2.5em] text-black m-0 pt-[60px] -mt-[30px]">Contact</h1>
        <section className="bg-[url(/images/poppies-bottom-right.png)] bg-[bottom_right] bg-no-repeat bg-[130px_170px] min-h-[200px]">
          <p className="leading-[1.6em] text-[1.0em] mt-0">To contact me, please email me at svanwart@unca.edu.</p>
        </section>
      </div>
    </main>
  );
}

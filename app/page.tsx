import News from "@/components/News";
import Courses from "@/components/Courses";
import Publications from "@/components/Publications";

export default function Home() {
  return (
    <main className="two-column">
      <div className="left">
        <News />
      </div>
      <div className="right">
        <p>
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
        <p>
          Prior to joining UNCA, I was an Assistant Professor of Instruction at
          Northwestern University, where I co-directed the TREE Lab with Sepehr Vakil.
          My Ph.D. is from the UC Berkeley{' '}
          <a href="https://www.ischool.berkeley.edu/">School of Information</a>, where I
          was advised by Tapan Parikh, and worked with Kris Gutiérrez, Paul Duguid, and
          Coye Cheshire. Before academia, I worked as a software designer/developer,
          building data and communication systems to support public accountability for
          city and regional development projects.
        </p>

        <h1 id="teaching">Teaching & Course Design</h1>
        <Courses />

        <h1 id="publications">Scholarship</h1>
        <Publications />

        <h1 id="contact">Contact</h1>
        <section className="contact">
          <p>To contact me, please email me at svanwart@unca.edu.</p>
        </section>
      </div>
    </main>
  );
}

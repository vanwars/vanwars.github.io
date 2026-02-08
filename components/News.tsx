import { readFileSync } from 'fs';
import { join } from 'path';

interface NewsItem {
  title: string;
  date: string;
  description: string;
}

function getNews(): NewsItem[] {
  const filePath = join(process.cwd(), 'data', 'news.json');
  const fileContents = readFileSync(filePath, 'utf8');
  const data: NewsItem[] = JSON.parse(fileContents);
  const maxLength = 10;
  return data.slice(0, maxLength);
}

export default function News() {
  const news = getNews();

  return (
    <section className="news">
        <h1 id="news" className="font-cursive text-[2.5em] max-md:text-[3em] text-black m-0 pt-[60px] -mt-[30px]">News</h1>
        {news.map((item, idx) => (
        <div key={idx} className={idx > 0 ? "mt-6" : ""}>
          <section>
            <h2 className="m-0 text-base font-semibold uppercase text-black font-sans border-b-0">{item.title}</h2>
            <p className="font-semibold text-redpurple text-sm">{item.date}</p>
            <p className="m-0 text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: item.description }} />
          </section>
          {idx < news.length - 1 && <hr className="bg-transparent h-0 border-0 border-b border-[#ccc] mt-4" />}
        </div>
      ))}
    </section>
  );
}

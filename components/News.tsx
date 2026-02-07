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
      <h1 className="m-0 mb-0 text-[0.85em] font-semibold uppercase text-black font-sans border-b-0">News</h1>
      {news.map((item, idx) => (
        <div key={idx}>
          <section className={idx === 0 ? "pt-[5px] pb-[15px]" : "py-5"}>
            <h2 className="m-0 mb-0 text-[0.8em] font-semibold uppercase text-black font-sans border-b-0">{item.title}</h2>
            <p className="text-sm font-semibold text-redpurple my-[5px]">{item.date}</p>
            <p className="text-sm leading-[1.4em] m-0" dangerouslySetInnerHTML={{ __html: item.description }} />
          </section>
          {idx < news.length - 1 && <hr className="bg-transparent h-0 border-0 border-b border-[#ccc]" />}
        </div>
      ))}
    </section>
  );
}

import { readFileSync } from 'fs';
import { join } from 'path';

interface NewsItem {
  title: string;
  date: string;
  description: string;
}

function getNews(): NewsItem[] {
  const filePath = join(process.cwd(), 'public', 'data', 'news.json');
  const fileContents = readFileSync(filePath, 'utf8');
  const data: NewsItem[] = JSON.parse(fileContents);
  const maxLength = 10;
  return data.slice(0, maxLength);
}

export default function News() {
  const news = getNews();

  return (
    <section className="news">
      <h1>News</h1>
      {news.map((item, idx) => (
        <div key={idx}>
          <section style={idx === 0 ? { paddingTop: '5px' } : {}}>
            <h2>{item.title}</h2>
            <p className="date">{item.date}</p>
            <p dangerouslySetInnerHTML={{ __html: item.description }} />
          </section>
          {idx < news.length - 1 && <hr />}
        </div>
      ))}
    </section>
  );
}

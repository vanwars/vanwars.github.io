import { readFileSync } from 'fs';
import { join } from 'path';

interface Publication {
  authors?: string;
  date: string;
  year: string;
  title: string;
  venue?: string;
  volume?: number | string;
  issue?: string;
  pages?: string;
  type: string;
  url?: string;
  doi?: string;
  location?: string;
  chairs?: string;
  symposium_title?: string;
  editors?: string;
  book?: string;
}

function getPublications(): Publication[] {
  const filePath = join(process.cwd(), 'data', 'pubs.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

const getTitle = (item: Publication) => {
  const url = item.url || item.doi;
  return url
    ? `<a href="${url}" target="_blank">${item.title}</a>`
    : item.title;
};

const getVenue = (item: Publication) => {
  let html = item.venue ? `<em>${item.venue}</em>` : '';
  if (item.volume) {
    html += `<em>, ${item.volume}</em>`;
  }
  if (item.issue) {
    html += ` (${item.issue})`;
  }
  if (item.pages) {
    html += `, ${item.pages}`;
  }
  html += '. ';
  return html;
};

const getBook = (item: Publication) => {
  let html = item.editors ? `<em>${item.editors}</em> (Eds.), ${item.book}` : item.book || '';
  if (item.pages) {
    html += ` (${item.pages})`;
  }
  html += '. ';
  return html;
};

const getLocation = (item: Publication) => {
  return item.location ? item.location + '.' : '';
};

const renderPublication = (item: Publication, lastYear: string) => {
  const year = item.year === lastYear ? '' : item.year;
  
  if (item.type === 'symposium') {
    return (
      <li key={`${item.year}-${item.title}`} className="pub-entry">
        <div className="font-semibold max-md:text-lg">{year}</div>
        <div className="citation">
          {item.authors} ({item.date}).{' '}
          <span dangerouslySetInnerHTML={{ __html: getTitle(item) }} />. In{' '}
          {item.chairs}, {item.symposium_title} [Symposium].{' '}
          <span dangerouslySetInnerHTML={{ __html: getVenue(item) }} />{' '}
          {getLocation(item)}
        </div>
      </li>
    );
  }
  
  if (item.type === 'book chapter') {
    return (
      <li key={`${item.year}-${item.title}`} className="pub-entry">
        <div className="font-semibold max-md:text-lg">{year}</div>
        <div className="citation">
          {item.authors} ({item.date}).{' '}
          <span dangerouslySetInnerHTML={{ __html: getTitle(item) }} />. In{' '}
          <span dangerouslySetInnerHTML={{ __html: getBook(item) }} />
        </div>
      </li>
    );
  }
  
  return (
    <li key={`${item.year}-${item.title}`} className="pub-entry">
      <div className="font-semibold">{year}</div>
      <div className="citation">
        {item.authors} ({item.date}).{' '}
        <span dangerouslySetInnerHTML={{ __html: getTitle(item) }} />.{' '}
        <span dangerouslySetInnerHTML={{ __html: getVenue(item) }} />{' '}
        {getLocation(item)}
        {item.doi ? item.doi : ''}
      </div>
    </li>
  );
};

export default function Publications() {
  const publications = getPublications();

  const groupings = {
    'Refereed Journals, Conference Proceedings, & Workshops': [
      'journal', 'conference', 'workshop', 'symposium', 'poster'
    ],
    'Other Publications': ['book chapter', 'magazine', 'dissertation'],
  };

  return (
    <section>
      {Object.entries(groupings).map(([groupName, types]) => {
        const pubs = publications
          .filter((pub) => types.includes(pub.type))
          .sort((a, b) => parseInt(b.year) - parseInt(a.year));
        
        let lastYear = '';
        
        return (
          <div key={groupName} className="mb-10">
            <h2 className="font-condensed text-[1.8em] max-md:text-[2em] text-blue border-b border-blue font-medium pb-[3px] mt-0 mb-[10px]">{groupName}</h2>
            <ul className="m-0 p-0 mb-10">
              {pubs.map((pub) => {
                const rendered = renderPublication(pub, lastYear);
                lastYear = pub.year;
                return rendered;
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

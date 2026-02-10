import { readFileSync } from 'fs';
import { join } from 'path';
import PublicationEntry from './PublicationEntry';

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

const buildCitationHtml = (item: Publication) => {
  const safe = (value?: string) => (value ? value : '');
  const titleHtml = getTitle(item);
  const authorPart = item.authors ? `${item.authors} ` : '';
  const datePart = item.date ? `(${item.date}). ` : '';
  const prefix = `${authorPart}${datePart}`;

  if (item.type === 'symposium') {
    return `${prefix}${titleHtml}. In ${safe(item.chairs)}, ${safe(item.symposium_title)} [Symposium]. ${getVenue(item)} ${getLocation(item)}`;
  }

  if (item.type === 'book chapter') {
    return `${prefix}${titleHtml}. In ${getBook(item)}`;
  }

  return `${prefix}${titleHtml}. ${getVenue(item)} ${getLocation(item)}${item.doi ? item.doi : ''}`;
};

const buildCitationHtmlAlternate = (item: Publication) => {
//   const line1 = item.authors || '';
//   const titlePart = item.url ? `<a href="${item.url}" target="_blank">${item.title}</a>` : item.title;
  
  const venuePart = item.venue ? `${item.venue}` : '';
  const volumePart = item.volume ? ` ${item.volume}` : '';
  const issuePart = item.issue ? ` (${item.issue})` : '';
  const pagesPart = item.pages ? `, ${item.pages}` : '';
  const venueText =  [venuePart, volumePart, issuePart, pagesPart].filter(part => part).join('')
  const url = item.url || item.doi;
  return (
    <div className="mb-7 pr-4">
        {/* Title and year */}
        <div className={`${url ? 'group' : ''} text-base max-md:text-lg grid max-md:grid-cols-1 grid-cols-[1fr_60px] gap-x-2`}>
            {
                url ? 
                <a href={url} className="text-black no-underline leading-5 max-md:leading-7 hover:underline hover:text-redpurple transition-colors duration-200" style={{ textIndent: '0rem' }} target="_blank">
                     {item.title}
                </a> : 
                <span className="text-base max-md:text-lg leading-5 max-md:leading-7" style={{ textIndent: '0rem' }}>{item.title}</span>
            }
            <span className={`max-md:hidden text-base text-right transition-all duration-200 ${url ? 'group-hover:text-redpurple group-hover:pr-4' : ''}`}>{item.year}</span>
        </div>
        {/* Authors and venue */}
        <div className="mt-1 text-base grid grid-cols-[1fr_60px] gap-x-8 max-md:grid-cols-1 text-[0.85rem] max-md:text-lg leading-4 max-md:leading-6" style={{ color: '#777' }}>
            <div>
            { item.authors && <div>{item.authors}</div> }
            {
                venueText && <div>{venueText}</div> 
            }
            </div>
        </div>    
    </div>
  )
};

export default function Publications() {
  const publications = getPublications();

  const groupings = {
    'Peer-Reviewed Publications': [
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
        
        return (
          <div key={groupName} className="mb-10">
            <h2 className="heading2">{groupName}</h2>
            <ul className="m-0 p-0 mb-10">
              {pubs.map((pub) => {
                return (
                  <li key={`${pub.year}-${pub.title}`} className="list-none">
                    {/* <PublicationEntry
                      year={pub.year}
                      title={pub.title}
                      citationHtml={buildCitationHtml(pub)}
                    /> */}
                    { buildCitationHtmlAlternate(pub) }
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

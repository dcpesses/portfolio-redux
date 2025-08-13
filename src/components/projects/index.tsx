import './projects.css';
import thumbChallah from '@/assets/projects/challah-creations.png';
import thumbCW from '@/assets/projects/code-whisperer.svg?inline';
import thumbWheel from '@/assets/projects/game-request-wheel.png';
import thumbFunny from '@/assets/projects/show-us-your-funny.jpg';
import thumbWBD from '@/assets/projects/wbd-screeners.png';


const projects = [
  {
    title: 'WBD Screeners',
    tags: ['React.js', 'Redux', 'Bootstrap', 'TypeScript'],
    image: thumbWBD,
    url: 'https://www.wbdscreeners.com/',
  },
  {
    title: 'Code Whisperer',
    tags: ['React.js', 'Bootstrap', 'TypeScript', 'Web Design'],
    image: thumbCW,
    url: 'https://dcpesses.github.io/code-whisperer/',
  },
  {
    title: 'Challah Creations',
    tags: ['Wordpress', 'Blog', 'Web Design', 'JavaScript'],
    image: thumbChallah,
    url: 'https://www.challahcreations.com/',
  },
  {
    title: 'Show Us Your Funny',
    tags: ['Wordpress', 'Blog', 'Web Design', 'JavaScript'],
    image: thumbFunny,
    url: 'https://www.challahcreations.com/',
  },
  {
    title: 'Game Request Wheel',
    tags: ['React.js', 'Bootstrap', 'TypeScript', 'Web Design'],
    image: thumbWheel,
    url: 'https://asukii314.github.io/twitch-request-wheel/',
  },
];

export default function Projects() {
  return (
    <section className="container py-4 px-3">
      <h2 className="mb-4 fs-3 fw-medium text-body">Recent <span className="fw-semibold text-body-emphasis">Projects</span></h2>
      <div className="d-flex flex-column gap-4">
        {projects.map((project, idx) => (
          <div key={idx} className="d-flex flex-column flex-md-row align-items-center bg-slate-800 rounded p-3 recent-project">
            <div className="flex-shrink-0 me-3">
              <a href={project.url}>
                <img
                  src={project.image}
                  className="img-fluid icon-hover"
                  alt={project.title}
                />
              </a>
            </div>
            <div>
              <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                <a href={project.url} className="hover-text-white" >
                  <div className="fs-5 fw-semibold">{project.title}</div>
                </a>
                <div className="ms-md-3 d-flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className={`badge-tag rounded-pill ${getTagColor(tag)}`}>{tag}</span>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-secondary-emphasis">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum...
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function getTagColor(tag: string) {
  const tagLookup: Record<string, string> = {
    'React.js': 'text-bg-danger',
    'Web design': 'text-bg-success',
    'TypeScript': 'text-bg-warning',
    'Wordpress': 'text-bg-light',
    'Blog': 'text-bg-dark',
    'JavaScript': 'text-bg-info',
    'Bootstrap': 'text-bg-primary',
  };
  return tagLookup[tag] || 'text-bg-secondary';
}

import { projectItems } from './projectsSlice';
import { useAppSelector } from '@/app/hooks';
import { Link } from 'react-router';

import './projects.css';

export default function RecentProjects() {
  const projectsItems = useAppSelector(projectItems);
  const projects = projectsItems.slice(0, 3);
  return (
    <section className="container py-4 px-3">
      <h2 className="mb-4 fs-3 fw-medium text-body">Recent <span className="fw-semibold text-body-emphasis">Projects</span></h2>
      <div className="d-flex flex-column gap-4">
        {projects.map((project, idx) => (
          <div key={idx} className="d-flex flex-column flex-md-row align-items-center align-items-md-start bg-slate-800 rounded p-3 recent-project">
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
                <div className="fs-5 fw-semibold">{project.title}</div>
                <div className="ms--md-3 d-flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className={`badge-tag rounded-pill ${getTagColor(tag)}`}>{tag}</span>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-secondary-emphasis description">
                {project.description}
              </p>
              {project.url && (
                <a href={project.url}>View Site <i className="bi bi-box-arrow-up-right" /></a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-end">
        <Link className="fs-5 fw-semibold" to="/projects">View All</Link>
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

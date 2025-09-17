import {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import ScreenshotCarousel from '@/components/screenshot-carousel';

import { projectItems, projectItemSelected, selectItem } from '@/features/recent-projects/projectsSlice';
import { useAppSelector, useAppDispatch } from '@/app/hooks';

import './projects.css';

function Projects() {

  const projects = useAppSelector(projectItems);
  const selectedProject = useAppSelector(projectItemSelected);

  const dispatch = useAppDispatch();

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(!show);

  const viewProject = (idx: number) => {
    dispatch( selectItem(idx) );
    setShow(true);
  };

  return (
    <div id="page-projects" className="container page">
      <div className="d-flex flex-column flex-md-row gap--4 flex-wrap">
        <Row xs={1} sm={2} md={3} className="g-4">
          {Array.from(projects).map((project, idx) => (
            <Col key={idx}>
              <Card className="shadow-lg">
                <Card.Body className="bg-slate-800" onClick={() => viewProject(idx)}>
                  <img
                    src={project.image}
                    className="img-fluid rounded-2 mb-2"
                    alt={project.title}
                  />
                  <Card.Title className="fw-semibold text-center">{project.title}</Card.Title>
                  <Card.Subtitle className="mt-2 mb-3 text-muted text-center fw-normal fst-italic small">
                    Role: {project.role}
                  </Card.Subtitle>
                  <div className="text-center">
                    <button type="button" className="btn btn-primary" data-testid={`view-info-${idx}`}>More Info</button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal
        id="modal-selected-project"
        size="lg"
        show={show}
        fullscreen="md-down"
        // dialogClassName="modal-90w"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img
              src={selectedProject.image}
              className="img-fluid align-middle"
              alt={selectedProject.title}
            /> <span className="align-middle">
              {selectedProject.title}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start rounded p-3">
            <div>
              {selectedProject.screenshots !== undefined && (
                <div className="screenshots-carousel">
                  <ScreenshotCarousel title={selectedProject.title} screenshots={selectedProject.screenshots} />
                </div>
              )}
              {/* <div className="d-flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="badge-tag rounded-pill bg-secondary">{tag}</span>
                ))}
              </div> */}
              {selectedProject.about !== undefined && (
                <p className="mt-3 small lh-sm text-secondary about">
                  {selectedProject.about}
                </p>
              )}
              <p className="mt-3 text-secondary-emphasis description">
                {selectedProject.description}
              </p>
              <div className="mt-4 text-end">
                {selectedProject.url && (
                  <a className="btn btn-primary"
                    href={selectedProject.url}
                    target="_blank"
                    rel="noreferrer"
                    data-umami-event="projects-outbound-link-click"
                    data-umami-event-value={selectedProject.url}
                  >
                    View Site <i className="bi bi-box-arrow-up-right" />
                  </a>
                )}
                {selectedProject.demo && (
                  <a className="btn btn-primary ms-2"
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    data-umami-event="projects-outbound-link-click"
                    data-umami-event-value={selectedProject.demo}
                  >
                    View Demo <i className="bi bi-box-arrow-up-right" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Projects;

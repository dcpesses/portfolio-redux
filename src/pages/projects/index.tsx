import {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

import { projectItems, projectItemSelected, selectItem } from '@/features/projects/projectsSlice';
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
                  <Card.Subtitle className="mt-2 mb-3 text-muted text-center">
                    Role: {project.role}
                  </Card.Subtitle>
                  {/* <Card.Subtitle className="mt-2 mb-3 text-muted gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={`${idx}tag${i}`} className="badge rounded-pill text-bg-secondary me-1">{tag}</span>
                    ))}
                  </Card.Subtitle>
                  <Card.Text>
                    {project.description}
                  </Card.Text>
                  <div className="text-muted text-end">
                    {project.url ? (
                      <a className="btn btn-primary" href={project.url}>View Site <i className="bi bi-box-arrow-up-right" /></a>
                    ) : null}
                  </div> */}
                  <div className="text-center">
                    <button type="button" className="btn btn-primary" data-testid={`view-info-${idx}`}>View Info</button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {
          // projects.map((project, idx) => (
          //   <div key={idx} className="d-flex col-12 col-md-6 flex-column flex-md-row align-items-center align-items-md-start p-3 recent-project">
          //     <div className="d-flex w-100 bg-slate-800 rounded p-3">
          //       <div className="flex-shrink-0 me-3">
          //         <a href={project.url}>
          //           <img
          //             src={project.image}
          //             className="img-fluid icon-hover"
          //             alt={project.title}
          //           />
          //         </a>
          //       </div>
          //       <div>
          //         <div className="d-flex flex-column flex-md-row align-items-center gap-2">
          //           <div className="fs-5 fw-semibold">{project.title}</div>
          //           <div className="ms--md-3 d-flex flex-wrap gap-2">
          //             {/* {project.tags.map((tag, i) => (
          //               <span key={i} className={`badge-tag rounded-pill ${getTagColor(tag)}`}>{tag}</span>
          //             ))} */}
          //           </div>
          //         </div>
          //         <p className="mt-3 text-secondary-emphasis description">
          //           {project.description}
          //         </p>
          //         {project.url ? (
          //           <a href={project.url}>View Site <i className="bi bi-box-arrow-up-right" /></a>
          //         ) : null}
          //       </div>
          //     </div>
          //   </div>
          // ))
        }
      </div>
      <Modal
        id="modal-selected-project" show={show} fullscreen="md-down" dialogClassName="modal-90w" onHide={handleClose}
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
              {/* {(selectedProject.screenshot) && (
                <div className="text-center">
                  <img
                    src={selectedProject.image}
                    className="img-fluid"
                    alt={selectedProject.title}
                  />
                </div>
              )} */}

              {/* <div className="d-flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="badge-tag rounded-pill bg-secondary">{tag}</span>
                ))}
              </div> */}
              <p className="mt-3 text-secondary-emphasis description">
                {selectedProject.description}
              </p>
              <div className="mt-4 text-end">
                {selectedProject.url && (
                  <a className="btn btn-primary" href={selectedProject.url}>View Site <i className="bi bi-box-arrow-up-right" /></a>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default Projects;

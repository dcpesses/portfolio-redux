import { Link } from 'react-router';

import './not-found.css';

function NotFound() {
  return (
    <div className="not-found">
      <main className="wrapper">
        <h1>404</h1>
        <p>
          Sorry, this page does not exist.
        </p>
        <div>
          <Link className="NotFound-link" to="/">
            ← Go Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;

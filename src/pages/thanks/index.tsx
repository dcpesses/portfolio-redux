import { Link } from 'react-router-dom';

import './thanks.css';

function Thanks() {
  return (
    <div className="page-thanks">
      <main className="wrapper">
        <h1>Success</h1>
        <p>
          Thank you for reaching out!
        </p>
        <div>
          <Link className="thanks-link" to="/">
            ← Go Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Thanks;

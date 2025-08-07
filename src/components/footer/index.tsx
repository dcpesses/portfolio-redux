export default function Footer() {
  return (
    <footer className="container py-4 px-3">
      <div className="border-top border-gray-600 pt-3 text-center small">
        <div>
          <small>
            © 2025 DannyZone.com. All rights reserved.
          </small>
        </div>
        <div className="py-2">
          <small>
            Content on this website is owned by its respective creators
            and is used with permission or under fair use guidelines.
          </small>
        </div>
        <div>
          <small className="smaller opacity-25">
            { window.lastUpdated }
          </small>
        </div>
      </div>
    </footer>
  );
}

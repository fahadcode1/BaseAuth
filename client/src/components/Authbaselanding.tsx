import "./AuthBaseLanding.css";

const FEATURES = [
  {
    title: "Refresh token rotation",
    body: "Every refresh issues a new token and retires the old one, so a copied token stops working the moment it's used.",
  },
  {
    title: "Reuse detection",
    body: "If a retired token is used again, AuthBase treats it as a theft signal and revokes the entire token family.",
  },
  {
    title: "OTP email verification",
    body: "New accounts confirm ownership with a one-time code before they can access anything.",
  },
  {
    title: "Password recovery",
    body: "Forgot, reset, and change-password flows are fully wired, with tokens that expire on their own.",
  },
  {
    title: "Staged email changes",
    body: "Changing an email address holds the new one as pending until it's verified.",
  },
  {
    title: "httpOnly cookie sessions",
    body: "Refresh tokens live in httpOnly cookies. Access tokens stay in memory only, never in localStorage.",
  },
];

const STEPS = [
  {
    title: "Clone the repo",
    body: "Get the AuthBase source and install its dependencies.",
  },
  {
    title: "Set your environment variables",
    body: "Add your database URL, JWT secrets, and mail credentials to a .env file.",
  },
  {
    title: "Mount the auth routes",
    body: "Import the auth router into your Express app and mount it under any path you choose.",
  },
  {
    title: "Connect your frontend",
    body: "Call the auth endpoints from your client and let AuthBase handle tokens and sessions.",
  },
];

export default function AuthBaseLanding() {
  return (
    <div className="ab-page">
      <nav className="ab-nav">
        <span className="ab-logo">AuthBase</span>
        <a
          className="ab-nav-link"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </nav>

      <header className="ab-hero">
        <h1 className="ab-title">AuthBase</h1>
        <p className="ab-description">
          A complete, reusable authentication system for Node and Express
          applications. Token rotation, reuse detection, email verification,
          and password recovery are already built, tested, and ready to drop
          into any project.
        </p>
      </header>

      <section className="ab-section">
        <h2 className="ab-heading">Features</h2>
        <div className="ab-feature-grid">
          {FEATURES.map((f) => (
            <div className="ab-feature-card" key={f.title}>
              <h3 className="ab-feature-title">{f.title}</h3>
              <p className="ab-feature-body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ab-section">
        <h2 className="ab-heading">How to use</h2>
        <ol className="ab-steps">
          {STEPS.map((s, i) => (
            <li className="ab-step" key={s.title}>
              <span className="ab-step-index">{i + 1}</span>
              <div className="ab-step-text">
                <h3 className="ab-step-title">{s.title}</h3>
                <p className="ab-step-body">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="ab-footer">
        <p className="ab-footer-text">AuthBase — authentication, done once.</p>
        <a
          className="ab-footer-link"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
        >
          View the repository
        </a>
      </footer>
    </div>
  );
}
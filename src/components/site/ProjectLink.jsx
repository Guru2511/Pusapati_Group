import { Link } from "@tanstack/react-router";

export default function ProjectLink({ project, className, children }) {
  if (project.slug === "anaya-exclusive-villas") {
    return (
      <a
        href="https://www.brikbuild.in"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to="/work/$project" params={{ project: project.slug }} className={className}>
      {children}
    </Link>
  );
}

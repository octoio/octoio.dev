import { Metadata } from "next";
import AllProjects from "@/components/AllProjects";

export const metadata: Metadata = {
  title: "Projects | octoio",
  description:
    "Explore all my projects including featured work and experiments in game development, web development, and more.",
};

export default function ProjectsPage() {
  return <AllProjects />;
}

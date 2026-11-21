import Welcome from "@/components/Welcome";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PanelSnap from "@/components/PanelSnap";

// The page reads top to bottom as one story: who I am, what I've made and why,
// where I work, what I want next. Sections are plain server components, so the
// anchors (#projects, #experience, #about, #skills, #contact) exist from the
// first paint.
export default function Home() {
  return (
    <main>
      <Welcome />
      <Projects />
      <Experience />
      <About />
      <Contact />
      <Footer />
      <PanelSnap />
    </main>
  );
}

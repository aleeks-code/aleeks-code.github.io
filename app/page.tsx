import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import About from '@/components/About';
import Method from '@/components/Method';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Services />
        <About />
        <Method />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

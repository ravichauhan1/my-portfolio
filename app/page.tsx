import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { GithubActivity } from '@/components/github-activity';
import { Stack } from '@/components/stack';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <GithubActivity />
      <Stack />
      <ExperienceTimeline />
      <Contact />
    </>
  );
}

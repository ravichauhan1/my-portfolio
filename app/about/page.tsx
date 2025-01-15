import { skills } from '@/lib/api';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold mb-4">About Me</h1>
          <div className="prose dark:prose-invert">
            <p className="text-lg text-muted-foreground mb-4">
              I'm a passionate full-stack developer with over 1.5 years of experience building web applications.
              I specialize in React.js, Next.js, Express.js, Node.js, and TypeScript, with a strong focus on creating performant and
              scalable solutions.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              When I'm not coding, you can find me contributing to open-source projects, writing technical
              blog posts, or exploring new technologies.
            </p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/image2.png"
            alt="Profile"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="relative h-2 rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
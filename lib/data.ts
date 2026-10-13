export const profile = {
  name: 'Ravikishan Chauhan',
  shortName: 'Ravi',
  role: 'Software Engineer',
  experience: '2.5+ years',
  location: 'New Delhi, India',
  email: 'ravixc1@gmail.com',
  phone: '+91 885 8902 274',
  githubUsername: 'ravichauhan1',
  photo: '/ravi.jpg',
  tagline:
    'I design, build and ship web products end to end: the React interface, the Node.js services behind it, the PostgreSQL schema underneath, and the Docker containers that carry it to the cloud.',
  about: [
    'I’m a software engineer based in New Delhi. For the past two and a half years I’ve been building web products end to end: the interface people click on, the APIs behind it, the database underneath, and the pipeline that takes it to production.',
    'Most of my work is in TypeScript. React and Next.js on the front, Node.js and Express on the back, with PostgreSQL or MongoDB depending on the shape of the data. I package services with Docker and deploy them to the cloud, and I would rather spend an extra hour on a clean schema than a week untangling a messy one.',
    'I’ve also built AI into the software I work on: integrating AI models into products, and using embeddings and vector databases so they can search and answer from a product’s own data. Getting a demo to work is quick. Most of the effort goes into making the output reliable, fast and affordable enough to ship.',
    'I also share what I learn on my YouTube channel, Code with Ravi. I’m open to software engineering roles and to freelance projects.',
  ],
};

export const nav = [
  { href: '#about', label: 'about' },
  { href: '#stack', label: 'stack' },
  { href: '#contact', label: 'contact' },
];

export type SocialKey = 'github' | 'linkedin' | 'youtube' | 'email';

export const socials: { key: SocialKey; label: string; handle: string; href: string }[] = [
  { key: 'github', label: 'GitHub', handle: 'ravichauhan1', href: 'https://github.com/ravichauhan1' },
  { key: 'linkedin', label: 'LinkedIn', handle: 'in/ravichauhan1', href: 'https://www.linkedin.com/in/ravichauhan1' },
  { key: 'youtube', label: 'YouTube', handle: '@codewithravi_js', href: 'https://www.youtube.com/@codewithravi_js' },
  { key: 'email', label: 'Email', handle: 'ravixc1@gmail.com', href: 'mailto:ravixc1@gmail.com' },
];

export const facts = [
  { label: 'Experience', value: '2.5+ years in production' },
  { label: 'Based in', value: 'New Delhi, India (IST)' },
  { label: 'I build', value: 'Web apps, APIs and AI features' },
  { label: 'Right now', value: 'Open to engineering roles' },
];

export const stack = [
  {
    layer: 'Frontend',
    summary: 'Fast, accessible interfaces with typed components, and server rendering where it earns its place.',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    layer: 'Backend',
    summary: 'APIs that validate their input, handle auth properly and fail with errors you can act on.',
    items: ['Node.js', 'Express', 'REST APIs', 'Authentication'],
  },
  {
    layer: 'Databases',
    summary: 'Schemas and queries designed around how the data is read, in relational and document stores.',
    items: ['PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    layer: 'Cloud & DevOps',
    summary: 'Containerised services, automated builds and deployments that are boring in the good way.',
    items: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Vercel', 'Git'],
  },
  {
    layer: 'AI',
    summary: 'AI models integrated into real software, with vector search over a product’s own data, built to hold up in production.',
    items: ['LLM APIs', 'AI model integration', 'Vector databases', 'Embeddings', 'RAG', 'Prompt design'],
  },
];

export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
}

// Add real roles here; the Experience section only renders when this has entries.
export const experience: Experience[] = [];

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  repoUrl: string;
  technologies: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
}

// Mock data
export const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform built with Next.js and Stripe',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
  },
  {
    id: 3,
    title: 'AI Image Generator',
    description: 'An AI-powered image generation tool using stable diffusion',
    image: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?q=80&w=1000&auto=format&fit=crop',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'React'],
  },
  {
    id: 4,
    title: 'Social Media Dashboard',
    description: 'A comprehensive dashboard for social media analytics',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    technologies: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL'],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js 13',
    excerpt: 'Learn how to build modern web applications with Next.js 13 and its new app directory.',
    date: '2024-03-15',
    readTime: '5 min read',
    slug: 'getting-started-with-nextjs-13',
  },
  {
    id: 2,
    title: 'The Power of TypeScript',
    excerpt: 'Discover how TypeScript can improve your development workflow and catch errors early.',
    date: '2024-03-10',
    readTime: '7 min read',
    slug: 'the-power-of-typescript',
  },
];


export const skills: Skill[] = [
  {
    id: 1,
    name: 'React.js',
    category: 'Frontend',
    level: 95,
  },
  {
    id: 2,
    name: 'Next.js',
    category: 'Frontend',
    level: 90,
  },
  {
    id: 3,
    name: 'Express.js',
    category: 'Backend',
    level: 90,
  },
  {
    id: 4,
    name: 'Node.js',
    category: 'Backend',
    level: 85,
  },
  {
    id: 5,
    name: 'TypeScript',
    category: 'Languages',
    level: 88,
  },
];

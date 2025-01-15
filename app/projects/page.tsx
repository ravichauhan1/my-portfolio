import { projects } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Link href={project.demoUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Button>
              </Link>
              <Link href={project.repoUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  Source Code
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
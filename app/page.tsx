import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hi, I'm Ravi
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                A passionate full-stack developer specializing in building exceptional digital experiences.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/contact">
                <Button className="w-full min-[400px]:w-auto">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="w-full min-[400px]:w-auto">
                  About Me
                </Button>
              </Link>
            </div>
            <div className="flex gap-2">
              <Link href="https://github.com/ravichauhan1" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/ravixc1" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://www.youtube.com/@codewithravi_js" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon">
                  <Youtube className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:ravixc1@gmail.com">
                <Button variant="ghost" size="icon">
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Hero"
              className="aspect-square overflow-hidden rounded-full object-cover"
              height={400}
              src="/image2.png"
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProjectsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Coming Soon</h1>
      <div className="grid gap-6 md:grid-cols-1">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Commit Soon</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">In Progress</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              Check Back Later
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

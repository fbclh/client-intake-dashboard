import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Client intake dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Capture structured leads, qualify them with clear criteria, and keep
          your pipeline organized in one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submit intake</CardTitle>
            <CardDescription>
              Multi-step form for prospects to tell you what they need.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/intake">Start intake</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Review leads</CardTitle>
            <CardDescription>
              Dashboard for statuses, filters, and follow-up.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

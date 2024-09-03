"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createCompletion } from "@/app/ServerActions";

export default function Form() {
  const action = async (formData) => {
    const prompt = formData.get("prompt");
    const { error } = await createCompletion(prompt);
    if (error) {
      toast.error(error);
    }
  };
  return (
    <section className="mx-auto max-w-lg">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <CardTitle>AI Blogger</CardTitle>
          <CardDescription>
            Generate blog post with image about anything
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <Input
              name="prompt"
              placeholder="What should I write about?"
              className="rounded-lg"
            />
            <Button size="sm" type="submit" className="mt-3 w-full rounded-lg">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

"use server";
import OpenAI from "openai";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY_NEW });

export const createCompletion = async (prompt) => {
  if (!prompt) {
    return { error: "prompt is required" };
  }

  // generate blog post using open ai

  const messages = [
    {
      role: "user",
      content: `Write a blog post around 200 words about the following topic: ${prompt}`,
    },
  ];
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
  });

  const content = completion?.choices?.[0]?.message?.content;
  if (!content) {
    return { error: "Unable to generate blog content" };
  }

  // generate image using open ai

  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Generate an image for a blog post about: ${prompt}`,
    n: 1,
    size: "1792x1024",
    response_format: "b64_json",
  });
  const imageName = `blog-${Date.now()}`;
  const imageData = image?.data?.[0]?.b64_json;
  if (!imageData) {
    return { error: "Unable to generate blog image" };
  }

  //upload image to supabase

  const { data, error } = await supabase.storage
    .from("blogs")
    .upload(imageName, decode(imageData), {
      contentType: "image/png",
    });
  if (error) {
    return { error: "Unable to upload the blog image to storage" };
  }
  const path = data?.path;
  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/blogs/${path}`; //actural url where the image is stored in db

  // create a new blog post in supabase from the information that is returned from open ai
  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .insert([{ title, prompt, content, imageUrl, userId }]);
  if (blogError) {
    return { error: "Unable to upload the blog to database" };
  }
  console.log(blog);
};

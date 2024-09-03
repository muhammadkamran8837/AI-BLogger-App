import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getBlogById(id) {
  const { data, error } = await supabase
    .from("blogs")
    .select()
    .eq("id", id)
    .single();
  return data;
}
export async function getAllBlogs() {
  const { data, error } = await supabase
    .from("blogs")
    .select()
    .order("created_at", { ascending: false });
  return data;
}

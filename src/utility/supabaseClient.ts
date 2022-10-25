import { createClient } from "@pankod/refine-supabase";

const SUPABASE_URL = "https://opuqcfkadzuitwfpengj.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdXFjZmthZHp1aXR3ZnBlbmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMwNjYxNjIsImV4cCI6MTk3ODY0MjE2Mn0.ERx1d1ANtvXyWDuDIePZPVTzYq0i_HISHAyxIw15xkk";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

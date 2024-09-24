import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);


// Article interface
export interface Article {
    id: string; // UUID is a string
    created_at: string;
    Title: string;
    slug: string;
    rich_content: string;
    excerpt: string;
    author: string | null;
    published_on: string;
    updated_on: string;
    is_published: boolean;
    category: string;
    meta_title: string | null;
    meta_description: string | null;
    keywords: string[] | null;
    image: string | null;
    og_image_url: string | null;
    is_featured: boolean;
    sources: string[] | null;
}

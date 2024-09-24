
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Service Role Key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;


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


// Fetch all articles (PLURAL)
export async function fetchArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*');
  
    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  
    console.log('Fetched articles:', data); // Log the fetched data
    return data as Article[];
}


// Fetch article by id
export async function fetchArticle(id: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
  
    if (error || !data) {
      console.error('Error fetching article:', error);
      throw new Error('Failed to fetch article');
    }
  
    return data as Article;
}  


// Create a new article with placeholder values
export async function createArticle(): Promise<Article> {
  const placeholderArticle: Omit<Article, 'id' | 'created_at'> = {
    Title: 'Placeholder Title',
    slug: 'placeholder-title',
    rich_content: 'This is a placeholder for the article content.',
    excerpt: 'This is a placeholder excerpt.',
    author: 'John Doe',
    published_on: new Date().toISOString(),
    updated_on: new Date().toISOString(),
    is_published: false,
    category: 'Uncategorized',
    meta_title: null,
    meta_description: null,
    keywords: null,
    image: null,
    og_image_url: null,
    is_featured: false,
    sources: null,
  };

  const { data, error } = await supabase
    .from('articles')
    .insert(placeholderArticle)
    .select()
    .single();

  if (error) {
    console.error('Error creating article:', error);
    throw new Error('Failed to create article');
  }

  return data as Article;
}

// Update an existing article
export async function updateArticle(id: string, updatedFields: Partial<Article>): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating article:', error);
    throw new Error('Failed to update article');
  }

  return data as Article;
}


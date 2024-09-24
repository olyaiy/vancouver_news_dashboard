'use server'

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase-client";
import { redirect } from "next/navigation";

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
    // 'use server'

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
    // 'use server'

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
    'use server'

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

  revalidatePath('/', 'layout');
  return data as Article;
}

// Update an existing article
export async function updateArticle(id: string, updatedFields: Partial<Article>): Promise<{ success: boolean; message: string; article?: Article }> {
//   'use server'

  try {
    const { data, error } = await supabase
      .from('articles')
      .update(updatedFields)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    revalidatePath('/', 'layout');


    return {
      success: true,
      message: 'Article updated successfully',
      article: data as Article
    };
  } catch (error) {
    console.error('Error updating article:', error);
    return {
      success: false,
      message: 'Failed to update article'
    };
  }
}


// Delete an article by id
export async function deleteArticle(id: string): Promise<{ success: boolean; message: string }> {
  'use server'

  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    revalidatePath('/', 'layout');

    return {
      success: true,
      message: 'Article deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting article:', error);
    return {
      success: false,
      message: 'Failed to delete article'
    };
  } finally {
    redirect('/dashboard');
  }
}


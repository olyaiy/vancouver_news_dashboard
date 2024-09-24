import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Article } from '@/types/types';
import { deleteArticle } from '@/lib/supabase';
import { useState } from 'react';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteArticle(article.id);
    setIsDeleting(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <Link href={`/editor/${article.id}`} className="flex-grow hover:opacity-80 transition-opacity">
        <CardHeader>
          <CardTitle className="line-clamp-2">{article.Title}</CardTitle>
          <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{new Date(article.published_on).toLocaleDateString()}</span>
            <span>{article.category}</span>
          </div>
        </CardHeader>
      </Link>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" 
            // className="w-full" 
            disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the article.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
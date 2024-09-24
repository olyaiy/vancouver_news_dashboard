import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
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
    await deleteArticle(article.id);
    setIsDeleting(false);
  };

  return (
    <Card className="aspect-square flex flex-col overflow-hidden">
      <Link href={`/editor/${article.id}`} className="flex-grow hover:opacity-90 transition-opacity">
        <div className="relative w-full h-1/2">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.Title}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center text-secondary-foreground">
              No Image
            </div>
          )}
        </div>
        <div className="p-4 h-1/2 flex flex-col">
          <CardTitle className="line-clamp-2 text-lg mb-2">{article.Title}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm flex-grow">{article.excerpt}</CardDescription>
          <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
            <span>{new Date(article.published_on).toLocaleDateString()}</span>
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
              {article.category}
            </span>
          </div>
        </div>
      </Link>
      <CardFooter className="p-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="w-full" disabled={isDeleting}>
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
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Article } from '@/lib/supabase';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/editor/${article.id}`} className="block hover:opacity-80 transition-opacity">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="line-clamp-2">{article.Title}</CardTitle>
          <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{new Date(article.published_on).toLocaleDateString()}</span>
            <span>{article.category}</span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
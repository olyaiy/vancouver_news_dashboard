'use client'
import { useState } from 'react';
import { ArticleCard } from './article-card';
import { Button } from "@/components/ui/button";
import { Article } from '@/types/types';

interface PaginatedArticleListProps {
  articles: Article[];
  articlesPerPage: number;
}

export function PaginatedArticleList({ articles, articlesPerPage }: PaginatedArticleListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {currentArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPage ? "default" : "outline"}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </div>
    </div>
  );
}
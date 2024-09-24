'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import MainEditor from '@/components/main-editor'
import SidebarEditor from '@/components/sidebar-editor'
import { Article } from '@/types/types'
import { useToast } from '@/hooks/use-toast'
import { updateArticle } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const ArticleEditor = ({ articleData, articleId }: { articleData: Article, articleId: string }) => {
  const [article, setArticle] = useState<Article>(articleData);
  const { toast } = useToast()
  const router = useRouter();


  const handleUpdateArticle = async () => {
    const result = await updateArticle(articleId, article);
    if (result.success) {

      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });

    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex gap-6">
      <MainEditor article={article} setArticle={setArticle} />
      <SidebarEditor article={article} setArticle={setArticle} />
      <Button onClick={handleUpdateArticle} className="fixed w-52 h-12 bottom-6 right-6 z-10">
        Update Article
      </Button>
    </div>
  )
}

export default ArticleEditor
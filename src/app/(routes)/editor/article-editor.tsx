'use client'
import { Article } from '@/lib/supabase'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import MainEditor from '@/components/main-editor'
import SidebarEditor from '@/components/sidebar-editor'



const ArticleEditor = ({ articleData }: { articleData: Article }) => {
  const [article, setArticle] = useState<Article>(articleData);

  const handleSave = () => {
    console.log(article);
    // Implement save logic here
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex gap-6">
      <MainEditor article={article} setArticle={setArticle} />
      <SidebarEditor article={article} setArticle={setArticle} />
      <Button onClick={handleSave} className="fixed w-52 h-12  bottom-6 right-6 z-10">Save Changes</Button>
    </div>
  )
}

export default ArticleEditor
'use client'
import { Article } from '@/lib/supabase'
import React, { useState } from 'react'

const ArticleEditor = ({article}:{article: Article}) => {
    const [article, setArticle] = useState(article);
  return (
    <div>
      
    </div>
  )
}

export default ArticleEditor

import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { Article } from '@/types/types'

interface MainEditorProps {
  article: Article;
  setArticle: React.Dispatch<React.SetStateAction<Article>>;
}

const MainEditor: React.FC<MainEditorProps> = ({ article, setArticle }) => {
  const handleChange = (field: keyof Article, value: any) => {
    if (field === 'slug') {
      value = value.replace(/\s+/g, '-').toLowerCase();
    }
    setArticle(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-2/3 space-y-6">
      {article.image && (
        <div className="relative w-full h-64">
          <Image
            src={article.image}
            alt={article.Title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={article.Title}
          onChange={(e) => handleChange('Title', e.target.value)}
          placeholder="Article Title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={article.excerpt}
          onChange={(e) => handleChange('excerpt', e.target.value)}
          placeholder="Excerpt"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="published-on">Publish Date</Label>
          <Input
            id="published-on"
            type="date"
            value={article.published_on.split('T')[0]}
            onChange={(e) => handleChange('published_on', e.target.value)}
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={article.category}
            onChange={(e) => handleChange('category', e.target.value)}
            placeholder="Category"
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={article.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            placeholder="Slug"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rich-content">Content</Label>
        <Textarea
          id="rich-content"
          value={article.rich_content}
          onChange={(e) => handleChange('rich_content', e.target.value)}
          placeholder="Rich Content"
          rows={15}
        />
      </div>
    </div>
  )
}

export default MainEditor
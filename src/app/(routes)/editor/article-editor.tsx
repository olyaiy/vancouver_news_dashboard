'use client'
import { Article } from '@/lib/supabase'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const ArticleEditor = ({ articleData }: { articleData: Article }) => {
  const [article, setArticle] = useState<Article>(articleData);

  const handleChange = (field: keyof Article, value: any) => {
    setArticle(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
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

      <Input
        value={article.Title}
        onChange={(e) => handleChange('Title', e.target.value)}
        placeholder="Article Title"
      />

      <Input
        value={article.slug}
        onChange={(e) => handleChange('slug', e.target.value)}
        placeholder="Slug"
      />

      <Textarea
        value={article.rich_content}
        onChange={(e) => handleChange('rich_content', e.target.value)}
        placeholder="Rich Content"
        rows={10}
      />

      <Textarea
        value={article.excerpt}
        onChange={(e) => handleChange('excerpt', e.target.value)}
        placeholder="Excerpt"
        rows={3}
      />

      <Input
        value={article.author || ''}
        onChange={(e) => handleChange('author', e.target.value)}
        placeholder="Author"
      />

      <Input
        type="date"
        value={article.published_on.split('T')[0]}
        onChange={(e) => handleChange('published_on', e.target.value)}
      />

      <div className="flex items-center space-x-2">
        <Switch
          checked={article.is_published}
          onCheckedChange={(checked) => handleChange('is_published', checked)}
        />
        <Label htmlFor="is-published">Published</Label>
      </div>

      <Input
        value={article.category}
        onChange={(e) => handleChange('category', e.target.value)}
        placeholder="Category"
      />

      <Input
        value={article.meta_title || ''}
        onChange={(e) => handleChange('meta_title', e.target.value)}
        placeholder="Meta Title"
      />

      <Textarea
        value={article.meta_description || ''}
        onChange={(e) => handleChange('meta_description', e.target.value)}
        placeholder="Meta Description"
        rows={2}
      />

      <Input
        value={article.keywords?.join(', ') || ''}
        onChange={(e) => handleChange('keywords', e.target.value.split(', '))}
        placeholder="Keywords (comma-separated)"
      />

      <Input
        value={article.image || ''}
        onChange={(e) => handleChange('image', e.target.value)}
        placeholder="Image URL"
      />

      <Input
        value={article.og_image_url || ''}
        onChange={(e) => handleChange('og_image_url', e.target.value)}
        placeholder="OG Image URL"
      />

      <div className="flex items-center space-x-2">
        <Switch
          checked={article.is_featured}
          onCheckedChange={(checked) => handleChange('is_featured', checked)}
        />
        <Label htmlFor="is-featured">Featured</Label>
      </div>

      <Textarea
        value={article.sources?.join('\n') || ''}
        onChange={(e) => handleChange('sources', e.target.value.split('\n'))}
        placeholder="Sources (one per line)"
        rows={3}
      />

      <Button onClick={() => console.log(article)}>Save Changes</Button>
    </div>
  )
}

export default ArticleEditor
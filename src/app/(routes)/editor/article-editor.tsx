'use client'
import { Article } from '@/lib/supabase'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { SourcesEditor } from '@/components/source-editor'

const ArticleEditor = ({ articleData }: { articleData: Article }) => {
  const [article, setArticle] = useState<Article>(articleData);

  const handleChange = (field: keyof Article, value: any) => {
    if (field === 'slug') {
      // Remove spaces and replace with dashes, also convert to lowercase
      value = value.replace(/\s+/g, '-').toLowerCase();
    }
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
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={article.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
          placeholder="Slug"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rich-content">Content</Label>
        <Textarea
          id="rich-content"
          value={article.rich_content}
          onChange={(e) => handleChange('rich_content', e.target.value)}
          placeholder="Rich Content"
          rows={10}
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

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={article.author || ''}
          onChange={(e) => handleChange('author', e.target.value)}
          placeholder="Author"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="published-on">Publish Date</Label>
        <Input
          id="published-on"
          type="date"
          value={article.published_on.split('T')[0]}
          onChange={(e) => handleChange('published_on', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is-published"
          checked={article.is_published}
          onCheckedChange={(checked) => handleChange('is_published', checked)}
        />
        <Label htmlFor="is-published">Published</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={article.category}
          onChange={(e) => handleChange('category', e.target.value)}
          placeholder="Category"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={article.image || ''}
          onChange={(e) => handleChange('image', e.target.value)}
          placeholder="Image URL"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is-featured"
          checked={article.is_featured}
          onCheckedChange={(checked) => handleChange('is_featured', checked)}
        />
        <Label htmlFor="is-featured">Featured</Label>
      </div>

      
      <SourcesEditor article={article} setArticle={setArticle} />


      <Button onClick={() => console.log(article)}>Save Changes</Button>
    </div>
  )
}

export default ArticleEditor
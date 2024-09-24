import React from 'react'
import { Article } from '@/lib/supabase'
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SourcesEditor } from '@/components/source-editor'

interface SidebarEditorProps {
  article: Article;
  setArticle: React.Dispatch<React.SetStateAction<Article>>;
}

const SidebarEditor: React.FC<SidebarEditorProps> = ({ article, setArticle }) => {
  const handleChange = (field: keyof Article, value: any) => {
    setArticle(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-1/3 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="is-published"
            checked={article.is_published}
            onCheckedChange={(checked) => handleChange('is_published', checked)}
          />
          <Label htmlFor="is-published">Published</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is-featured"
            checked={article.is_featured}
            onCheckedChange={(checked) => handleChange('is_featured', checked)}
          />
          <Label htmlFor="is-featured">Featured</Label>
        </div>
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
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={article.image || ''}
          onChange={(e) => handleChange('image', e.target.value)}
          placeholder="Image URL"
        />
      </div>

      <SourcesEditor article={article} setArticle={setArticle} />
    </div>
  )
}

export default SidebarEditor
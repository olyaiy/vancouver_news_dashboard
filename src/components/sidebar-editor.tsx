import React from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SourcesEditor } from '@/components/source-editor'
import { Article } from '@/types/types'
import { deleteArticle } from '@/lib/supabase'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SidebarEditorProps {
  article: Article;
  setArticle: React.Dispatch<React.SetStateAction<Article>>;
}

const SidebarEditor: React.FC<SidebarEditorProps> = ({ article, setArticle }) => {
  const router = useRouter()

  const handleChange = (field: keyof Article, value: any) => {
    setArticle(prev => ({ ...prev, [field]: value }));
  };

  const handleDelete = async () => {
    const result = await deleteArticle(article.id);
    if (result.success) {
      router.push('/articles') // Redirect to articles list
    } else {
      // Handle error (e.g., show an error message)
      console.error(result.message)
    }
  }

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

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full">Delete Article</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Yes, delete article
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default SidebarEditor
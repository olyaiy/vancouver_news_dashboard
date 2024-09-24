import React, { useState, KeyboardEvent } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from 'lucide-react'
import { Article } from '@/types/types'

interface SourcesEditorProps {
  article: Article;
  setArticle: React.Dispatch<React.SetStateAction<Article>>;
}

export function SourcesEditor({ article, setArticle }: SourcesEditorProps) {
  const [newSource, setNewSource] = useState('')

  const addSource = () => {
    if (newSource && (!article.sources || article.sources.length < 5)) {
      setArticle(prev => ({
        ...prev,
        sources: [...(prev.sources || []), newSource]
      }));
      setNewSource('');
    }
  };

  const removeSource = (index: number) => {
    setArticle(prev => ({
      ...prev,
      sources: prev.sources?.filter((_, i) => i !== index) || null
    }));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSource();
    }
  };

  const sources = article.sources || [];

  return (
    <div className="space-y-2">
      <Label htmlFor="sources">Sources</Label>
      {sources.map((source, index) => (
        <Card key={index} className="mb-2">
          <CardContent className="flex items-center justify-between p-4">
            <span>{source}</span>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeSource(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
      {sources.length < 5 && (
        <div className="flex items-center space-x-2">
          <Input
            value={newSource}
            onChange={(e) => setNewSource(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter new source"
          />
          <Button
            variant="outline"
            onClick={addSource}
            disabled={!newSource}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      )}
    </div>
  )
}
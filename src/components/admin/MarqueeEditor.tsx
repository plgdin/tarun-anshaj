import { useState, useEffect } from 'react';
import { Save, ArrowUp, ArrowDown, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCms } from '@/context/CmsContext';
import type { HeroContent } from '@/types/cms';
import { toast } from 'sonner';

const MarqueeEditor = () => {
  const { data, updateHeroContent } = useCms();
  const [form, setForm] = useState<HeroContent>({
    ...data.heroContent,
    marqueeRow1: data.heroContent.marqueeRow1 || [],
    marqueeRow2: data.heroContent.marqueeRow2 || [],
  });
  const [newUrl1, setNewUrl1] = useState('');
  const [newUrl2, setNewUrl2] = useState('');

  useEffect(() => {
    setForm({
      ...data.heroContent,
      marqueeRow1: data.heroContent.marqueeRow1 || [],
      marqueeRow2: data.heroContent.marqueeRow2 || [],
    });
  }, [data.heroContent]);

  const handleAddUrl = (row: 1 | 2) => {
    const url = row === 1 ? newUrl1 : newUrl2;
    if (!url.trim()) return;

    const currentUrls = form[row === 1 ? 'marqueeRow1' : 'marqueeRow2'] || [];
    if (currentUrls.includes(url.trim())) {
      toast.error('This URL is already added to the row');
      return;
    }

    setForm((prev) => ({
      ...prev,
      [row === 1 ? 'marqueeRow1' : 'marqueeRow2']: [
        ...currentUrls,
        url.trim(),
      ],
    }));

    if (row === 1) setNewUrl1('');
    else setNewUrl2('');
  };

  const handleRemoveUrl = (row: 1 | 2, index: number) => {
    setForm((prev) => {
      const field = row === 1 ? 'marqueeRow1' : 'marqueeRow2';
      const newUrls = [...(prev[field] || [])];
      newUrls.splice(index, 1);
      return { ...prev, [field]: newUrls };
    });
  };

  const handleMoveUrl = (row: 1 | 2, index: number, direction: 'up' | 'down') => {
    setForm((prev) => {
      const field = row === 1 ? 'marqueeRow1' : 'marqueeRow2';
      const newUrls = [...(prev[field] || [])];
      if (direction === 'up' && index > 0) {
        [newUrls[index - 1], newUrls[index]] = [newUrls[index], newUrls[index - 1]];
      } else if (direction === 'down' && index < newUrls.length - 1) {
        [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
      }
      return { ...prev, [field]: newUrls };
    });
  };

  const handleUpdateUrl = (row: 1 | 2, index: number, value: string) => {
    setForm((prev) => {
      const field = row === 1 ? 'marqueeRow1' : 'marqueeRow2';
      const newUrls = [...(prev[field] || [])];
      newUrls[index] = value;
      return { ...prev, [field]: newUrls };
    });
  }

  const handleSave = () => {
    updateHeroContent(form);
    toast.success('Marquee section updated');
  };

  const hasChanges = JSON.stringify(form) !== JSON.stringify(data.heroContent);

  const renderRowEditor = (row: 1 | 2, urls: string[], newUrl: string, setNewUrl: (v: string) => void) => (
    <div className="w-full max-w-3xl pt-6">
      <h3 className="text-sm font-semibold text-foreground mb-3">Marquee Row {row}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Manage the image/video URLs for the {row === 1 ? 'first' : 'second'} layer of the scrolling marquee.
      </p>

      <div className="space-y-3 mb-4">
        {urls.map((url, idx) => (
          <div key={`${row}-${idx}`} className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md border border-border">
            <div className="flex-1 min-w-0 flex items-center gap-2">
               {(() => {
                 const matchedVideo = data.videos.find(v => v.thumbnail === url);
                 return matchedVideo ? (
                   <span className="text-xs font-medium text-muted-foreground whitespace-nowrap shrink-0">
                     [{matchedVideo.title}]
                   </span>
                 ) : null;
               })()}
               <Input
                 value={url}
                 onChange={(e) => handleUpdateUrl(row, idx, e.target.value)}
                 className="h-8 text-sm"
                 placeholder="https://..."
               />
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => handleMoveUrl(row, idx, 'up')}
                disabled={idx === 0}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => handleMoveUrl(row, idx, 'down')}
                disabled={idx === urls.length - 1}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                onClick={() => handleRemoveUrl(row, idx)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {urls.length === 0 && (
          <p className="text-sm text-muted-foreground italic py-2">No URLs added yet.</p>
        )}
      </div>

      <div className="flex gap-2 mb-3">
        <Input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Paste new image or video URL here..."
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleAddUrl(row)}
        />
        <Button onClick={() => handleAddUrl(row)} variant="secondary" className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Add URL
        </Button>
      </div>

      <div>
        <Select key={urls.join(',')} onValueChange={(val) => {
          if (val) {
            const video = data.videos.find(v => v.id === val);
            if (video && video.thumbnail) {
              const currentUrls = form[row === 1 ? 'marqueeRow1' : 'marqueeRow2'] || [];
              if (currentUrls.includes(video.thumbnail)) {
                toast.error('This video is already added to the row');
                return;
              }
              setForm((prev) => ({
                ...prev,
                [row === 1 ? 'marqueeRow1' : 'marqueeRow2']: [
                  ...currentUrls,
                  video.thumbnail,
                ],
              }));
              toast.success(`Added thumbnail for ${video.title}`);
            } else if (video) {
              toast.error('This video has no thumbnail');
            }
          }
        }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Or select an existing video to add its thumbnail..." />
          </SelectTrigger>
          <SelectContent>
            {data.videos
              .filter(v => v.thumbnail && !urls.includes(v.thumbnail))
              .map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-primary">Marquee Section</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize the scrolling images below the hero section
          </p>
        </div>
        <Button onClick={handleSave} disabled={!hasChanges} className="gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 items-start">
        {renderRowEditor(1, form.marqueeRow1 || [], newUrl1, setNewUrl1)}
        <div className="w-full h-px bg-border max-w-3xl" />
        {renderRowEditor(2, form.marqueeRow2 || [], newUrl2, setNewUrl2)}
      </div>
    </div>
  );
};

export default MarqueeEditor;

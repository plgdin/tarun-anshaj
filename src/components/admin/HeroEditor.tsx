import { useState, useEffect } from 'react';
import { Save, ArrowUp, ArrowDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCms } from '@/context/CmsContext';
import type { HeroContent } from '@/types/cms';
import { toast } from 'sonner';

const HeroEditor = () => {
  const { data, updateHeroContent } = useCms();
  const [form, setForm] = useState<HeroContent>({
    ...data.heroContent,
    slideshowVideos: data.heroContent.slideshowVideos || []
  });

  useEffect(() => {
    setForm({
      ...data.heroContent,
      slideshowVideos: data.heroContent.slideshowVideos || []
    });
  }, [data.heroContent]);

  const updateField = (field: keyof HeroContent, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSlideshowVideo = (videoId: string) => {
    if (!videoId) return;
    setForm((prev) => ({
      ...prev,
      slideshowVideos: [...(prev.slideshowVideos || []), videoId]
    }));
  };

  const handleRemoveSlideshowVideo = (index: number) => {
    setForm((prev) => {
      const newVideos = [...(prev.slideshowVideos || [])];
      newVideos.splice(index, 1);
      return { ...prev, slideshowVideos: newVideos };
    });
  };

  const handleMoveSlideshowVideo = (index: number, direction: 'up' | 'down') => {
    setForm((prev) => {
      const newVideos = [...(prev.slideshowVideos || [])];
      if (direction === 'up' && index > 0) {
        [newVideos[index - 1], newVideos[index]] = [newVideos[index], newVideos[index - 1]];
      } else if (direction === 'down' && index < newVideos.length - 1) {
        [newVideos[index], newVideos[index + 1]] = [newVideos[index + 1], newVideos[index]];
      }
      return { ...prev, slideshowVideos: newVideos };
    });
  };

  const handleSave = () => {
    updateHeroContent(form);
    toast.success('Hero section updated');
  };

  const hasChanges = JSON.stringify(form) !== JSON.stringify(data.heroContent);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-primary">Hero Section</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize the main banner displayed at the top of the site
          </p>
        </div>
        <Button onClick={handleSave} disabled={!hasChanges} className="gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


        {/* Text Content */}
        <div className="lg:col-span-12 w-full max-w-3xl space-y-4 pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Hero Text Content</h3>
          
          <div>
            <Label>Top Badge Text</Label>
            <Input value={form.badge} onChange={(e) => updateField('badge', e.target.value)} className="bg-secondary border-border mt-1" placeholder="Director / Actor / Writer" />
          </div>

          <div>
            <Label>Main Paragraph</Label>
            <Textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} className="bg-secondary border-border mt-1 h-24" placeholder="A director, actor, and writer driven by compelling storytelling..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Main Title (Line 1)</Label>
              <Input value={form.ctaPrimaryText} onChange={(e) => updateField('ctaPrimaryText', e.target.value)} className="bg-secondary border-border mt-1" placeholder="hi, i'm" />
            </div>
            <div>
              <Label>Main Title (Line 2)</Label>
              <Input value={form.ctaSecondaryText} onChange={(e) => updateField('ctaSecondaryText', e.target.value)} className="bg-secondary border-border mt-1" placeholder="tarun." />
            </div>
          </div>
        </div>

        {/* Showreel Video Selection */}
        <div className="lg:col-span-12 w-full max-w-3xl pt-6 lg:pt-0">
          <h3 className="text-sm font-semibold text-foreground mb-3">Showreel Video</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select the primary video you want to play when scrolling down to the Showreel section.
          </p>
          
          <div className="space-y-3 mb-4">
            {(form.slideshowVideos || []).map((videoId, idx) => {
              const video = data.videos.find((v) => v.id === videoId);
              return (
                <div key={`${videoId}-${idx}`} className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md border border-border">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {video ? video.title : 'Unknown Video'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleMoveSlideshowVideo(idx, 'up')}
                      disabled={idx === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleMoveSlideshowVideo(idx, 'down')}
                      disabled={idx === (form.slideshowVideos || []).length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      onClick={() => handleRemoveSlideshowVideo(idx)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
            
            {(form.slideshowVideos || []).length === 0 && (
              <p className="text-sm text-muted-foreground italic py-2">No video selected for the Showreel yet.</p>
            )}
          </div>

          <div>
            <Select onValueChange={(val) => {
              if (val) {
                handleAddSlideshowVideo(val);
              }
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a video to feature..." />
              </SelectTrigger>
              <SelectContent>
                {data.videos
                  .filter((v) => !(form.slideshowVideos || []).includes(v.id))
                  .map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;

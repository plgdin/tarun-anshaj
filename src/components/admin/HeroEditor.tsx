import { useState, useEffect } from 'react';
import { Save, ArrowUp, ArrowDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

  const updateField = (field: keyof HeroContent, value: any) => {
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
    toast.success('Hero general settings saved');
  };

  const hasChanges = JSON.stringify(form) !== JSON.stringify(data.heroContent);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-primary">Hero General Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize the tagline text and the featured slideshow videos shown in the background.
          </p>
        </div>
        <Button onClick={handleSave} disabled={!hasChanges} className="gap-2">
          <Save className="w-4 h-4" /> Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Info & Tagline (Left Column) */}
        <div className="lg:col-span-5 bg-zinc-900/50 p-6 rounded-lg border border-white/10 space-y-4">
          <h3 className="text-sm font-semibold text-foreground border-b border-white/10 pb-2">Tagline Settings</h3>
          
          <div className="space-y-2">
            <Label htmlFor="badge">Tagline / Location Text</Label>
            <Input
              id="badge"
              value={form.badge}
              onChange={(e) => updateField('badge', e.target.value)}
              className="bg-black/50 border-white/10"
              placeholder="e.g. Director / Writer / Story"
            />
            <p className="text-xs text-muted-foreground">
              This text determines the tagline and dynamically updates the first three words of the description.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/5">
            <Label htmlFor="showreelDuration">Showreel Clip Duration (seconds)</Label>
            <Input
              id="showreelDuration"
              type="number"
              min="0"
              value={form.showreelDuration !== undefined ? form.showreelDuration : 10}
              onChange={(e) => updateField('showreelDuration', parseInt(e.target.value) || 0)}
              className="bg-black/50 border-white/10"
              placeholder="e.g. 10"
            />
            <p className="text-xs text-muted-foreground">
              Number of seconds to show each video in the showreel before auto-switching. Set to 0 to play the full video without cut-off.
            </p>
          </div>
        </div>

        {/* Slideshow (Right Column) */}
        <div className="lg:col-span-7 bg-zinc-900/50 p-6 rounded-lg border border-white/10 space-y-4">
          <h3 className="text-sm font-semibold text-foreground border-b border-white/10 pb-2">Hero Slideshow Videos</h3>
          <p className="text-sm text-muted-foreground">
            Select the videos you want to feature in the background marquee scroll and drag to reorder.
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
              <p className="text-sm text-muted-foreground italic py-2">No videos selected for slideshow yet.</p>
            )}
          </div>

          <div>
            <select 
              value="" 
              onChange={(e) => {
                if (e.target.value) {
                  handleAddSlideshowVideo(e.target.value);
                }
              }}
              className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm text-foreground focus:outline-none"
            >
              <option value="" disabled>Add a video to slideshow...</option>
              {data.videos
                .filter((v) => !(form.slideshowVideos || []).includes(v.id))
                .map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;

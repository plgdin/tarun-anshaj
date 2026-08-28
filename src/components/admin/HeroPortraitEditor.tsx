import { useState, useEffect, useCallback } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCms } from '@/context/CmsContext';
import type { HeroContent } from '@/types/cms';
import { toast } from 'sonner';
import { ImageUpload } from './ImageUpload';

const HeroPortraitEditor = () => {
  const { data, updateHeroContent } = useCms();
  const [form, setForm] = useState<HeroContent>({
    ...data.heroContent
  });

  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setForm({
      ...data.heroContent
    });
  }, [data.heroContent]);

  const updateField = (field: keyof HeroContent, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartOffset({
      x: form.heroImageXOffset ?? 0,
      y: form.heroImageYOffset ?? 0,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({ x: touch.clientX, y: touch.clientY });
    setStartOffset({
      x: form.heroImageXOffset ?? 0,
      y: form.heroImageYOffset ?? 0,
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    // Map pixels to percentages based on container sizes (172.8px wide, 233.6px high)
    const newXOffset = Math.round(startOffset.x + (deltaX / 1.728));
    const newYOffset = Math.round(startOffset.y + (deltaY / 2.336));
    
    const clampedX = Math.max(-200, Math.min(200, newXOffset));
    const clampedY = Math.max(-200, Math.min(200, newYOffset));
    
    setForm((prev) => ({
      ...prev,
      heroImageXOffset: clampedX,
      heroImageYOffset: clampedY,
    }));
  }, [isDragging, startPos, startOffset]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    
    const newXOffset = Math.round(startOffset.x + (deltaX / 1.728));
    const newYOffset = Math.round(startOffset.y + (deltaY / 2.336));
    
    const clampedX = Math.max(-200, Math.min(200, newXOffset));
    const clampedY = Math.max(-200, Math.min(200, newYOffset));
    
    setForm((prev) => ({
      ...prev,
      heroImageXOffset: clampedX,
      heroImageYOffset: clampedY,
    }));
  }, [isDragging, startPos, startOffset]);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  const handleSave = () => {
    updateHeroContent({
      backgroundImage: form.backgroundImage,
      popOutHeroImage: form.popOutHeroImage,
      heroImageScale: form.heroImageScale,
      heroImageXOffset: form.heroImageXOffset,
      heroImageYOffset: form.heroImageYOffset,
      circleColor: form.circleColor,
    });
    toast.success('Hero Portrait alignment saved successfully');
  };

  const hasChanges =
    form.backgroundImage !== data.heroContent.backgroundImage ||
    form.popOutHeroImage !== data.heroContent.popOutHeroImage ||
    form.heroImageScale !== data.heroContent.heroImageScale ||
    form.heroImageXOffset !== data.heroContent.heroImageXOffset ||
    form.heroImageYOffset !== data.heroContent.heroImageYOffset ||
    form.circleColor !== data.heroContent.circleColor;

  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-slider {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        .custom-slider::-webkit-slider-runnable-track {
          background: #27272a;
          height: 10px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          background: #eab308;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -7px;
          box-shadow: 0 0 12px rgba(234, 179, 8, 0.5);
          transition: transform 0.1s, background-color 0.1s;
        }
        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #facc15;
        }
        .custom-slider::-moz-range-track {
          background: #27272a;
          height: 10px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .custom-slider::-moz-range-thumb {
          background: #eab308;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 12px rgba(234, 179, 8, 0.5);
          transition: transform 0.1s, background-color 0.1s;
        }
        .custom-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #facc15;
        }
      `}} />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-primary">Hero Portrait Alignment</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Drag the portrait image inside the circle or adjust the slider to scale and center it perfectly.
          </p>
        </div>
        <Button onClick={handleSave} disabled={!hasChanges} className="gap-2">
          <Save className="w-4 h-4" /> Save Portrait Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Alignment controls & image upload */}
        <div className="lg:col-span-6 bg-zinc-900/50 p-6 rounded-lg border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label className="text-base font-semibold text-white">Hero Portrait Image</Label>
            <ImageUpload
              value={form.backgroundImage}
              onChange={(url) => updateField('backgroundImage', url)}
            />
            <p className="text-xs text-muted-foreground">
              Upload custom portrait image displayed in the hero section banner. Recommended size: 800x1200px transparent PNG.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="popOutHeroImage"
              checked={form.popOutHeroImage ?? true}
              onChange={(e) => updateField('popOutHeroImage', e.target.checked)}
              className="rounded border-white/10 bg-black/50 text-primary focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <Label htmlFor="popOutHeroImage" className="cursor-pointer text-sm font-medium">
              Pop out of circle (requires transparent background)
            </Label>
          </div>

          {/* Circle Backdrop Color */}
          <div className="space-y-2 pt-2">
            <Label htmlFor="circleColor" className="text-sm font-semibold text-white">Circle Backdrop Color</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="circleColor"
                value={form.circleColor || '#eab308'}
                onChange={(e) => updateField('circleColor', e.target.value)}
                className="w-10 h-10 rounded border border-white/10 bg-transparent cursor-pointer p-0"
              />
              <Input
                type="text"
                value={form.circleColor || '#eab308'}
                onChange={(e) => updateField('circleColor', e.target.value)}
                className="bg-black/50 border-white/10 text-xs h-10 flex-1 font-mono"
                placeholder="#eab308"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => updateField('circleColor', '#eab308')}
                className="h-10 text-xs gap-1 border-white/10 bg-transparent hover:bg-white/10 hover:text-white"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Select or type a color code for the circle backdrop (default: Yellow #eab308).
            </p>
          </div>

          {/* Slider and coordinates */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold text-foreground">Controls</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setForm(prev => ({
                    ...prev,
                    heroImageScale: prev.popOutHeroImage !== false ? 1.9 : 1.0,
                    heroImageXOffset: 0,
                    heroImageYOffset: 0,
                    circleColor: '#eab308',
                  }));
                }}
                className="text-xs py-1 h-8 gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Position
              </Button>
            </div>
            
            {/* Resize Slider */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Image Size (Scale)</span>
                <span className="font-semibold text-primary">{(form.heroImageScale ?? (form.popOutHeroImage !== false ? 1.9 : 1.0)).toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.5"
                step="0.05"
                value={form.heroImageScale ?? (form.popOutHeroImage !== false ? 1.9 : 1.0)}
                onChange={(e) => updateField('heroImageScale', parseFloat(e.target.value))}
                className="w-full custom-slider cursor-pointer py-1"
              />
            </div>

            {/* Manual coordinate inputs */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground uppercase">X Offset (%)</Label>
                <Input
                  type="number"
                  value={form.heroImageXOffset ?? 0}
                  onChange={(e) => updateField('heroImageXOffset', parseInt(e.target.value) || 0)}
                  className="bg-black/50 border-white/10 text-xs h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground uppercase">Y Offset (%)</Label>
                <Input
                  type="number"
                  value={form.heroImageYOffset ?? 0}
                  onChange={(e) => updateField('heroImageYOffset', parseInt(e.target.value) || 0)}
                  className="bg-black/50 border-white/10 text-xs h-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live preview (Right Column) */}
        <div className="lg:col-span-6 bg-zinc-900/50 p-6 rounded-lg border border-white/10 flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-sm font-semibold text-foreground border-b border-white/10 pb-2 w-full text-center mb-6">Positioning Preview</h3>
          
          {/* Yellow Circle Container */}
          <div 
            className="relative w-80 h-80 flex items-end justify-center cursor-grab active:cursor-grabbing border border-dashed border-white/20 rounded-full p-1 bg-black/20"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Yellow Circle Backdrop */}
            <div 
              style={{ 
                backgroundColor: form.circleColor || '#eab308',
                boxShadow: `0 0 40px ${(form.circleColor || '#eab308')}26`
              }}
              className="absolute inset-1 rounded-full border-2 border-primary shadow-lg opacity-80" 
            />

            {/* 1. Clipped Image */}
            <div className="absolute inset-1 rounded-full overflow-hidden flex items-end justify-center pointer-events-none">
              <img
                src={form.backgroundImage || "/tarun-hero.png"}
                alt="Hero preview clipped"
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  transform: `translate(${form.heroImageXOffset ?? 0}%, ${form.heroImageYOffset ?? 0}%) scale(${form.heroImageScale ?? (form.popOutHeroImage !== false ? 1.9 : 1.0)})`,
                  transformOrigin: 'bottom center',
                }}
                className="object-cover object-top select-none origin-bottom"
              />
            </div>

            {/* 2. Unclipped Image */}
            {(form.popOutHeroImage ?? true) && (
              <div 
                style={{ clipPath: 'inset(-100% -100% 50% -100%)' }}
                className="absolute inset-1 flex items-end justify-center pointer-events-none"
              >
                <img
                  src={form.backgroundImage || "/tarun-hero.png"}
                  alt="Hero preview unclipped"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: `translate(${form.heroImageXOffset ?? 0}%, ${form.heroImageYOffset ?? 0}%) scale(${form.heroImageScale ?? 1.9})`,
                    transformOrigin: 'bottom center',
                  }}
                  className="object-cover object-top select-none origin-bottom"
                />
              </div>
            )}
            
            {/* Drag Help Overlay */}
            <div className="absolute inset-1 rounded-full bg-black/5 hover:bg-black/0 transition-colors pointer-events-none" />
          </div>

          <p className="text-[10px] text-muted-foreground mt-4 text-center">
            Click & drag inside the yellow circle to move the portrait image.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPortraitEditor;

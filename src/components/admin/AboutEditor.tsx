import React, { useState, useEffect } from 'react';
import { useCms } from '@/context/CmsContext';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import type { AboutContent } from '@/types/cms';

const AboutEditor = () => {
  const { data, updateAboutContent } = useCms();
  const [formData, setFormData] = useState<AboutContent>(data.aboutContent);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData(data.aboutContent);
  }, [data.aboutContent]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    updateAboutContent(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8 bg-zinc-900/50 p-6 rounded-lg border border-white/10">
      <div>
        <h3 className="text-xl font-display text-primary mb-6 border-b border-white/10 pb-2">About Me Section</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Edit the text for your "About Me" sections across the website.
        </p>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="heroDescription">Top About Text (Shown in Hero Section)</Label>
            <Textarea
              id="heroDescription"
              name="heroDescription"
              value={formData.heroDescription}
              onChange={handleChange}
              className="bg-black/50 border-white/10 h-24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aboutDescription">Scroll Down About Text (Shown in About Section)</Label>
            <Textarea
              id="aboutDescription"
              name="aboutDescription"
              value={formData.aboutDescription}
              onChange={handleChange}
              className="bg-black/50 border-white/10 h-32"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-white/10">
        <Button onClick={handleSave} className="gap-2 w-full md:w-auto">
          <Save className="w-4 h-4" />
          {isSaved ? 'Saved!' : 'Save About Page'}
        </Button>
      </div>
    </div>
  );
};

export default AboutEditor;

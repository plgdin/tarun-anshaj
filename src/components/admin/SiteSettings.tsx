import { useState, useRef } from 'react';
import { Save, Download, Upload, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useCms } from '@/context/CmsContext';
import { toast } from 'sonner';

const AVAILABLE_FONTS = [
  'Antonio',
  'Inter',
  'Kanit',
  'Roboto',
  'Outfit',
  'Lexend Peta',
  'Montserrat',
  'Oswald',
  'Playfair Display',
  'system-ui',
];

const SiteSettings = () => {
  const { data, updateSiteSettings, updatePassword, exportData, importData, resetToDefaults } = useCms();
  const [siteName, setSiteName] = useState(data.siteSettings.siteName);
  const [siteDesc, setSiteDesc] = useState(data.siteSettings.siteDescription);
  const [titleFont, setTitleFont] = useState(data.siteSettings.titleFont || 'Montserrat');
  const [descriptionFont, setDescriptionFont] = useState(data.siteSettings.descriptionFont || 'Kanit');
  const [headerFont, setHeaderFont] = useState(data.siteSettings.headerFont || 'Montserrat');
  const [footerFont, setFooterFont] = useState(data.siteSettings.footerFont || 'Kanit');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveSettings = () => {
    updateSiteSettings({ 
      ...data.siteSettings, 
      siteName, 
      siteDescription: siteDesc, 
      titleFont, 
      descriptionFont,
      headerFont,
      footerFont
    });
    toast.success('Site settings saved');
  };

  const handleResetFonts = () => {
    setTitleFont('Montserrat');
    setDescriptionFont('Kanit');
    setHeaderFont('Montserrat');
    setFooterFont('Kanit');
    toast.success('Typography reset to original defaults. Remember to save.');
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      await updatePassword(newPassword);
      setNewPassword('');
      toast.success('Password updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update password');
    }
  };

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pulpfiction-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const json = event.target?.result as string;
      if (importData(json)) {
        toast.success('Data imported successfully');
      } else {
        toast.error('Invalid CMS data file');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    resetToDefaults();
    setSiteName('TARUN KAPOOR');
    setSiteDesc('Director & Cinematographer');
    setTitleFont('Montserrat');
    setDescriptionFont('Kanit');
    setHeaderFont('Montserrat');
    setFooterFont('Kanit');
    setShowResetDialog(false);
    toast.success('Reset to defaults');
  };

  const settingsChanged = 
    siteName !== data.siteSettings.siteName || 
    siteDesc !== data.siteSettings.siteDescription ||
    titleFont !== (data.siteSettings.titleFont || 'Montserrat') ||
    descriptionFont !== (data.siteSettings.descriptionFont || 'Kanit') ||
    headerFont !== (data.siteSettings.headerFont || 'Montserrat') ||
    footerFont !== (data.siteSettings.footerFont || 'Kanit');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-primary">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Site settings, password, and data management</p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Site Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Site Information</h3>
          <div>
            <Label>Site Name</Label>
            <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="bg-secondary border-border mt-1" />
          </div>
          <div>
            <Label>Site Description</Label>
            <Input value={siteDesc} onChange={(e) => setSiteDesc(e.target.value)} className="bg-secondary border-border mt-1" />
          </div>
          
          <Separator className="my-6" />
          <h3 className="text-sm font-semibold text-foreground mb-4">Typography Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="p-3 bg-background rounded border border-border mb-3 overflow-hidden">
                <p className="text-xs text-muted-foreground mb-2">Live Preview</p>
                <div style={{ fontFamily: headerFont }} className="text-primary tracking-wider text-xl uppercase font-bold text-shadow-glow">
                  {siteName || 'TARUN KAPOOR'}
                </div>
              </div>
              <div>
                <Label>Header & Logo Font</Label>
                <Select value={headerFont} onValueChange={setHeaderFont}>
                  <SelectTrigger className="bg-secondary border-border mt-1">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_FONTS.map(font => (
                      <SelectItem key={font} value={font} style={{ fontFamily: font }}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="p-3 bg-background rounded border border-border mb-3 overflow-hidden">
                <p className="text-xs text-muted-foreground mb-2">Live Preview</p>
                <div style={{ fontFamily: titleFont }} className="text-primary text-2xl uppercase tracking-wide font-bold">
                  Cinematic Ad Films
                </div>
              </div>
              <div>
                <Label>Main Titles Font</Label>
                <Select value={titleFont} onValueChange={setTitleFont}>
                  <SelectTrigger className="bg-secondary border-border mt-1">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_FONTS.map(font => (
                      <SelectItem key={font} value={font} style={{ fontFamily: font }}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="p-3 bg-background rounded border border-border mb-3 overflow-hidden">
                <p className="text-xs text-muted-foreground mb-2">Live Preview</p>
                <div style={{ fontFamily: descriptionFont }} className="text-foreground/90 text-sm leading-relaxed">
                  {siteDesc || 'Director & Cinematographer crafting visual stories that move, inspire, and captivate.'}
                </div>
              </div>
              <div>
                <Label>Description & Body Font</Label>
                <Select value={descriptionFont} onValueChange={setDescriptionFont}>
                  <SelectTrigger className="bg-secondary border-border mt-1">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_FONTS.map(font => (
                      <SelectItem key={font} value={font} style={{ fontFamily: font }}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="p-3 bg-background rounded border border-border mb-3 overflow-hidden">
                <p className="text-xs text-muted-foreground mb-2">Live Preview</p>
                <div style={{ fontFamily: footerFont }} className="text-muted-foreground text-xs tracking-widest uppercase">
                  © 2026 {siteName || 'TARUN KAPOOR'}
                </div>
              </div>
              <div>
                <Label>Footer Font</Label>
                <Select value={footerFont} onValueChange={setFooterFont}>
                  <SelectTrigger className="bg-secondary border-border mt-1">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_FONTS.map(font => (
                      <SelectItem key={font} value={font} style={{ fontFamily: font }}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleSaveSettings} disabled={!settingsChanged} className="gap-2">
              <Save className="w-4 h-4" /> Save Settings
            </Button>
            <Button onClick={handleResetFonts} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" /> Reset Fonts
            </Button>
          </div>
        </div>

        <Separator />

        {/* Password */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Change Admin Password</h3>
          <div className="relative">
            <Label>New Password</Label>
            <div className="relative mt-1">
              <Input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-secondary border-border pr-10" placeholder="Enter new password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button onClick={handleChangePassword} disabled={!newPassword} variant="outline" className="gap-2">
            Change Password
          </Button>
        </div>

        <Separator />

        {/* Data Management */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Data Management</h3>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export Data
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="gap-2">
              <Upload className="w-4 h-4" /> Import Data
            </Button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
            <Button onClick={() => setShowResetDialog(true)} variant="outline" className="gap-2 text-destructive border-destructive/50 hover:bg-destructive/10">
              <RotateCcw className="w-4 h-4" /> Reset to Defaults
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Export saves all CMS data as JSON. Import restores from a backup. Reset removes all changes.</p>
        </div>
      </div>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Reset All Data?</AlertDialogTitle>
            <AlertDialogDescription>This will reset all content to the original defaults. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Reset Everything</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SiteSettings;

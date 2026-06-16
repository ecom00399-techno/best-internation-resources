"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function WebsiteEditor() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: string, value: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value })
      });
      if (!res.ok) alert("Failed to save setting");
    } catch (err) {
      alert("Error saving setting");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  const SettingField = ({ label, settingKey, type = "text", placeholder }: any) => (
    <div className="mb-6 pb-6 border-b border-gray-100 last:border-0">
      <label className="block text-sm font-bold text-[#0D1B2A] mb-2">{label}</label>
      <div className="flex gap-4">
        {type === "textarea" ? (
          <textarea
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
            rows={3}
            placeholder={placeholder}
            value={settings[settingKey] || ""}
            onChange={(e) => setSettings({ ...settings, [settingKey]: e.target.value })}
          />
        ) : (
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder={placeholder}
            value={settings[settingKey] || ""}
            onChange={(e) => setSettings({ ...settings, [settingKey]: e.target.value })}
          />
        )}
        <button 
          onClick={() => handleSave(settingKey, settings[settingKey])}
          disabled={saving}
          className="bg-[#0D1B2A] text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2 h-fit"
        >
          <Save size={16} /> Save
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#0D1B2A]">Website Editor</h2>
        <p className="text-sm text-gray-500 mt-1">Update global text and settings across your website.</p>
      </div>
      
      <div className="p-6 max-w-4xl">
        <h3 className="font-bold text-lg mb-4 text-[#FF6A00]">General Settings</h3>
        <SettingField 
          label="Company Phone Number" 
          settingKey="companyPhone" 
          placeholder="+1 828-570-5669" 
        />
        <SettingField 
          label="Company Email" 
          settingKey="companyEmail" 
          placeholder="Support@bestinternationresources.com" 
        />
        <SettingField 
          label="Office Address" 
          settingKey="companyAddress" 
          placeholder="30 N Gould St Ste R, Sheridan, WY 82801" 
        />

        <h3 className="font-bold text-lg mb-4 text-[#FF6A00] mt-8">Home Page</h3>
        <SettingField 
          label="Hero Subtitle" 
          settingKey="homeHeroSubtitle" 
          type="textarea"
          placeholder="Connecting businesses with reliable logistics coordination..." 
        />
        
        <h3 className="font-bold text-lg mb-4 text-[#FF6A00] mt-8">About Page</h3>
        <SettingField 
          label="About Us Description" 
          settingKey="aboutDescription" 
          type="textarea"
          placeholder="Best Internation Resources LLC was founded to bridge the gap in global supply chains..." 
        />
      </div>
    </div>
  );
}

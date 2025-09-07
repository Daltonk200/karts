"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Settings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  currency: string;
  timezone: string;
  language: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  business: {
    workingHours: string;
    appointmentDuration: number;
    maxBookingsPerDay: number;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    storeName: "GlowBeauty",
    storeEmail: "info@glowbeauty.com",
    storePhone: "+237 123 456 789",
    storeAddress: "Douala, Cameroon",
    currency: "XAF",
    timezone: "Africa/Douala",
    language: "en",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    business: {
      workingHours: "09:00-18:00",
      appointmentDuration: 60,
      maxBookingsPerDay: 20,
    },
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setSettings((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Settings],
          [child]: value,
        },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "business", name: "Business", icon: "🏢" },
    { id: "appearance", name: "Appearance", icon: "🎨" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">
            Manage your store settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <nav className="p-4">
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? "bg-rose-100 text-rose-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                {/* General Settings */}
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        General Settings
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Store Name
                          </label>
                          <input
                            type="text"
                            value={settings.storeName}
                            onChange={(e) =>
                              handleInputChange("storeName", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Store Email
                          </label>
                          <input
                            type="email"
                            value={settings.storeEmail}
                            onChange={(e) =>
                              handleInputChange("storeEmail", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Store Phone
                          </label>
                          <input
                            type="tel"
                            value={settings.storePhone}
                            onChange={(e) =>
                              handleInputChange("storePhone", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Currency
                          </label>
                          <Select
                            value={settings.currency}
                            onValueChange={(value) =>
                              handleInputChange("currency", value)
                            }
                          >
                            <SelectTrigger className="w-full py-5 !shadow-none">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="XAF">
                                XAF (Central African CFA Franc)
                              </SelectItem>
                              <SelectItem value="USD">
                                USD (US Dollar)
                              </SelectItem>
                              <SelectItem value="EUR">EUR (Euro)</SelectItem>
                              <SelectItem value="GBP">
                                GBP (British Pound)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Store Address
                          </label>
                          <textarea
                            value={settings.storeAddress}
                            onChange={(e) =>
                              handleInputChange("storeAddress", e.target.value)
                            }
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Notification Preferences
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              Email Notifications
                            </h4>
                            <p className="text-sm text-gray-500">
                              Receive notifications via email
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications.email}
                              onChange={(e) =>
                                handleInputChange(
                                  "notifications.email",
                                  e.target.checked
                                )
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              SMS Notifications
                            </h4>
                            <p className="text-sm text-gray-500">
                              Receive notifications via SMS
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications.sms}
                              onChange={(e) =>
                                handleInputChange(
                                  "notifications.sms",
                                  e.target.checked
                                )
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              Push Notifications
                            </h4>
                            <p className="text-sm text-gray-500">
                              Receive push notifications in browser
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications.push}
                              onChange={(e) =>
                                handleInputChange(
                                  "notifications.push",
                                  e.target.checked
                                )
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Business Settings */}
                {activeTab === "business" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Business Settings
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Working Hours
                          </label>
                          <input
                            type="text"
                            value={settings.business.workingHours}
                            onChange={(e) =>
                              handleInputChange(
                                "business.workingHours",
                                e.target.value
                              )
                            }
                            placeholder="09:00-18:00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Default Appointment Duration (minutes)
                          </label>
                          <input
                            type="number"
                            value={settings.business.appointmentDuration}
                            onChange={(e) =>
                              handleInputChange(
                                "business.appointmentDuration",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Bookings Per Day
                          </label>
                          <input
                            type="number"
                            value={settings.business.maxBookingsPerDay}
                            onChange={(e) =>
                              handleInputChange(
                                "business.maxBookingsPerDay",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Settings */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Appearance Settings
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                          </label>
                          <Select
                            value={settings.language}
                            onValueChange={(value) =>
                              handleInputChange("language", value)
                            }
                          >
                            <SelectTrigger className="w-full py-5 !shadow-none">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timezone
                          </label>
                          <Select
                            value={settings.timezone}
                            onValueChange={(value) =>
                              handleInputChange("timezone", value)
                            }
                          >
                            <SelectTrigger className="w-full py-5 !shadow-none">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Africa/Douala">
                                Africa/Douala
                              </SelectItem>
                              <SelectItem value="Africa/Lagos">
                                Africa/Lagos
                              </SelectItem>
                              <SelectItem value="Africa/Cairo">
                                Africa/Cairo
                              </SelectItem>
                              <SelectItem value="UTC">UTC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : "Save Settings"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

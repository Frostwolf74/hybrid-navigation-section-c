import AppCard from "@/components/app-card";
import * as storage from "@/lib/storage";
import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

const Settings = () => {
  const [notification, setNotification] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved notification preference on mount

  useEffect(() => {
    // Define an async function to load the value since useEffect can't be async
    const loadSettings = async () => {
      // Try to laod saved value from storage if it exists
      const savedNotification = await storage.get<boolean>(
        storage.STORAGE_KEY.NOTIFICATIONS,
      );
      const savedTheme = await storage.get<boolean>(storage.STORAGE_KEY.THEME);

      if (savedNotification !== null) {
        // if we have a saved value, use it to set the state
        setNotification(savedNotification);
      }

      if (savedTheme !== null) {
        setDarkMode(savedTheme);
      }

      setIsLoading(false); // turning off the spinner
    };

    loadSettings();
  }, []);

  const handleToggle = async (value: boolean) => {
    setNotification(value);
    await storage.set(storage.STORAGE_KEY.NOTIFICATIONS, value);
  };

  const handleDarkModeToggle = async (value: boolean) => {
    setDarkMode(value);
    await storage.set(storage.STORAGE_KEY.THEME, value);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.color.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Setting</Text>

      <AppCard
        title="Notifications"
        subtitle="Enable app notifications"
        right={<Switch value={notification} onValueChange={handleToggle} />}
      />
      <AppCard
        title="Dark Mode"
        subtitle="Use dark theme"
        right={<Switch value={darkMode} onValueChange={handleDarkModeToggle} />}
      />
      <Text style={styles.storageState}>Stored: {String(darkMode)}</Text>
      <Pressable onPress={() => router.push("/(tabs)/settings/profile")}>
        <AppCard
          title="Account"
          subtitle="Update profile settings"
          right={
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.color.primary}
            />
          }
        />
      </Pressable>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.screen,
    backgroundColor: theme.color.bg,
  },
  h1: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
    color: theme.color.text,
  },
  storageState: {
    marginTop: -4,
    marginBottom: 12,
    color: theme.color.mute,
    fontSize: 13,
  },
});

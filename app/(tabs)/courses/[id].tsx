import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppCard from "@/components/app-card";
import { theme } from "../../../styles/theme";
import * as api from "@/lib/api";
import React from "react";

const CourseDetails = () => {
  const [course, setCourse] = useState<api.CourseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useLocalSearchParams<{ id: string }>();

  async function loadCourse() {
    try {
      setError(null);
      setIsLoading(true);
      const result = await api.getCourseById(id!);
      setCourse(result);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong.  Please try again",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCourse();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.color.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons
          name="cloud-offline-outline"
          size={48}
          color={theme.color.mute}
        />
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={loadCourse}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.code}> {course?.code}</Text>
      <Text style={styles.h1}>{course?.title}</Text>
      <Text style={styles.description}>{course?.description}</Text>

      {/* Info Cards */}
      <Text style={styles.sectionTitle}>Course Info</Text>

      <AppCard
        title="Instructor"
        subtitle={course?.instructor}
        right={
          <Ionicons name="person-outline" size={20} color={theme.color.mute} />
        }
      />

      <AppCard
        title="Schedule"
        subtitle={course?.schedule}
        right={
          <Ionicons name="time-outline" size={20} color={theme.color.mute} />
        }
      />

      <AppCard
        title="Room"
        subtitle={course?.room}
        right={
          <Ionicons
            name="location-outline"
            size={20}
            color={theme.color.mute}
          />
        }
      />

      <AppCard
        title="Grade"
        subtitle={course?.grade}
        right={
          <Ionicons name="school-outline" size={20} color={theme.color.mute} />
        }
      />
      <AppCard
        title="Next Deadline"
        subtitle={course?.nextDeadline}
        right={
          <Ionicons
            name="alert-circle-outline"
            size={20}
            color={theme.color.mute}
          />
        }
      />

      <AppCard
        title="Attendance"
        subtitle={course?.attendance}
        right={
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color={theme.color.mute}
          />
        }
      />

      {/* Announcements */}
      <Text style={styles.sectionTitle}>Announcements</Text>

      {course?.announcements.map((text, index) => (
        <AppCard
          key={index}
          title={text}
          right={
            <Ionicons
              name="megaphone-outline"
              size={18}
              color={theme.color.mute}
            />
          }
        />
      ))}
    </ScrollView>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.screen,
    backgroundColor: theme.color.bg,
  },
  h1: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.color.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.color.mute,
    marginBottom: 20,
  },
  code: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.color.primary,
    marginBottom: 4,
  },
  p: {
    marginTop: 10,
    color: theme.color.mute,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.color.bg,
    padding: theme.spacing.screen,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: theme.color.mute,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.radius.input,
    backgroundColor: theme.color.primary,
  },
  retryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    color: theme.color.mute,
    marginTop: 40,
    fontSize: 15,
  },
  content: {
    padding: theme.spacing.screen,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.color.text,
    marginTop: 8,
    marginBottom: 10,
  },
});

import AppCard from "@/components/app-card";
import * as api from "@/lib/api";
import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// const COURSES = [
//     {id: "cprg216", title:"CPRG-216", subtitle:"Object Oreiented Programming"},
//     {id: "cprg303", title:"CPRG-303", subtitle:"Mobile Development"},
//     {id: "cprg306", title:"CPRG-306", subtitle:"Advanced Web development"}
// ]

const CourseList = () => {
  const [courses, setCourses] = useState<api.Course[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // function to load courses
  async function loadCourses() {
    try {
      setError(null); // make sure to clear errors from error state
      setLoading(true);
      const result = await api.getCourses();
      setCourses(result);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong.  Please try again",
      );
    } finally {
      setLoading(false);
    }
  }
  // handle pull to refresh

  async function handleRefresh() {
    try {
      setRefreshing(true);
      setError(null);
      const result = await api.getCourses();
      setCourses(result);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong please try again later",
      );
    } finally {
      setRefreshing(false);
    }
  }
  // load course on mount
  useEffect(() => {
    loadCourses();
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
        <Pressable style={styles.retryButton} onPress={loadCourses}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Your Courses</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No course Found</Text>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/(tabs)/courses/${item.id}`)}>
            <AppCard
              title={item.code}
              subtitle={`${item.title} - ${item.instructor}`}
              right={
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={theme.color.mute}
                />
              }
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default CourseList;

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
});

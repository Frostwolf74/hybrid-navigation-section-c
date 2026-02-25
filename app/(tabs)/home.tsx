import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppCard from "@/components/app-card";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/styles/theme";

const home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Campus Hub</Text>
      <Text style={styles.p}> Quick overview for today</Text>

      <AppCard
        title="Upcoming Deadline"
        subtitle="CPRG-216 Assignment Due on Friday"
        right={
          <Ionicons
            name="alert-circle-outline"
            size={22}
            color={theme.color.primary}
          />
        }
      />

      <AppCard
        title="Attendance"
        subtitle="You attended 3/4 classes this week"
        right={
          <Ionicons
            name="checkmark-circle-outline"
            size={22}
            color={theme.color.primary}
          />
        }
      />
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.screen,
    backgroundColor: theme.color.bg,
  },
  h1: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.color.text,
  },
  p: {
    marginTop: 6,
    marginBottom: 16,
    color: theme.color.mute,
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";

type AppCardProps = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};
const AppCard = ({ title, subtitle, right }: AppCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right && <View>{right}</View>}
    </View>
  );
};

export default AppCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.card,
    borderRadius: theme.radius.card,
    padding: theme.spacing.card,
    borderWidth: 1,
    borderColor: theme.color.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.gap,
  },
  textWrap: {
    flex: 1,
    paddingRight: 23,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.color.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: theme.color.mute,
  },
});

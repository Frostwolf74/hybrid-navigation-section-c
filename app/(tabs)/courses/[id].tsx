import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { theme } from "../../../styles/theme"
import React from 'react'

const  CourseDetails = () => {
    const { id } = useLocalSearchParams<{id: string}>()
  return (
    <View style={styles.container}>
      <Text style={styles.h1}> Course Details</Text>
      <Text style={styles.p}>Course Id from the route</Text>
      <Text style={styles.code}>{id}</Text>
    </View>
  )
}

export default CourseDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.screen,
        backgroundColor: theme.color.bg
    },
    h1:{
        fontSize: 22,
        fontWeight: "800",
        color: theme.color.text
    }, 
    code: {
        marginTop: 10,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.color.border,
        backgroundColor: theme.color.card,
        fontWeight: "700",
        color: theme.color.text
    },
    p: {
        marginTop: 10, 
        color: theme.color.mute
    }

})
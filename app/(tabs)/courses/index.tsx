import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import AppCard from '@/components/app-card'
import { theme } from '@/styles/theme'
import React from 'react'

const COURSES = [
    {id: "cprg216", title:"CPRG-216", subtitle:"Object Oreiented Programming"},
    {id: "cprg303", title:"CPRG-303", subtitle:"Mobile Development"},
    {id: "cprg306", title:"CPRG-306", subtitle:"Advanced Web development"}
]

const CourseList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Your Courses</Text>
      <FlatList 
      data={COURSES}
      keyExtractor={(item)=> item.id}
      renderItem={({item})=>(
        <Pressable onPress={()=> router.push(`/(tabs)/courses/${item.id}`)}>
            <AppCard 
            title={item.title}
            subtitle={item.subtitle}
            right={
                <Ionicons 
                name='chevron-forward'
                size={20}
                color={theme.color.mute}
                />
            }
            />
        </Pressable>
      )}
      />
    </View>
  )
}

export default CourseList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.screen,
        backgroundColor: theme.color.bg
    },
    h1:{
        fontSize: 22,
        fontWeight: "800",
        marginBottom: 12,
        color: theme.color.text

    }
})
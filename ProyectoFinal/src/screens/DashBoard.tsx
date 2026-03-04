import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import TaskCard from '../components/TaskCard'

export default function Dashboard({ navigation }: any) {
      
    
  return (
    //scroll vie para desplazar em la pantalla
    <ScrollView>
      <View>

        <TaskCard
          owner="Emerson"
          description="Hacer Foro"
          createdAt={new Date()}
          closedAt={new Date('2026-03-10T17:00:00-06:00')}
        />

        <TaskCard
          owner="Emerson"
          description="Hacer Foro"
          createdAt={new Date()}
          closedAt={new Date('2026-03-02T17:00:00-06:00')}
        />
        <TaskCard
          owner="Emerson"
          description="Hacer Foro"
          createdAt={new Date()}
          closedAt={new Date('2026-03-10T17:00:00-06:00')}
        />


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    marginTop: 4,
    color: '#6b7280',
  },
});
import { View, Text, StyleSheet } from "react-native";
import TaskCard from '../components/TaskCard'

export default  function Dashboard ({ navigation }: any){
    return (
        <View>
            <View>
                <Text>
                    Hola estas en dashboard admin
                </Text>
            </View>
            <TaskCard>    
                <Text style={styles.cardTitle}>Tarea de ejemplo</Text>
                <Text style={styles.cardSubtitle}>Descripción breve o placeholder…</Text>
            </TaskCard>
        </View>

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




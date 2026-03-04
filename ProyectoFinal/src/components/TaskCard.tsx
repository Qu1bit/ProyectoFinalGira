import { View, StyleSheet } from 'react-native';

interface TaskCardProps {
  style?: object;
  owner: string;
  description: string;
  statusTask?: string;
  createdAt: string;
  closedAt: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});

export default TaskCard;
// src/screens/CreatePlanScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';

const CreatePlanScreen = ({ navigation, route }: any) => {
  const [planName, setPlanName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePlan = async () => {
    setLoading(true);
    try {
      // API call to create plan
      // await createPlanAPI({ name: planName, start_date: startDate, end_date: endDate });

      // Call the callback to refresh plans list
      route.params?.onPlanCreated?.();

      // Navigate back
      navigation.goBack();
    } catch (error) {
      console.error('Error creating plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>ایجاد پلن جدید</Title>

          <TextInput
            label="نام پلن"
            value={planName}
            onChangeText={setPlanName}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="تاریخ شروع"
            value={startDate}
            onChangeText={setStartDate}
            style={styles.input}
            mode="outlined"
            placeholder="YYYY-MM-DD"
          />

          <TextInput
            label="تاریخ پایان"
            value={endDate}
            onChangeText={setEndDate}
            style={styles.input}
            mode="outlined"
            placeholder="YYYY-MM-DD"
          />

          <Button
            mode="contained"
            onPress={handleCreatePlan}
            loading={loading}
            disabled={!planName || !startDate || !endDate}
            style={styles.button}
          >
            ایجاد پلن
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default CreatePlanScreen;

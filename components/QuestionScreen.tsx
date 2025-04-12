import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Question } from '@/types/reading';

interface QuestionScreenProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuestionScreen({ question, onAnswer }: QuestionScreenProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswer(selectedOption === question.correctAnswer);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.questionText}>
        {question.text}
      </ThemedText>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedOption === index && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(index)}
          >
            <ThemedText>{option}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, !selectedOption && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={selectedOption === null}
      >
        <ThemedText style={styles.submitButtonText}>Submit Answer</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 15,
  },
  option: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0a7ea4',
  },
  selectedOption: {
    backgroundColor: '#0a7ea4',
  },
  submitButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, View, SafeAreaView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SpeedReader } from '@/components/SpeedReader';
import { useThemeColor } from '@/hooks/useThemeColor';

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. This is a sample text that you can use to practice your speed reading skills. Feel free to replace it with any text you want to practice with.";

export default function PracticeScreen() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [wpm, setWpm] = useState('400');
  const [duration, setDuration] = useState('15');
  const [isReading, setIsReading] = useState(false);
  
  // Get theme colors
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const borderColor = useThemeColor({ light: '#0a7ea4', dark: '#50B3D1' }, 'tint');
  const placeholderColor = useThemeColor({ light: '#999', dark: '#666' }, 'tabIconDefault');
  const tipsBackgroundColor = useThemeColor({ light: '#e6f7fd', dark: '#164B60' }, 'background');
  const tipsTitleColor = useThemeColor({ light: '#05486c', dark: '#50B3D1' }, 'tint');
  const tipsTextColor = useThemeColor({ light: '#333', dark: '#ddd' }, 'text');
  
  const handleStartReading = () => {
    if (text.trim() && !isNaN(Number(wpm)) && Number(wpm) > 0) {
      setIsReading(true);
    }
  };

  const handleReadingComplete = () => {
    setIsReading(false);
  };

  if (isReading) {
    return (
      <ThemedView style={styles.container}>
        <SpeedReader
          text={text}
          wpm={Number(wpm)}
          onComplete={handleReadingComplete}
          durationSeconds={Number(duration)}
        />
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.spacer} />
          <ThemedText type="title" style={styles.title}>
            Practice Mode
          </ThemedText>
          
          <View style={styles.controlsRow}>
            <ThemedView style={[styles.inputContainer, styles.halfWidth]}>
              <ThemedText type="subtitle">WPM</ThemedText>
              <TextInput
                style={[styles.wpmInput, { color: textColor, borderColor }]}
                value={wpm}
                onChangeText={setWpm}
                keyboardType="number-pad"
                maxLength={4}
                placeholder="Enter WPM"
                placeholderTextColor={placeholderColor}
              />
            </ThemedView>

            <ThemedView style={[styles.inputContainer, styles.halfWidth]}>
              <ThemedText type="subtitle">Duration (seconds)</ThemedText>
              <TextInput
                style={[styles.wpmInput, { color: textColor, borderColor }]}
                value={duration}
                onChangeText={setDuration}
                keyboardType="number-pad"
                maxLength={2}
                placeholder="15"
                placeholderTextColor={placeholderColor}
              />
            </ThemedView>
          </View>

          <ThemedView style={styles.inputContainer}>
            <ThemedText type="subtitle">Text to Read</ThemedText>
            <TextInput
              style={[styles.textInput, { color: textColor, borderColor }]}
              value={text}
              onChangeText={setText}
              multiline
              numberOfLines={Platform.OS === 'ios' ? undefined : 8}
              placeholder="Enter or paste text here..."
              placeholderTextColor={placeholderColor}
              textAlignVertical="top"
            />
          </ThemedView>

          <View style={styles.statsContainer}>
            <ThemedText style={styles.statsText}>
              Reading {calculateWordCount(text)} words at {wpm} WPM will take approximately {calculateReadingTime(text, Number(wpm))} seconds.
            </ThemedText>
          </View>

          <TouchableOpacity
            style={[
              styles.startButton,
              { backgroundColor: borderColor },
              (!text.trim() || isNaN(Number(wpm)) || Number(wpm) <= 0) && styles.disabledButton,
            ]}
            onPress={handleStartReading}
            disabled={!text.trim() || isNaN(Number(wpm)) || Number(wpm) <= 0}
          >
            <ThemedText style={styles.startButtonText}>Start Reading</ThemedText>
          </TouchableOpacity>

          <View style={[styles.tipsContainer, { backgroundColor: tipsBackgroundColor, borderColor }]}>
            <ThemedText style={[styles.tipsTitle, { color: tipsTitleColor }]}>Speed Reading Tips:</ThemedText>
            <ThemedText style={[styles.tipText, { color: tipsTextColor }]}>• Try to focus on groups of words instead of individual words</ThemedText>
            <ThemedText style={[styles.tipText, { color: tipsTextColor }]}>• Avoid subvocalization (saying words in your head as you read)</ThemedText>
            <ThemedText style={[styles.tipText, { color: tipsTextColor }]}>• Use your peripheral vision to scan more text at once</ThemedText>
            <ThemedText style={[styles.tipText, { color: tipsTextColor }]}>• Practice regularly to improve your reading speed</ThemedText>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

// Helper functions
function calculateWordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

function calculateReadingTime(text: string, wpm: number): number {
  if (wpm <= 0) return 0;
  const wordCount = calculateWordCount(text);
  return Math.ceil((wordCount / wpm) * 60);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  spacer: {
    height: 50, // This creates space at the top to avoid camera notch
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfWidth: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  wpmInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  textInput: {
    height: 180,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  statsContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statsText: {
    fontSize: 14,
    fontWeight: '500',
  },
  startButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsContainer: {
    marginTop: 30,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  tipsTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  tipText: {
    marginBottom: 8,
    lineHeight: 20,
  },
});
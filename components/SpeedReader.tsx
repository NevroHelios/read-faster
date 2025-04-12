import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from './ThemedText'; // Assuming ThemedText handles theme colors
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SpeedReaderProps {
  text: string;
  wpm: number;
  onComplete: () => void;
  durationSeconds?: number;
}

export function SpeedReader({ text, wpm, onComplete, durationSeconds }: SpeedReaderProps) {
  const [currentWord, setCurrentWord] = useState('');
  const [timeLeft, setTimeLeft] = useState(durationSeconds || 0);
  const wordIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const words = useRef(text.split(/\s+/).filter(word => word.length > 0));
  const msPerWord = (60 * 1000) / wpm;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Set first word immediately
    if (words.current.length > 0) {
      setCurrentWord(words.current[0]);
      wordIndexRef.current = 1; // Start from second word next time
    }

    // Start the word timer
    timerRef.current = setInterval(() => {
      if (wordIndexRef.current < words.current.length) {
        setCurrentWord(words.current[wordIndexRef.current]);
        wordIndexRef.current++;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        onComplete();
      }
    }, msPerWord);

    // Start countdown timer if duration is set
    let countdownTimer: NodeJS.Timeout | null = null;
    if (durationSeconds) {
      setTimeLeft(durationSeconds);
      countdownTimer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            if (countdownTimer) clearInterval(countdownTimer);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownTimer) clearInterval(countdownTimer);
    };
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: Math.max(insets.top, 30) }]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ThemedText style={styles.headerText}>Reading at {wpm} WPM</ThemedText>
          {durationSeconds && (
            <ThemedText style={styles.headerText}>{timeLeft}s remaining</ThemedText>
          )}
        </View>
        
        <View style={styles.wordContainer}>
          <View style={styles.wordWrapper}>
            <ThemedText type="title" style={styles.word} adjustsFontSizeToFit numberOfLines={1}>
              {currentWord}
            </ThemedText>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <ThemedText style={styles.progressText}>
            Word {wordIndexRef.current} of {words.current.length}
          </ThemedText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  wordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordWrapper: {
    width: '100%',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  word: {
    fontSize: 48,
    textAlign: 'center',
    lineHeight: 60,
  },
  progressContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 20,
  },
  progressText: {
    fontSize: 14,
  },
});
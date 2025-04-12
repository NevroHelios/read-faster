import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

import { SpeedReader } from '@/components/SpeedReader';
import { QuestionScreen } from '@/components/QuestionScreen';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Level } from '@/types/reading';
import { UnlockedLevelsContext } from '@/contexts/UnlockedLevelsContext';

// Using the same levels data as defined in index.tsx
const LEVELS: Level[] = [
  {
    id: 1,
    name: "Level 1",
    isLocked: false,
    requiredWPM: 400,
    content: {
      id: 1,
      text: "The sun was setting behind the mountains, casting long shadows across the valley. Birds were returning to their nests, filling the air with their evening songs. A gentle breeze rustled the leaves of the trees, creating a peaceful melody that echoed throughout the forest. The sky displayed brilliant hues of orange and purple as day transformed into night.",
      wpm: 400,
      questions: [
        {
          text: "What time of day is described in the passage?",
          options: ["Morning", "Noon", "Evening", "Night"],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 2,
    name: "Level 2",
    isLocked: true,
    requiredWPM: 500,
    content: {
      id: 2,
      text: "Scientists have discovered a new species of butterfly in the Amazon rainforest. The species displays unique wing patterns and behavioral characteristics never before seen in lepidopterology. This finding could revolutionize our understanding of butterfly evolution and adaptation in tropical environments. Researchers are now studying its genetic makeup to understand its place in the ecosystem.",
      wpm: 500,
      questions: [
        {
          text: "What was discovered in the Amazon rainforest?",
          options: ["A new bird", "A new butterfly", "A new tree", "A new monkey"],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 3,
    name: "Level 3",
    isLocked: true,
    requiredWPM: 600,
    content: {
      id: 3,
      text: "Quantum computing represents a paradigm shift in computational power. Unlike classical computers that use bits, quantum computers use quantum bits or qubits. These qubits can exist in multiple states simultaneously, potentially solving complex problems exponentially faster than traditional computers. Major tech companies are investing billions in quantum research despite the significant technical challenges that still remain in scaling this technology to practical applications.",
      wpm: 600,
      questions: [
        {
          text: "What is the main difference between quantum and classical computers?",
          options: ["Size", "Cost", "Use of qubits vs bits", "Power consumption"],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 4,
    name: "Level 4",
    isLocked: true,
    requiredWPM: 700,
    content: {
      id: 4,
      text: "Neuroplasticity refers to the brain's ability to reorganize itself by forming new neural connections throughout life. This phenomenon allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or changes in their environment. Recent research suggests that practicing speed reading may enhance neuroplasticity in regions of the brain associated with language processing and visual information, potentially improving overall cognitive function beyond just reading efficiency.",
      wpm: 700,
      questions: [
        {
          text: "What is neuroplasticity?",
          options: ["Brain surgery", "Brain's ability to reorganize itself", "Brain disease", "Memory loss"],
          correctAnswer: 1
        }
      ]
    }
  }
];

// Duration in seconds for each reading session
const READING_DURATION = 15;

export default function ReadingScreen() {
  const router = useRouter();
  const { levelId } = useLocalSearchParams();
  const { unlockLevel, unlockedLevels } = useContext(UnlockedLevelsContext);
  const [isReading, setIsReading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [unlockedNewLevel, setUnlockedNewLevel] = useState<number | null>(null);

  const level = LEVELS.find(l => l.id === Number(levelId));

  useEffect(() => {
    if (!level) {
      router.replace('/');
    }
  }, [level, router]);

  if (!level) {
    return null;
  }

  const handleStartReading = () => {
    setShowIntro(false);
    setIsReading(true);
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleReadingComplete = () => {
    setIsReading(false);
    if (Platform.OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleAnswer = (correct: boolean) => {
    setIsCorrect(correct);
    setShowResult(true);
    
    // If correct and there's a next level, unlock it
    if (correct && level.id < LEVELS.length) {
      const nextLevelId = level.id + 1;
      // Only set as newly unlocked if it wasn't already unlocked
      if (!unlockedLevels.includes(nextLevelId)) {
        setUnlockedNewLevel(nextLevelId);
      }
      unlockLevel(nextLevelId);
    }
    
    if (Platform.OS === 'ios') {
      Haptics.notificationAsync(
        correct 
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Error
      );
    }
  };

  const handleContinue = () => {
    router.back();
  };

  if (showResult) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.resultContentContainer}>
          <ThemedText type="title" style={styles.resultText}>
            {isCorrect ? '🎉 Correct!' : '😔 Incorrect'}
          </ThemedText>
          <ThemedText style={styles.resultMessage}>
            {isCorrect 
              ? `Great job! You successfully comprehended the text at ${level.requiredWPM} WPM!${
                  unlockedNewLevel ? `\n\nYou've unlocked Level ${unlockedNewLevel}!` : ''
                }`
              : 'Keep practicing! Try reading this level again to improve your speed reading skills.'}
          </ThemedText>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <ThemedText style={styles.continueButtonText}>
              Continue
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  if (showIntro) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.introContent}>
          <ThemedText type="title" style={styles.introTitle}>
            {level.name}
          </ThemedText>
          <ThemedText style={styles.introDescription}>
            You will be shown text at {level.requiredWPM} WPM for {READING_DURATION} seconds.
          </ThemedText>
          <ThemedText style={styles.introDescription}>
            After the time is up, you'll need to answer a question about what you read.
          </ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={handleStartReading}
        >
          <ThemedText style={styles.startButtonText}>
            Start Reading
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {isReading ? (
        <SpeedReader
          text={level.content.text}
          wpm={level.content.wpm}
          onComplete={handleReadingComplete}
          durationSeconds={READING_DURATION}
        />
      ) : (
        <QuestionScreen
          question={level.content.questions[0]}
          onAnswer={handleAnswer}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  introContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introTitle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  introDescription: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 15,
  },
  startButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 40,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingVertical: 20,
    justifyContent: 'flex-end',
  },
  resultText: {
    textAlign: 'center',
    marginBottom: 30,
  },
  resultMessage: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
  },
  continueButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
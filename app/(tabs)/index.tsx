import { useContext } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Level } from '@/types/reading';
import { UnlockedLevelsContext } from '@/contexts/UnlockedLevelsContext';

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

export default function LevelsScreen() {
  const router = useRouter();
  const { unlockedLevels, isLoading } = useContext(UnlockedLevelsContext);

  const handleLevelPress = (level: Level) => {
    if (!level.isLocked || unlockedLevels.includes(level.id)) {
      router.push({
        pathname: '/reading',
        params: { levelId: level.id }
      });
    }
  };

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText style={styles.loadingText}>Loading progress...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <View style={styles.spacer} />
        <ThemedText type="title" style={styles.title}>
          Speed Reading Challenge
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Each level gives you only 15 seconds to read the text!
        </ThemedText>
        <ScrollView contentContainerStyle={styles.levelsContainer}>
          {LEVELS.map((level) => {
            const isUnlocked = !level.isLocked || unlockedLevels.includes(level.id);
            return (
              <TouchableOpacity
                key={level.id}
                style={[styles.levelCard, !isUnlocked && styles.lockedLevel]}
                onPress={() => handleLevelPress(level)}
                disabled={!isUnlocked}
              >
                <ThemedText type="subtitle">{level.name}</ThemedText>
                <ThemedText>{level.requiredWPM} WPM</ThemedText>
                {!isUnlocked && (
                  <ThemedText style={styles.lockedText}>🔒 Locked</ThemedText>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  spacer: {
    height: 50, // This creates space at the top to avoid camera notch
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#666',
  },
  levelsContainer: {
    gap: 15,
    paddingBottom: 20,
  },
  levelCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
  },
  lockedLevel: {
    opacity: 0.5,
  },
  lockedText: {
    marginTop: 5,
    color: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
  },
});

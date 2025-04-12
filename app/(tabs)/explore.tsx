import { StyleSheet, Image, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={{ uri: 'https://wallpapers.com/images/hd/bocchi-the-rock-surprised-reaction-uf98jl11d34v5h6c.jpg' }}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore Something New!</ThemedText>
      </ThemedView>
      <ThemedText>Here's some fun and interesting content replacing the old examples.</ThemedText>
      <ThemedView style={styles.contentBlock}>
        <ThemedText type="subtitle">Maybe a cool fact?</ThemedText>
        <ThemedText>Did you know that a group of flamingos is called a flamboyance?</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentBlock}>
        <ThemedText type="subtitle">Or a joke?</ThemedText>
        <ThemedText>Why don't scientists trust atoms? Because they make up everything!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentBlock}>
        <ThemedText type="subtitle">Another Fact!</ThemedText>
        <ThemedText>Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentBlock}>
        <ThemedText type="subtitle">Tech Humor</ThemedText>
        <ThemedText>There are 10 types of people in the world: those who understand binary, and those who don't.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentBlock}>
        <ThemedText type="subtitle">Space is Big</ThemedText>
        <ThemedText>The Octopus has three hearts. Two pump blood through the gills, while the third circulates blood to the rest of the body.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentBlock}>
        <ThemedText type="subtitle">Example Texts (Copy & Paste!)</ThemedText>
        <ThemedText style={styles.exampleText}>
          "The quick brown fox jumps over the lazy dog." - A classic pangram containing every letter of the English alphabet.
        </ThemedText>
        <ThemedText style={styles.exampleText}>
          "To be or not to be, that is the question." - A famous line from Shakespeare's Hamlet. Useful for testing readability.
        </ThemedText>
        <ThemedText style={styles.exampleText}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." - Standard placeholder text used in design.
        </ThemedText>
        <ThemedText style={styles.exampleText}>
          "All that glitters is not gold." - A well-known proverb reminding us that appearances can be deceiving.
        </ThemedText>
        <ThemedText style={styles.exampleText}>
          "Stay hungry, stay foolish." - Part of Steve Jobs' 2005 Stanford commencement address, encouraging continuous learning and risk-taking.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentBlock}>
        <ThemedText type="subtitle">One More Fact</ThemedText>
        <ThemedText>A single cloud can weigh more than a million pounds.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentBlock}>
        <ThemedText type="subtitle">Final Joke</ThemedText>
        <ThemedText>Why did the scarecrow win an award? Because he was outstanding in his field!</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  contentBlock: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  exampleText: {
    marginTop: 8,
    padding: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 5,
    fontFamily: 'monospace',
  },
});

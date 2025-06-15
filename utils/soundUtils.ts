// utils/soundUtils.ts
let clickAudio: HTMLAudioElement | null = null;

export const playClickSound = () => {
  if (!clickAudio) {
    // This is a silent Base64 encoded WAV to avoid errors if AudioContext isn't available
    // or if a real sound isn't provided. 
    // For a real application, replace this with the path to your actual sound file.
    // e.g., const soundUrl = '/sounds/ui-click.mp3';
    const silentWav = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
    clickAudio = new Audio(silentWav); 
    clickAudio.volume = 0.3; // Adjust volume as needed
  }
  
  // Log to console, helpful for debugging or if no sound file is used
  console.log('Click sound played (placeholder/silent)');

  // To play a real sound, you would uncomment and use:
  // if (clickAudio.src !== 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=') { // Check if it's not the silent WAV
  //   clickAudio.currentTime = 0; // Rewind to start if playing multiple times quickly
  //   clickAudio.play().catch(error => console.warn("Error playing click sound:", error));
  // }
};
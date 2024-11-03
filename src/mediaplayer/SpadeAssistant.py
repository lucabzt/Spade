import tkinter as tk
import pygame
import cv2
import numpy as np
from PIL import Image, ImageTk
import random

# Initialize Pygame mixer for audio playback only
pygame.mixer.init()

# Create main application window
class AudioVisualizerApp:
    def __init__(self, master):
        self.master = master
        master.title("Spade Audio Visualizer")
        master.attributes('-fullscreen', True)  # Set window to fullscreen
        master.configure(bg='#2f2e31')  # Set background to dark

        # Create a canvas for the video playback
        self.canvas = tk.Canvas(master, bg='#2f2e31', highlightthickness=0)
        self.canvas.pack(fill=tk.BOTH, expand=True)

        # Load the video and initialize OpenCV
        self.video_path = "/Users/sebastianrogg/PycharmProjects/Spade/images/spade_OG.mp4"  # Replace with your video file path
        self.video_capture = cv2.VideoCapture(self.video_path)

        # Get screen dimensions
        self.screen_width = master.winfo_screenwidth()
        self.screen_height = master.winfo_screenheight()

        # List to hold audio file paths
        self.audio_files = []
        self.current_audio_index = 0  # Track the current audio file index

        # Create play and skip buttons
        self.play_button = tk.Button(master, text="Play", command=self.play_audio, bg='black', fg='white', font=("Arial", 24))
        button_y_position = self.screen_height - 50  # 50 pixels from the bottom
        self.canvas.create_window(self.screen_width // 2 - 100, button_y_position, window=self.play_button)

        self.skip_button = tk.Button(master, text="Skip", command=self.skip_audio, bg='black', fg='white', font=("Arial", 24))
        self.canvas.create_window(self.screen_width // 2 + 100, button_y_position, window=self.skip_button)

        # Flag to indicate whether the audio is playing
        self.audio_playing = False

    def set_audio_files(self, file_paths):
        """Set the audio files to be used for playback."""
        self.audio_files = file_paths

    def play_video(self):
        """Continuously play the video frames."""
        ret, frame = self.video_capture.read()  # Read the next frame
        if ret:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # Convert to RGB
            img = Image.fromarray(frame)  # Create an Image object
            img = img.resize((self.screen_width, self.screen_height), Image.LANCZOS)  # Resize to full screen
            img = ImageTk.PhotoImage(img)  # Convert to PhotoImage

            # Display the image on the canvas
            self.canvas.create_image(0, 0, anchor=tk.NW, image=img)
            self.canvas.image = img  # Keep a reference to avoid garbage collection

            # Schedule the next frame, adjust the delay based on the video frame rate
            self.canvas.after(33, self.play_video)  # Call this function again after ~33 ms (~30 FPS)
        else:
            # Video has ended; reset to the first frame and continue playing
            self.video_capture.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Loop video
            self.play_video()  # Continue playing

    def show_first_frame(self):
        """Display the first frame of the video."""
        self.video_capture.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Go to the first frame
        ret, frame = self.video_capture.read()  # Read the first frame
        if ret:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # Convert to RGB
            img = Image.fromarray(frame)  # Create an Image object
            img = img.resize((self.screen_width, self.screen_height), Image.LANCZOS)  # Resize to full screen
            img = ImageTk.PhotoImage(img)  # Convert to PhotoImage
            self.canvas.create_image(0, 0, anchor=tk.NW, image=img)  # Display it on canvas
            self.canvas.image = img  # Keep a reference to avoid garbage collection

    def play_audio(self):
        """Play the current audio file and start video if not already playing."""
        if self.audio_files:  # Check if there are audio files
            audio_path = self.audio_files[self.current_audio_index]  # Get the current audio file
            pygame.mixer.music.load(audio_path)  # Load audio file
            pygame.mixer.music.play()  # Play audio
            self.audio_playing = True  # Mark audio as playing

            # Start playing the video loop only if it's not already playing
            if not hasattr(self, 'video_started') or not self.video_started:
                self.video_started = True
                self.play_video()  # Start video playback

            # Start checking if the audio has ended
            self.check_audio_end()

    def skip_audio(self):
        """Skip the current audio file and play the next one."""
        self.current_audio_index = (self.current_audio_index + 1) % len(self.audio_files)  # Loop back to the first if at the end

        # If audio is currently playing, stop it
        if self.audio_playing:
            pygame.mixer.music.stop()  # Stop the current audio
            self.audio_playing = False  # Reset the audio playing flag

        self.play_audio()  # Play the next audio

    def check_audio_end(self):
        """Check if the audio has finished playing and stop video if there are no more tracks."""
        if not pygame.mixer.music.get_busy() and self.audio_playing:
            # Move to the next track or stop if no more audio files
            if self.current_audio_index < len(self.audio_files) - 1:
                self.skip_audio()  # Go to the next audio track
            else:
                self.audio_playing = False  # Stop audio playing flag
                self.video_started = False  # Reset video flag to stop looping

                # Stop video playback by releasing video capture if audio is done
                self.show_first_frame()
                self.video_capture.release()
        else:
            # Check again after a short delay
            self.master.after(100, self.check_audio_end)

    def on_audio_end(self):
        """Handle the event when audio ends."""
        self.audio_playing = False  # Mark audio as not playing


def main():
    # Create the main window
    root = tk.Tk()

    # Create an instance of the application
    app = AudioVisualizerApp(root)

    # Set audio files for testing
    app.set_audio_files([
        "/Users/sebastianrogg/PycharmProjects/Spade/sounds/Player Actions/Checks/ElevenLabs_2024-10-28T20_29_07_Daniel_pre_s50_sb75_se0_b_m2.mp3",
        "/Users/sebastianrogg/PycharmProjects/Spade/sounds/Player Actions/Checks/ElevenLabs_2024-10-28T20_31_11_Daniel_pre_s50_sb75_se0_b_m2.mp3",
        "/Users/sebastianrogg/PycharmProjects/Spade/sounds/Player Actions/Checks/ElevenLabs_2024-10-28T20_31_11_Daniel_pre_s50_sb75_se0_b_m2.mp3",
        "/Users/sebastianrogg/PycharmProjects/Spade/sounds/Player Actions/Checks/ElevenLabs_2024-10-28T20_31_11_Daniel_pre_s50_sb75_se0_b_m2.mp3",
        "/Users/sebastianrogg/PycharmProjects/Spade/sounds/Players/Bozzetti/ElevenLabs_2024-10-28T19_30_25_Daniel_pre_s50_sb75_se0_b_m2.mp3",
        "/Users/sebastianrogg/PycharmProjects/Spade/sounds/Phrases/Spade_Initiation.mp3",
        "/Users/sebastianrogg/PycharmProjects/Spade/sounds/music/Rocket Man - Elton John.mp3",
        "/Users/sebastianrogg/PycharmProjects/Spade/sounds/music/Tainted Love - Soft Cell.mp3"
    ])

    # Start the main event loop
    root.mainloop()

    # Clean up resources on close
    app.video_capture.release()
    pygame.mixer.quit()


if __name__ == "__main__":
    main()
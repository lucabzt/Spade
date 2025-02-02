import os
import threading
import time
import random
from playsound3 import playsound
from mutagen.mp3 import MP3
from time import sleep

# Get the base directory of the project
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))


def play_winner_sound(winner):
    play_winners_sound([winner])


start_time = time.time()


# Helper function to play a random sound file from a list
def play_random_sound(file_path):
    try:
        # Construct the full path dynamically
        folder_path = os.path.join(BASE_DIR, "server/assets/sounds", file_path)

        # MacOS will extrawurst wegen .DS_Store file
        files = [
            f for f in os.listdir(folder_path)
            if os.path.isfile(os.path.join(folder_path, f)) and f.lower().endswith(('.mp3', '.wav'))
        ]
        if files:
            # Select a random file from the list
            random_file = random.choice(files)
            file = os.path.join(folder_path, random_file)
            audio = MP3(file)
            audio_info = audio.info
            length = float(audio_info.length)

            # Play the selected file
            playsound(file, block=False)
            sleep(max(length * 0.975, length - 0.114))

        else:
            print(f"No valid audio files found in the folder {folder_path}.")
    except Exception as e:
        print(e)


def play_community_card_sound(round_name):
    if round_name == "Pre-Flop":
        return
    play_random_sound(f"dealer-lines/community-cards/{round_name}")


def play_player_action(player, action):
    """Actions like checks, calls, raises"""
    play_player_name(player.name)
    play_random_sound(f"player-actions/{action}")


def play_all_sounds(file_path) -> threading.Thread:
    def play_sound():
        try:
            folder_path = os.path.join(BASE_DIR, "server/assets/sounds", file_path)
            files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
            for file in files:
                playsound(os.path.join(folder_path, file))
        except Exception as e:
            print(e)

    # Create a thread to play sound in the background
    sound_thread = threading.Thread(target=play_sound)
    sound_thread.start()
    return sound_thread


# Function to construct the sound paths for a card rank
def get_card_sound_paths(rank):
    rank_path = os.path.join(BASE_DIR, f"server/assets/sounds/poker-cards/Card/Plural/{rank}")
    return [os.path.join(rank_path, f"{rank}{i}.mp3") for i in range(1, 5)]


# Function to construct paths for specific phrases
def get_announcement_path(phrase):
    base_path = os.path.join(BASE_DIR, "server/assets/sounds")
    paths = {
        "wins": [os.path.join(base_path, "player-actions", "wins.mp3")],
        "full of": [os.path.join(base_path, "winning-hands", "full of.mp3")],
        "and": [os.path.join(base_path, "Phrases", "and.mp3")]
    }
    return paths.get(phrase, [])


# Play player name sound
def play_player_name(name):
    play_random_sound(f"players/{name}")


# Play the sound for a winning hand type
def play_hand_type(hand_type):
    play_random_sound(f"winning-hands/{hand_type}")


# Function to handle Full House announcement
def play_full_house(attributes):
    trip_rank, pair_rank = attributes
    play_random_sound(f"winning-hands/fullHouse")
    rank = str(pair_rank).replace("Rank.", "")
    play_random_sound(f"poker-cards/Card/Plural/{rank}/")  # Adjust path for pair rank


def play_rank_high(attribute):
    card = attribute
    rank = str(card.rank).replace("Rank.", "")
    playsound(os.path.join(BASE_DIR, f"server/assets/sounds/poker-cards/Card/Card Number/{rank}.mp3"))
    playsound(os.path.join(BASE_DIR, f"server/assets/sounds/poker-cards/High/High1.mp3"))


def play_card_plural(attribute):
    rank = attribute
    rank = str(rank).replace("Rank.", "")
    play_random_sound(f"poker-cards/Card/Plural/{rank}")


# Function to handle a generic hand with attributes
def play_generic_hand(hand_type, attributes):
    # Generic means attributes only one attribute
    play_hand_type(hand_type)

    if hand_type in ("Straight", "Flush"):
        play_rank_high(attributes)
    elif hand_type in ("Three of a Kind", "Four of a Kind"):
        play_card_plural(attributes)


# Function to handle the "One Pair" hand type
def play_one_pair(attributes):
    pair_rank = attributes[0]  # The rank of the pair (e.g., <Rank.TWO: '2'>)

    # Play "Pair of" sound from the Winning Hands folder
    play_random_sound("Winning Hands/OnePair")

    # Play the plural sound for the rank of the pair (e.g., Two)
    rank = str(pair_rank).replace("Rank.", "")
    play_random_sound(f"Poker Cards/Card/Plural/{rank}")  # Adjust the path to point to the rank's sound file


# Main function that plays the winner's sound based on hand type
def play_winners_sound(winners):
    play_random_sound(f"Dealer_Lines/Showdown")

    for winner in winners:
        name, hand_type, (hand_cards, attributes) = winner

        # Switch-like structure for each hand type
        if hand_type == "Royal Flush":
            play_hand_type("Royal Flush")  # No attributes needed
        elif hand_type == "Straight Flush":
            play_generic_hand("Straight Flush", attributes[0])  # Attr = High of straight
        elif hand_type == "Four of a Kind":
            play_generic_hand("Four of a Kind", attributes[0])  # Attr = rank of quads
        elif hand_type == "Full House":
            play_full_house(attributes)  # Attr = Trip Card rank, Pair Card rank
        elif hand_type == "Flush":
            play_generic_hand("Flush", attributes[0])  # Attr = High of Flush
        elif hand_type == "Straight":
            play_generic_hand("Straight", attributes[0])  # Attr = High of straight
        elif hand_type == "Three of a Kind":
            play_generic_hand("Three of a Kind", attributes[0])  # Attr = Trip Card rank
        elif hand_type == "Two Pair":
            pass  # play_generic_hand("Two Pair", attributes[:2])  TODO: Attr = High Pair, Low Pair rank
        elif hand_type == "One Pair":
            play_one_pair(attributes)  # Handle the One Pair hand type
        elif hand_type == "High Card":
            play_generic_hand("High Card", attributes[0])  # High Card

        # Winning player
        play_player_name(name)
        play_random_sound("player-actions/win")


if __name__ == '__main__':
    import server.src.game.hand_analysis.main_hand_analysis

    play_winners_sound(server.src.game.hand_analysis.main_hand_analysis.main())
    time.sleep(1)

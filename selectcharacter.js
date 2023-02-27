const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const characterMusic = document.getElementById('selectcharacterMusic')
const toggleMusic = document.getElementById("button1");
    toggleMusic.addEventListener("click", () => {
      characterMusic.paused ? characterMusic.play() : characterMusic.pause();
    });
const characters = document.querySelectorAll('.character');
      let selectedCharacter = null;

      characters.forEach((character) => {
        character.addEventListener('click', () => {
          if (selectedCharacter) {
            selectedCharacter.classList.remove('selected');
          }
          selectedCharacter = character;
          selectedCharacter.classList.add('selected');
        });
      });

//If there is already a selected character remove the 'selected' class from that character element.
//Assign the clicked character element to the selectedCharacter variable.
//Add the 'selected' class to the clicked character element. The 'selected' class is used to visually indicate which character is currently selected.
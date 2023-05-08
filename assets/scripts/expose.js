// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // Initialize variables for image and audio sources
  let soundImageSrc = "assets/images/no-image.png";
  let soundFileSrc = "";
  let hornSound = document.querySelector("audio");
  let volumeImage = document.querySelector("#volume-controls img");
  let volume = document.querySelector("#volume-controls input");

  // Update the image and audio sources based on the selected horn
  function updateSound() {
    const hornSelect = document.getElementById("horn-select");
    const soundImage = document.getElementById("expose").querySelector("img");

    // Update the image and audio sources based on the selected horn
    if (hornSelect.value === "air-horn") {
      soundImageSrc = "assets/images/air-horn.svg";
      soundFileSrc = "assets/audio/air-horn.mp3";
    } else if (hornSelect.value === "car-horn") {
      soundImageSrc = "assets/images/car-horn.svg";
      soundFileSrc = "assets/audio/car-horn.mp3";
    } else if (hornSelect.value === "party-horn") {
      soundImageSrc = "assets/images/party-horn.svg";
      soundFileSrc = "assets/audio/party-horn.mp3";
    } else {
      soundImageSrc = "assets/images/no-image.png";
      soundFileSrc = "";
    }

    soundImage.src = soundImageSrc;
    hornSound.src = soundFileSrc;
  }

  // Update the volume icon and audio volume based on the volume range input
  function updateVolume() {
    const hornSelect = document.getElementById("horn-select");

    // Update the volume icon and audio volume based on the volume range input
    if (volume.value >= 67) {
      volumeImage.src = "assets/icons/volume-level-3.svg";
    } else if (volume.value >= 34) {
      volumeImage.src = "assets/icons/volume-level-2.svg";
    } else if (volume.value >= 1) {
      volumeImage.src = "assets/icons/volume-level-1.svg";
    } else {
      volumeImage.src = "assets/icons/volume-level-0.svg";
    }

    hornSound.volume = volume.value / 100;
  }

  // Play the sound when the "Play Sound" button is clicked
  function playSound(event) {
    event.preventDefault();
    hornSound.play();

    // Add confetti when the party horn is selected and the volume is greater than 0
    if (document.getElementById("horn-select").value === "party-horn" && volume.value > 0) {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
    }
  }

  // Attach event listeners to the volume and horn select elements
  volume.addEventListener("input", updateVolume);
  document.getElementById("horn-select").addEventListener("change", updateSound);
  document.querySelector("button").addEventListener("click", playSound);
}

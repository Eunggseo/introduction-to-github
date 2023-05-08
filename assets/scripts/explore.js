// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const voiceSelect = document.getElementById('voice-select');
  const textToSpeak = document.getElementById('text-to-speak');
  const speakButton = document.querySelector('button');
  const faceImage = document.querySelector('img');
  const openFaceSrc = 'assets/images/smiling-open.png';
  const closedFaceSrc = 'assets/images/smiling.png';
  let speaking = false;

  // Populate voice options dropdown
  function populateVoiceList() {
    const voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();

  // Speak the text with the selected voice
  function speakText() {
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const utterance = new SpeechSynthesisUtterance(textToSpeak.value);
    const voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedVoice) {
        utterance.voice = voices[i];
        break;
      }
    }

    utterance.addEventListener('start', () => {
      speaking = true;
      faceImage.src = openFaceSrc;
    });

    utterance.addEventListener('end', () => {
      speaking = false;
      faceImage.src = closedFaceSrc;
    });

    synth.speak(utterance);
  }

  // Bind click event to speak button
  speakButton.addEventListener('click', () => {
    if (!speaking) {
      speakText();
    }
  });
}

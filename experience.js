// Interactive details for the complete romantic experience.
(() => {
  // Switching to any playlist song pauses the opening soundtrack.
  const backgroundSong = document.getElementById('background-song');
  document.querySelectorAll('.song-player audio').forEach(player => {
    player.addEventListener('play', () => {
      if (backgroundSong && !backgroundSong.paused) backgroundSong.pause();
    });
  });

  // Every song is an independent native audio player.
  document.querySelectorAll('.song-player audio').forEach(player => {
    player.addEventListener('error', () => {
      const details = player.closest('.song-player')?.querySelector('.song-details');
      if (details) {
        const note = document.createElement('small');
        note.textContent = 'audio could not be loaded';
        details.appendChild(note);
      }
    });
  });

  const notes = {
    'bad-day': 'on the days that feel too heavy, please remember you do not have to have everything figured out. take a breath, be gentle with yourself, and know that i am always in your corner. ♡',
    'miss-you': 'if i could, i would steal a little time, sit next to you, listen to all your random stories and make you laugh until you forget what you were missing. until then, consider this a tiny hug from me.',
    'smile': 'hi cutuba. this is your completely unnecessary reminder that you are loved, appreciated and ridiculously special to me. now please smile a little. yes, right now. ✧'
  };
  document.querySelectorAll('.secret-envelope').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.secret-envelope').forEach(item => item.classList.remove('is-open'));
      button.classList.add('is-open');
      document.getElementById('letter-reveal-text').textContent = notes[button.dataset.letter];
    });
  });

  document.querySelectorAll('.star-point').forEach(star => {
    star.addEventListener('click', () => {
      document.querySelectorAll('.star-point').forEach(item => item.classList.remove('active'));
      star.classList.add('active');
      document.getElementById('star-message').textContent = star.dataset.star + ' — one of a hundred little things i adore about you. ♡';
    });
  });

  const questions = [
    { q: 'where did we first meet?', options: ['rishikesh', 'jim corbett', 'instagram'], answer: 1, yes: 'yess. uttarakhand, january. the beginning of our favourite coincidence. ♡' },
    { q: 'what did you ask me about at jim corbett?', options: ['the safari timing', 'gypsy seat allotments', 'the weather'], answer: 1, yes: 'you remembered. the legendary gypsy seat allotments. ✧' },
    { q: 'what made us start talking on instagram?', options: ['a mutual friend', 'a random follow', 'my phone’s ghost touch issue'], answer: 2, yes: 'exactly. that stubborn phone deserves a thank-you note. ♡' }
  ];
  let index = 0, score = 0, answered = false;
  const qTitle = document.getElementById('quiz-question');
  const options = document.getElementById('quiz-options');
  const feedback = document.getElementById('quiz-feedback');
  const next = document.getElementById('quiz-next');
  const count = document.getElementById('quiz-count');
  const scoreEl = document.getElementById('quiz-score');
  function renderQuestion() {
    const item = questions[index];
    answered = false;
    count.textContent = 'question ' + (index + 1) + ' of ' + questions.length;
    qTitle.textContent = item.q;
    feedback.textContent = 'pick your answer, jaanu.';
    next.disabled = true;
    next.textContent = index === questions.length - 1 ? 'see our little result ♡' : 'next little question →';
    options.innerHTML = '';
    item.options.forEach((label, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const correct = i === item.answer;
        if (correct) score++;
        [...options.children].forEach((choice, j) => {
          choice.disabled = true;
          if (j === item.answer) choice.classList.add('correct');
          else if (j === i) choice.classList.add('wrong');
          if (j === i) choice.classList.add('chosen');
        });
        feedback.textContent = correct ? item.yes : 'closeee. the answer was ' + item.options[item.answer] + '. but you still get all my love. ♡';
        scoreEl.textContent = '♡ ' + score;
        next.disabled = false;
      });
      options.appendChild(button);
    });
  }
  if (qTitle && options && next) {
    renderQuestion();
    next.addEventListener('click', () => {
      if (!answered) return;
      if (index < questions.length - 1) { index++; renderQuestion(); }
      else {
        qTitle.textContent = 'you got ' + score + ' out of 3. ♡';
        options.innerHTML = '';
        feedback.textContent = 'but the best part of our story is still being written. and i hope we keep making memories worth remembering.';
        count.textContent = 'little quiz complete';
        next.textContent = 'play again ↺';
        next.disabled = false;
        next.onclick = () => { index = 0; score = 0; scoreEl.textContent = '♡ 0'; next.onclick = null; renderQuestion(); };
      }
    });
  }

  const bigButton = document.getElementById('big-surprise');
  const bigContent = document.getElementById('big-surprise-content');
  if (bigButton && bigContent) {
    bigButton.addEventListener('click', () => {
      const open = bigContent.classList.toggle('show');
      bigButton.textContent = open ? 'keep this little memory close ♡' : 'open the last little surprise ♡';
      if (open) bigContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
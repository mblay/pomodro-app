const dropupBtn = () => {
  document.getElementById("myContent").classList.toggle("show")
}

const removeBtn =() => {
  document.getElementById("myContent").classList.remove("show")
}



const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    sessions: 0,
  };
  
  let interval;
  
  const getRemainingTime = endTime => {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;
  
    const total = parseInt(difference / 1000);
    const minutes = parseInt((total / 60) % 60);
    const seconds = parseInt(total % 60);
  
    return {
      total,
      minutes,
      seconds,
    };
  }
  
  const updateClock = () => {
    const { remainingTime } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  
    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    const time = `${minutes}:${seconds}`;
    min.textContent = minutes;
    sec.textContent = seconds;
  }

  const startTimer = () => {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;
  
    if (timer.mode === 'pomodoro') timer.sessions++;
  
    mainButton.dataset.action = 'pause';
    mainButton.classList.add('active');
    mainButton.textContent = 'pause';


    // mainButton.dataset.action = 'restart';
    // mainButton.classList.add('active');
    // mainButton.textContent = 'restart';
  
    interval = setInterval( () => {
      timer.remainingTime = getRemainingTime(endTime);
      total = timer.remainingTime.total;
      updateClock();
      if (total <= 0) {
        clearInterval(interval);
  
        switch (timer.mode) {
          case 'pomodoro':
            if (timer.sessions % timer.longBreakInterval === 0) {
              switchMode('longBreak');
            } else {
              switchMode('shortBreak');
            }
            break;
          default:
            switchMode('pomodoro');
        }
  
        if (Notification.permission === 'granted') {
          const text =
            timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
          new Notification(text);
        }
  
        document.querySelector(`[data-sound="${timer.mode}"]`).play();
        startTimer();
      }
    }, 1000);
  }
  
  const stopTimer = () => {
    clearInterval(interval);
  
    mainButton.dataset.action = 'start';
    mainButton.classList.remove('active');
    mainButton.textContent = 'start';
  }
  
  const switchMode = mode => {
    timer.mode = mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };
  
    document
      .querySelectorAll('button[data-mode]')
      .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    // document
    //   .getElementById('js-progress')
    //   .setAttribute('max', timer.remainingTime.total);
    // document.body.style.color = `var(--${mode})`;
  
    updateClock();
  }
  
  const handleMode = event => {
    const { mode } = event.target.dataset;
  
    if (!mode) return;
  
    timer.sessions = 0;
    switchMode(mode);
    stopTimer();
  }
  
  const buttonSound = new Audio('button-sound.mp3');
  const mainButton = document.getElementById('js-btn');
  mainButton.addEventListener('click', () => {
    const { action } = mainButton.dataset;
    buttonSound.play();
    if (action === 'start') {
      startTimer();
    } else {
      stopTimer();
    }
  });
  
  const modeButtons = document.querySelector('#js-mode-buttons');
  modeButtons.addEventListener('click', handleMode);

  const btn1 = () => {
    document.getElementById("js-pomodoro").style.backgroundColor = "#f87070";
    document.getElementById("js-pomodoro").style.color = "#161932";
    // document.getElementById("js-short-break").style.color = "#f87070"
    // document.getElementById("js-long-break").style.color = "#f87070"
  }

  const btn2 = () => {
    document.getElementById("js-pomodoro").style.backgroundColor = "#70F3F8";
    document.getElementById("js-pomodoro").style.color = "#161932";
    // document.getElementById("js-short-break").style.color = "#f87070"
    // document.getElementById("js-long-break").style.color = "#f87070"
  }

  const btn3 = () => {
    document.getElementById("js-pomodoro").style.backgroundColor = "#D881F8";
    document.getElementById("js-pomodoro").style.color = "#161932";
    // document.getElementById("js-short-break").style.color = "#f87070"
    // document.getElementById("js-long-break").style.color = "#f87070"
  }

  const btn4 = () => {
    document.getElementById("js-pomodoro").style.fontFamily = "sans-serif";
    document.getElementById("js-pomodoro").style.fontWeight = "700";
    document.getElementById("timely").style.fontFamily = "sans-serif";
    document.getElementById("js-short-break").style.fontFamily = "sans-serif";
    document.getElementById("js-long-break").style.fontFamily = "sans-serif";
  };

  const btn5 = () => {
    document.getElementById("js-pomodoro").style.fontFamily = "Roboto Slab";
    document.getElementById("js-pomodoro").style.fontWeight = "700";
    document.getElementById("timely").style.fontFamily = "Roboto Slab";
    document.getElementById("js-short-break").style.fontFamily = "Roboto-Slab";
    document.getElementById("js-long-break").style.fontFamily = "Roboto-Slab";
  }
  const btn6 = () => {
    document.getElementById("js-pomodoro").style.fontFamily = "Space Mono";
    document.getElementById("js-pomodoro").style.fontWeight = "700";
    document.getElementById("timely").style.fontFamily = "Space Mono";
    document.getElementById("js-short-break").style.fontFamily = "Space Mono";
    document.getElementById("js-long-break").style.fontFamily = "Space Mono";
  }


const increamentCount = document.getElementById("increase-count");
const decrementCount = document.getElementById("decrease-count");
var totalCount = document.getElementById('pomodoro-count');

var count = 0;
totalCount.innerHTML = count;

const handleIncrement = () => {
  count++;
  totalCount.innerHTML = count;
};
const handleDecrement = () => {
  count--;
  totalCount.innerHTML = count;
};

increamentCount.addEventListener("click", handleIncrement);
decrementCount.addEventListener("click", handleDecrement);


 
  
  document.addEventListener('DOMContentLoaded', () => {
    switchMode('pomodoro');
  });
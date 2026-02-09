//progress
function getProgressData() {
  return JSON.parse(localStorage.getItem("progressData")) || {
    focusMinutes: 0,
    completedTasks: 0,
    toolsUsed: {
      focus: 0,
      tasks: 0,
      anchorbot: 0,
      costcounter: 0
    },
    activeDays: [],
    consecutiveDays: 0
  };
}

function saveProgressData(data) {
  localStorage.setItem("progressData", JSON.stringify(data));
}

function markActiveDay(data) {
  const today = new Date().toDateString();
  
  data.activeDays = [...new Set(data.activeDays)];
  data.activeDays.sort((a, b) => new Date(a) - new Date(b));
  
  if (!data.activeDays.includes(today)) {
    data.activeDays.push(today);
  }
  
  let consecutiveDays = 0;
  const todayDate = new Date();
  
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(todayDate);
    checkDate.setDate(todayDate.getDate() - i);
    const dateString = checkDate.toDateString();
    
    if (data.activeDays.includes(dateString)) {
      consecutiveDays++;
    } else {
      break;
    }
  }
  
  data.consecutiveDays = consecutiveDays;
}


//gsap and locomotive setup
gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed"
});
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
  locoScroll.update();
});
function circleMouseFollower() {
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.left = dets.clientX + "px";
        document.querySelector("#minicircle").style.top = dets.clientY + "px";
    });
}
circleMouseFollower()

//Animations
function homepageanimation() {
  gsap.set("#nav a", { y: -10, opacity: 0 });

  const tl = gsap.timeline({ delay: 0.2 });

  tl.to("#nav a", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  })
  .to(".boundingelem", {
    y: 0,
    duration: 1.8,
    stagger: 0.15,
    ease: "expo.out"
  }, "-=0.6")
  .from("#herofooter", {
    y: 10,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.8");
}

gsap.from("#intro h2, #intro p", {
  y: 40,
  opacity: 0,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#intro",
    start: "top 75%",
    scroller: "#main"
  }
});

gsap.from("#text h5", {
  y: 20,
  opacity: 0,
  scrollTrigger: {
    trigger: "#text",
    start: "top 80%",
    scroller: "#main"
  }
});

gsap.from("#second .element", {
  y: 80,
  opacity: 0,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#second",
    start: "top 70%",
    scroller: "#main"
  }
});

gsap.from("#skill-box", {
  x: -100,
  opacity: 0,
  scrollTrigger: {
    trigger: "#tracker-section",
    start: "top 70%",
    scroller: "#main"
  }
});

gsap.from("#cost-counter", {
  x: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: "#tracker-section",
    start: "top 70%",
    scroller: "#main"
  }
});

gsap.from("#focus-title h4", {
  x: -80,
  opacity: 0,
  scrollTrigger: {
    trigger: "#focus-mode-section",
    start: "top 70%",
    scroller: "#main"
  }
});

gsap.from("#focus-intro p", {
  x: 80,
  opacity: 0,
  delay: 0.2,
  scrollTrigger: {
    trigger: "#focus-mode-section",
    start: "top 70%",
    scroller: "#main"
  }
});

gsap.from("#timer", {
  y: 80,
  opacity: 0,
  scrollTrigger: {
    trigger: "#focus-mode-section",
    start: "top 65%",
    scroller: "#main"
  }
});

gsap.from("#progress-title h3, #progress-title p", {
  y: 30,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#progress-section",
    start: "top 75%",
    scroller: "#main"
  }
});

gsap.from("#progress-container", {
  y: 60,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#progress-section",
    start: "top 70%",
    scroller: "#main"
  }
});
gsap.from(".progress-card", {
  y: 40,
  opacity: 0,
  duration: 0.9,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".progress-card",
    start: "top 75%",
    scroller: "#main"
  }
});
document.querySelectorAll(".progress-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -6,
      scale: 1.03,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      scale: 1,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      duration: 0.3
    });
  });
});

document.querySelectorAll("#second .element").forEach(elem => {
  elem.addEventListener("mouseenter", () => {
    gsap.to(elem, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  elem.addEventListener("mouseleave", () => {
    gsap.to(elem, {
      scale: 1,
      duration: 0.3
    });
  });
});

homepageanimation();

//anchorbot
document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "How are you feeling right now?",
            options: [
                { text: "Good", points: 0 },
                { text: "Okay", points: 1 },
                { text: "Stressed", points: 2 }
            ]
        },
        {
            question: "Did social media make you feel left out today?",
            options: [
                { text: "Yes", points: 2 },
                { text: "No", points: 0 },
                { text: "Not really", points: 1 }
            ]
        },
        {
            question: "Have you compared yourself to others recently?",
            options: [
                { text: "Yes, a lot", points: 2 },
                { text: "A little", points: 1 },
                { text: "Not really", points: 0 }
            ]
        },
        {
            question: "Is your mind overthinking what others are doing?",
            options: [
                { text: "Yes", points: 2 },
                { text: "Sometimes", points: 1 },
                { text: "No", points: 0 }
            ]
        },
        {
            question: "Do you feel pressure to keep up with others online?",
            options: [
                { text: "Yes", points: 2 },
                { text: "Maybe", points: 1 },
                { text: "No", points: 0 }
            ]
        }
    ];

    const tips = {
        low: "You’re doing well! Keep a balanced digital routine. Try a 2–3 min break to refresh your mind.",
        medium: "You might be feeling some FOMO pressure. Put your phone down for 30 seconds, breathe deeply, and remind yourself everyone moves at their own pace.",
        high: "You seem overwhelmed. Try grounding: Look around → Name 5 things you can see. Breathe slowly → In for 4 sec, out for 4. You’re safe. You’re enough."
    };

    const chatBody = document.getElementById("chat-body");
    const inputArea = document.getElementById("chat-inputarea");

    let currentQuestion = 0;
    let stressScore = 0;

    
    function typeMessage(message, callback, speed = 30) {
        const lastBotMsg = chatBody.querySelector(".bot-msg");
        if (lastBotMsg) lastBotMsg.remove();

        const p = document.createElement("div");
        p.classList.add("message", "bot-msg");
        p.textContent = "";
        chatBody.appendChild(p);

        let i = 0;
        function type() {
            if (i < message.length) {
                p.textContent += message.charAt(i);
                i++;
                chatBody.scrollTop = chatBody.scrollHeight;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    function displayUserChoice(choice) {
        const lastUserMsg = chatBody.querySelector(".user-msg");
        if (lastUserMsg) lastUserMsg.remove();

        const p = document.createElement("div");
        p.textContent = choice;
        p.classList.add("message", "user-msg");
        chatBody.appendChild(p);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showQuestion() {
        inputArea.innerHTML = "";

        if (currentQuestion < questions.length) {
            const q = questions[currentQuestion];

            typeMessage(q.question, () => {
                q.options.forEach(option => {
                    const btn = document.createElement("button");
                    btn.textContent = option.text;
                    btn.classList.add("choice-btn");
                    btn.onclick = () => {
                        stressScore += option.points;
                        displayUserChoice(option.text);
                        currentQuestion++;
                        showQuestion();
                    };
                    inputArea.appendChild(btn);
                });
            });
        } else {
            inputArea.innerHTML = "";

            let level = "";
            if (stressScore <= 2) level = "low";
            else if (stressScore <= 5) level = "medium";
            else level = "high";

            typeMessage("AnchorBot Tip:", () => {
                typeMessage(tips[level]);
let data = getProgressData();
data.toolsUsed.anchorbot += 1;
markActiveDay(data);
saveProgressData(data);
updateProgressDisplay(); 

            });
        }
    }

    showQuestion();
});
//cost counter
document.addEventListener("DOMContentLoaded", () => {
    const wastedInput = document.getElementById("wasted-time");
    const logBtn = document.querySelector(".log-btn");
    const resultCard = document.querySelector(".cost-result-card");
    const resultValue = resultCard.querySelector(".result-value");
    const nothingText = resultCard.querySelector(".nothing");

    let trendGraph = document.createElement("div");
    trendGraph.id = "trend-graph";
    trendGraph.style.display = "flex";
    trendGraph.style.alignItems = "flex-end";
    trendGraph.style.gap = "6px";
    trendGraph.style.height = "40px"; 
    trendGraph.style.marginTop = "10px";
    trendGraph.style.overflowX = "auto";
    resultCard.appendChild(trendGraph);

    function fadeIn(element) {
        element.classList.remove("fade-in");
        void element.offsetWidth;
        element.classList.add("fade-in");
    }

    function getSuggestion(minutes) {
        if (minutes === 0) return "Amazing! No wasted minutes 💛";
        if (minutes < 30) return "Small amount wasted. Reclaim 10–15 min for yourself ✨";
        if (minutes < 120) return "Consider focusing on a small goal today 🌱";
        if (minutes < 300) return "Try to structure your time to reduce distractions ⚡";
        return "High distraction detected! Take 5 min to breathe and refocus 🧘‍♀️";
    }

    function updateTrend(minutes) {
        let history = JSON.parse(localStorage.getItem("fomoTrendHistory")) || [];
        history.push(minutes);
        if (history.length > 7) history.shift();
        localStorage.setItem("fomoTrendHistory", JSON.stringify(history));

        trendGraph.innerHTML = "";

        history.forEach((m, index) => {
            const barContainer = document.createElement("div");
            barContainer.style.display = "flex";
            barContainer.style.flexDirection = "column";
            barContainer.style.alignItems = "center";
            barContainer.style.width = "30px";
            barContainer.style.gap = "2px";

            const bar = document.createElement("div");
            bar.style.width = "100%";
            bar.style.height = `${Math.min(m * 0.4, 40)}px`;
             bar.style.background = "#80A1BA"
            bar.style.borderRadius = "4px";
            bar.style.transition = "height 0.4s ease";

            const label = document.createElement("div");
            label.textContent = `D${index + 1}`;
            label.style.fontSize = "0.6rem";
            label.style.color = "#000";

            barContainer.appendChild(bar);
            barContainer.appendChild(label);
            trendGraph.appendChild(barContainer);
        });

        fadeIn(trendGraph);
    }

    logBtn.addEventListener("click", () => {
        let minutes = parseFloat(wastedInput.value);
        if (isNaN(minutes) || minutes < 0) {
            resultValue.textContent = "Please enter a valid number!";
            nothingText.style.display = "none";
            fadeIn(resultCard);
            return;
            
        }
let data = getProgressData();
data.toolsUsed.costcounter += 1;
markActiveDay(data);
saveProgressData(data);
updateProgressDisplay(); 

        resultValue.innerHTML = `
            <strong>${minutes} min</strong> wasted this week 😞<br>
            <small style="font-size: 0.8rem; opacity: 0.8;">
            That equals:<br>
            • ${Math.floor(minutes / 30)} JS topics<br>
            • ${Math.floor(minutes / 20)} React components<br>
            • ${Math.floor(minutes / 10)} short walks<br>
            • ${Math.floor(minutes / 15)} meditation sessions<br>
            <br><strong>Suggestion:</strong> ${getSuggestion(minutes)}
            </small>
        `;

        nothingText.style.display = "none";
        fadeIn(resultCard);
        updateTrend(minutes);
        wastedInput.value = "";
    });
});


//timer section

const pomoDisplay = document.getElementById("pomodoro-display");
const manualDisplay = document.getElementById("manual-display");

const pomoStart = document.getElementById("pomodoro-start");
const pomoPause = document.getElementById("pomodoro-pause");
const pomoReset = document.getElementById("pomodoro-reset");

const manualStart = document.getElementById("manual-start");
const manualPause = document.getElementById("manual-pause");
const manualReset = document.getElementById("manual-reset");

const manualHours = document.getElementById("manual-hours");
const manualMins = document.getElementById("manual-mins");

const tabs = document.querySelectorAll(".tab");
const pomoScreen = document.getElementById("pomodoro-timer");
const manualScreen = document.getElementById("manual-timer");

const goalSelector = document.getElementById("goal-selector");

let pomoSeconds = 25 * 60;
let manualSeconds = 0;
let manualInitialSeconds = 0;

let pomoInterval = null;
let manualInterval = null;

// alarm sound 
function playAlarmSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        
        osc2.frequency.value = 800;
        osc2.type = 'sine';
        
        gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.5);
    }, 600);
}


function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function updatePomoDisplay() {
    pomoDisplay.textContent = formatTime(pomoSeconds);
}

function updateManualDisplay() {
    manualDisplay.textContent = formatTime(manualSeconds);
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        pomoScreen.style.display = tab.dataset.tab === "pomodoro" ? "block" : "none";
        manualScreen.style.display = tab.dataset.tab === "manual" ? "block" : "none";
    });
});

pomoScreen.style.display = "block";
manualScreen.style.display = "none";


pomoStart.addEventListener("click", () => {
    if (!goalSelector.value) {
        alert("Please select a goal first.");
        return;
    }

    if (pomoInterval) return;

    pomoInterval = setInterval(() => {
        if (pomoSeconds > 0) {
            pomoSeconds--;
            updatePomoDisplay();
        } else {
            clearInterval(pomoInterval);
            pomoInterval = null;
            playAlarmSound();
            alert("🎉 Well done! Pomodoro completed. Take a short break 💪");
            markSelectedTaskDone();
let data = getProgressData();
    data.completedTasks += 1;
    data.toolsUsed.tasks += 1;
    markActiveDay(data);
    saveProgressData(data);
    updateProgressDisplay();

        }
    }, 1000);
});

pomoPause.addEventListener("click", () => {
    clearInterval(pomoInterval);
    pomoInterval = null;
});

pomoReset.addEventListener("click", () => {
    clearInterval(pomoInterval);
    pomoInterval = null;
    pomoSeconds = 25 * 60;
    updatePomoDisplay();
});

manualStart.addEventListener("click", () => {
    if (!goalSelector.value) {
        alert("Please select a goal first.");
        return;
    }

    if (manualInterval) return;

    if (manualSeconds === 0) {
        const h = parseInt(manualHours.value) || 0;
        const m = parseInt(manualMins.value) || 0;

        if (h === 0 && m === 0) {
            alert("Please enter hours or minutes.");
            return;
        }

        manualInitialSeconds = h * 3600 + m * 60;   // ✅ store original time
        manualSeconds = manualInitialSeconds;
    }

    updateManualDisplay();

    manualInterval = setInterval(() => {
        if (manualSeconds > 0) {
            manualSeconds--;
            updateManualDisplay();
        } else {
            clearInterval(manualInterval);
            manualInterval = null;
            playAlarmSound();
           alert("✅ Great job! You completed your focus session 🚀");
            markSelectedTaskDone();

            let data = getProgressData();
            data.focusMinutes += Math.floor(manualInitialSeconds / 60);
            data.toolsUsed.focus += 1;
            markActiveDay(data);
            saveProgressData(data);
            updateProgressDisplay();
        }
    }, 1000);
});


manualPause.addEventListener("click", () => {
    clearInterval(manualInterval);
    manualInterval = null;
});

manualReset.addEventListener("click", () => {
    clearInterval(manualInterval);
    manualInterval = null;
    manualSeconds = 0;
    manualHours.value = "";
    manualMins.value = "";
    updateManualDisplay();
});

//skill focus tracker
const addBtn = document.querySelector('.add-btn');
const newTaskInput = document.getElementById('new-task-input');
const taskList = document.querySelector('.task-list');

const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');


function updateProgress() {
    const tasks = document.querySelectorAll('.task-item');
    let completed = 0;

    tasks.forEach(task => {
        const checkbox = task.querySelector('.task-check');
        if ((checkbox && checkbox.checked) || task.style.opacity === '0.6') {
            completed++;
        }
    });

    const percent = tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    progressBar.style.width = percent + '%';
    progressText.textContent = `${percent}% completed`;
}

function trackTaskCompletion() {
    let data = getProgressData();
    data.completedTasks += 1;
    data.toolsUsed.tasks += 1;
    markActiveDay(data);
    saveProgressData(data);
    updateProgressDisplay();
}

function createTask(text) {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
        <label>
            <input type="checkbox" class="task-check">
            ${text}
        </label>
        <div style="display:flex; gap:.5rem">
            <button class="delete-btn done-btn">✔ done</button>
            <button class="delete-btn remove-btn">remove</button>
        </div>
    `;

    li.querySelector('.done-btn').onclick = () => {
    li.style.opacity = '0.6';
    li.querySelector('.task-check').checked = true;
    updateProgress();
    updateGoalDropdown();
    trackTaskCompletion();
};


    li.querySelector('.remove-btn').onclick = () => {
        li.remove();
        updateProgress();
        updateGoalDropdown();
    };

    return li;
}

document.querySelectorAll(".task-item").forEach(task => {
    const doneBtn = task.querySelector("button");
    const checkbox = task.querySelector(".task-check");

    if (doneBtn) {
        doneBtn.addEventListener("click", () => {
            task.style.opacity = "0.6";
            if (checkbox) checkbox.checked = true;
            trackTaskCompletion();
            updateProgress();
        });
    }
});

function bindPermanentTasks() {
    document.querySelectorAll('.task-item').forEach(task => {
        const checkbox = task.querySelector('.task-check');
        const doneBtn = task.querySelector('.done-btn');

        if (doneBtn) {
            doneBtn.onclick = () => {
                task.style.opacity = '0.6';
                if (checkbox) checkbox.checked = true;
                trackTaskCompletion();
                updateProgress();
                updateGoalDropdown();
            };
        }
    });
}

addBtn.addEventListener('click', () => {
    const text = newTaskInput.value.trim();
    if (!text) return;

    taskList.appendChild(createTask(text));
    newTaskInput.value = "";
    updateProgress();
    updateGoalDropdown();
});

function updateGoalDropdown() {
    const prev = goalSelector.value;
    goalSelector.innerHTML = `<option disabled selected>-- Select a goal --</option>`;

    document.querySelectorAll(".task-item").forEach(task => {
        const text = task.querySelector("label").innerText.trim();
        const opt = document.createElement("option");
        opt.value = text;
        opt.textContent = text;
        goalSelector.appendChild(opt);
    });

    goalSelector.value = prev;
}

function markSelectedTaskDone() {
    document.querySelectorAll(".task-item").forEach(task => {
        if (task.querySelector("label").innerText.trim() === goalSelector.value) {
            task.style.opacity = '0.6';
            task.querySelector('.task-check').checked = true;
        }
    });

    updateProgress();
    updateGoalDropdown();
}
bindPermanentTasks();
updateProgress();
updateGoalDropdown();

//progress page
const progressCards = document.querySelectorAll(".progress-card");

function updateProgressDisplay() {
  if (progressCards.length > 0) {
    try {
      const data = getProgressData();

      if (data) {
        if (progressCards[0]) {
          progressCards[0].querySelector(".value").innerText =
            `${data.focusMinutes || 0} min`;
        }

        if (progressCards[1]) {
          progressCards[1].querySelector(".value").innerText =
            `${(data.consecutiveDays && data.consecutiveDays) || 0} days`;
        }

        const totalToolsUsed =
          (data.toolsUsed && data.toolsUsed.focus || 0) +
          (data.toolsUsed && data.toolsUsed.tasks || 0) +
          (data.toolsUsed && data.toolsUsed.anchorbot || 0) +
          (data.toolsUsed && data.toolsUsed.costcounter || 0);

        if (progressCards[2]) {
          progressCards[2].querySelector(".value").innerText = totalToolsUsed;
        }

        // Completed Tasks
        if (progressCards[3]) {
          progressCards[3].querySelector(".value").innerText =
            data.completedTasks || 0;
        }
      }
    } catch (error) {
      console.error("Error loading progress data:", error);
      progressCards.forEach((card, index) => {
        const valueElement = card.querySelector(".value");
        if (valueElement) {
          valueElement.innerText = "0";
        }
      });
    }
  }
}

updateProgressDisplay();

window.addEventListener('storage', (e) => {
  if (e.key === 'progressData') {
    updateProgressDisplay();
  }
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateProgressDisplay();
  }
});


const journalBox = document.querySelector(".journal");

if (journalBox) {
  const textarea = journalBox.querySelector("textarea");
  const saveBtn = journalBox.querySelector("button");
  const entriesContainer = journalBox.querySelector(".entries");

  let journalEntries =
    JSON.parse(localStorage.getItem("journalEntries")) || [];

  renderEntries();

  saveBtn.addEventListener("click", () => {
    const text = textarea.value.trim();
    if (!text) return;

    const entry = {
      id: Date.now(),
      content: text,
      date: new Date().toLocaleDateString()
    };

    journalEntries.unshift(entry); 
    localStorage.setItem(
      "journalEntries",
      JSON.stringify(journalEntries)
    );

    textarea.value = "";
    renderEntries();
  });
  function renderEntries() {
    entriesContainer.innerHTML = "";

    if (journalEntries.length === 0) {
      entriesContainer.innerHTML =
        `<div class="entry">No entries yet.</div>`;
      return;
    }

    journalEntries.forEach(entry => {
      const div = document.createElement("div");
      div.className = "entry";
      div.innerHTML = `
        <p>${entry.content}</p>
        <small>${entry.date}</small>
        <button class="delete-entry">Delete</button>
      `;
      div.querySelector(".delete-entry").addEventListener("click", () => {
        journalEntries = journalEntries.filter(e => e.id !== entry.id);
        localStorage.setItem(
          "journalEntries",
          JSON.stringify(journalEntries)
        );
        renderEntries();
      });

      entriesContainer.appendChild(div);
    });
  }
}


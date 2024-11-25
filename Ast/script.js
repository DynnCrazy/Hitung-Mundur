let countdownInterval;

const events = {
  "Bulan Oktober": {
    date: "2024-10-01",
    duration: 24 * 60 * 60 * 1000
  },
  "Sumpah Pemuda": {
    date: "2024-10-28",
    duration: 24 * 60 * 60 * 1000
  },
  "Halloween": {
    date: "2024-10-31",
    duration: 24 * 60 * 60 * 1000
  },
  "Bulan November": {
    date: "2024-11-01",
    duration: 24 * 60 * 60 * 1000
  },
  "Hari Pahlawan": {
    date: "2024-11-10",
    duration: 24 * 60 * 60 * 1000
  },
  "Hari Guru": {
    date: "2024-11-25",
    duration: 24 * 60 * 60 * 1000
  },
  "Bulan Desember": {
    date: "2024-12-01",
    duration: 24 * 60 * 60 * 1000
  },
  "Hari Ibu": {
    date: "2024-12-22",
    duration: 24 * 60 * 60 * 1000
  },
  "Natal": {
    date: "2024-12-25",
    duration: 24 * 60 * 60 * 1000
  },
  "Tahun Baru 2025": {
    date: "2025-01-01",
    duration: 24 * 60 * 60 * 1000
  },
  "Bulan Februari": {
    date: "2025-02-01",
    duration: 24 * 60 * 60 * 1000
  },
  "Hari Valentine": {
    date: "2025-02-14",
    duration: 24 * 60 * 60 * 1000
  },
  "Tahun 2045": {
    date: "2045-01-01",
    duration: 24 * 60 * 60 * 1000
  }
};

function populateEventOptions() {
  const select = document.getElementById("event-select");
  const now = new Date().getTime();

  for (const [key, value] of Object.entries(events)) {
    const eventDate = new Date(value.date).getTime();
    const eventDurationEnd = eventDate + value.duration;

    if (now < eventDurationEnd && now >= eventDate) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = `${key}`;
      select.appendChild(option);
    } else if (now < eventDate) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = `${key}`;
      select.appendChild(option);
    }
  }
}

function startCountdown() {
  document.getElementById("event-selection").style.display = "none";
  document.getElementById("refresh-button").style.display = "inline-block";

  let selectedEvent = document.getElementById("event-select").value;
  document.getElementById("ttlwb").innerHTML = "Hitung Mundur " + selectedEvent; 

  clearInterval(countdownInterval);

  let selectedDate;

  const customDateInput = document.getElementById("custom-date").value;
  if (customDateInput) {
      selectedDate = new Date(customDateInput).getTime();
      document.getElementById("ttlwb").innerHTML = "Hitung Mundur"; 
  } else {
      selectedDate = new Date(events[selectedEvent].date).getTime();
  }

  let eventDuration = events[selectedEvent]?.duration || 0;

  let now = new Date().getTime();
  let difference = selectedDate - now;

  countdownInterval = setInterval(() => {
      now = new Date().getTime();
      difference = selectedDate - now;

      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (difference >= 0) {
          document.getElementById("tday").innerHTML = `${days}`;
          document.getElementById("thour").innerHTML = `${hours}`;
          document.getElementById("tminute").innerHTML = `${minutes}`;
          document.getElementById("tsecond").innerHTML = `${seconds}`;
          document.getElementById("timecount").style.display = "flex";
      } else {
          let eventDurationEnd = selectedDate + eventDuration;
          if (now < eventDurationEnd) {
              document.querySelector(".countdown").innerHTML = "Acara sedang berlangsung.";
              document.getElementById("timecount").style.display = "none";
          } else {
              document.querySelector(".countdown").innerHTML = "Acara berakhir.";
              document.getElementById("timecount").style.display = "none";
          }
      }
  }, 1000);
}

window.onload = populateEventOptions;


setInterval(() => {
  console.log("Unix Timestamp (Seconds):", Math.floor(Date.now() / 1000));
}, 1000);

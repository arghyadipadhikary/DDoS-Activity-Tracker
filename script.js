const ctx = document.getElementById("trafficChart").getContext("2d");
const websiteInput = document.getElementById("websiteInput");
const monitorButton = document.getElementById("monitorButton");
const statusElement = document.getElementById("status");

// Traffic data simulation
let trafficData = [];
let labels = [];
let intervalId = null;

// Chart setup
const trafficChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Incoming Traffic (Requests/sec)",
        data: trafficData,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        borderWidth: 2,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time"
        }
      },
      y: {
        title: {
          display: true,
          text: "Requests/sec"
        },
        min: 0
      }
    }
  }
});

// Format time to Asia/Kolkata timezone
function getCurrentTimeInKolkata() {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata"
  }).format(new Date());
}

// Start monitoring
monitorButton.addEventListener("click", () => {
  const website = websiteInput.value.trim();
  if (!website) {
    alert("Please enter a website URL.");
    return;
  }

  // Reset previous data
  trafficData.length = 0;
  labels.length = 0;
  trafficChart.update();
  statusElement.textContent = "Status: Monitoring...";

  // Simulate traffic
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    const traffic = Math.floor(Math.random() * 200); // Random traffic data
    const time = getCurrentTimeInKolkata();

    labels.push(time);
    trafficData.push(traffic);

    if (labels.length > 20) {
      labels.shift();
      trafficData.shift();
    }

    trafficChart.update();

    // Check for DDoS attack
    if (traffic > 150) {
      statusElement.textContent = `Status: DDoS Attack Detected on ${website}!`;
      statusElement.style.color = "red";
    } else {
      statusElement.textContent = `Status: ${website} is running normally.`;
      statusElement.style.color = "lime";
    }
  }, 1000);
});

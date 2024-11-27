// Store chart instances globally to allow clearing
let heartRateChart, caloriesChart, sleepPatternChart, exerciseChart;

// Function to create the heart rate time series chart
function createHeartRateChart(timeLabels, heartRates) {
    const ctx = document.getElementById('heartRateChart').getContext('2d');
    if (heartRateChart) heartRateChart.destroy(); // Destroy previous instance
    heartRateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Heart Rate (bpm)',
                data: heartRates,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Function to create the calories burned bar chart
function createCaloriesChart(activityLabels, caloriesBurned) {
    const ctx = document.getElementById('caloriesChart').getContext('2d');
    if (caloriesChart) caloriesChart.destroy(); // Destroy previous instance
    caloriesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: activityLabels,
            datasets: [{
                label: 'Calories Burned',
                data: caloriesBurned,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to create the sleep pattern scatter plot
function createSleepPatternChart(sleepHours, sleepQuality) {
    const ctx = document.getElementById('sleepPatternChart').getContext('2d');
    if (sleepPatternChart) sleepPatternChart.destroy(); // Destroy previous instance
    sleepPatternChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Sleep Quality (%) vs. Hours Slept',
                data: sleepHours.map((hours, index) => {
                    return { x: hours, y: sleepQuality[index] };
                }),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(0,130,0,1)',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours Slept'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sleep Quality (%)'
                    }
                }
            }
        }
    });
}

// Function to create the exercise routines scatter plot
function createExerciseChart(exerciseDuration, exerciseIntensity) {
    const ctx = document.getElementById('exerciseChart').getContext('2d');
    if (exerciseChart) exerciseChart.destroy(); // Destroy previous instance
    exerciseChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Exercise Intensity (%) vs. Duration (mins)',
                data: exerciseDuration.map((duration, index) => {
                    return { x: duration, y: exerciseIntensity[index] };
                }),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Duration (mins)'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Exercise Intensity (%)'
                    }
                }
            }
        }
    });
}

// Function to process user input and generate the charts
document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get user inputs and split them into arrays
    const heartRates = document.getElementById('heartRateInput').value.split(',').map(Number);
    const timeLabels = document.getElementById('timeInput').value.split(',');

    const caloriesBurned = document.getElementById('caloriesInput').value.split(',').map(Number);
    const activityLabels = document.getElementById('activityLabelsInput').value.split(',');

    const sleepHours = document.getElementById('sleepHoursInput').value.split(',').map(Number);
    const sleepQuality = document.getElementById('sleepQualityInput').value.split(',').map(Number);

    const exerciseDuration = document.getElementById('exerciseDurationInput').value.split(',').map(Number);
    const exerciseIntensity = document.getElementById('exerciseIntensityInput').value.split(',').map(Number);

    // Generate the charts based on user input
    createHeartRateChart(timeLabels, heartRates);
    createCaloriesChart(activityLabels, caloriesBurned);
    createSleepPatternChart(sleepHours, sleepQuality);
    createExerciseChart(exerciseDuration, exerciseIntensity);
});

// Function to clear all data and visuals
document.getElementById('clearDataButton').addEventListener('click', function () {
    // Destroy all chart instances
    if (heartRateChart) heartRateChart.destroy();
    if (caloriesChart) caloriesChart.destroy();
    if (sleepPatternChart) sleepPatternChart.destroy();
    if (exerciseChart) exerciseChart.destroy();

    // Clear input fields
    document.getElementById('heartRateInput').value = '';
    document.getElementById('timeInput').value = '';
    document.getElementById('caloriesInput').value = '';
    document.getElementById('activityLabelsInput').value = '';
    document.getElementById('sleepHoursInput').value = '';
    document.getElementById('sleepQualityInput').value = '';
    document.getElementById('exerciseDurationInput').value = '';
    document.getElementById('exerciseIntensityInput').value = '';

    // Clear canvas elements
    const canvasIds = ['heartRateChart', 'caloriesChart', 'sleepPatternChart', 'exerciseChart'];
    canvasIds.forEach(id => {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});

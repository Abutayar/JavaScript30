const secondHand = document.querySelector("#sec");
const minsHand = document.querySelector("#min");
const hourHand = document.querySelector("#hrs");
const clock = document.querySelector("#clock");

const { clientHeight } = clock;

clock.style.setProperty("--clock-height", clientHeight + "px");

class App {
  static setDate() {
    // Get the current date and time
    const now = new Date();

    // Calculate seconds and convert to degrees for second hand rotation
    const seconds = now.getSeconds(); // 0 - 59
    const secondsDegrees = seconds * 6; // Each second corresponds to 6 degrees rotation
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // Rotate the second hand

    // Calculate minutes and convert to degrees for minute hand rotation
    const mins = now.getMinutes(); // 0 - 59
    // Considering the progress within the current minute (using seconds) for more accuracy
    const minsDegrees = (mins + seconds / 60) * 6; // Each minute corresponds to 6 degrees rotation
    minsHand.style.transform = `rotate(${minsDegrees}deg)`; // Rotate the minute hand

    // Calculate hours and convert to degrees for hour hand rotation
    let hour = now.getHours(); // 0 - 23
    // Adjust hour for AM/PM format (optional)
    if (hour > 12) {
      hour -= 12;
    }
    // Considering the progress within the current hour (using minutes) for more accuracy
    const hourDegrees = (hour + mins / 60) * 30; // Each hour corresponds to 30 degrees rotation (12 hours total)
    hourHand.style.transform = `rotate(${hourDegrees}deg)`; // Rotate the hour hands
  }
}

App.setDate();

setInterval(App.setDate, 1000);

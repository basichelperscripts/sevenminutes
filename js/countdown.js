let currentTime = Date.parse(new Date());
let deadline = new Date(currentTime + timeInSeconds*1000);
$initialDeadline = new Date();

let currentTimer = initializeClock('clockdiv', deadline);

function minutes_since_epoch(d){
    return Math.floor( d / 1000 / 60 );
}

function increaseTotalTime()
{
    let minutes = minutes_since_epoch(new Date()) - minutes_since_epoch($initialDeadline);
    document.getElementById("globalTimeTaken").innerHTML = minutes;
}

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function increaseStep() {
    let count = parseInt($counter.value);
    if (count < 6)
    {
        $counter.value = parseInt($counter.value) + 1;
        index++;
    }
    else {
        // Reset counter at limit
        $counter.value = 0;
        index = 0;
    }
    // refresh values on the screen
    document.getElementsByTagName("h1")[0].innerHTML = period[index].title;
    document.getElementById("describeMe").innerHTML = period[index].description;

    // Clear interval
    clearInterval(currentTimer);
    // Set new time
    timeInSeconds = period[index].time;

    let newTime = Date.parse(new Date());
    let newdeadline = new Date(newTime + timeInSeconds*1000);

    currentTimer = initializeClock('clockdiv', newdeadline);
}

/// initialize a clock for a given HTML attribute id and endtime
function initializeClock(id, endtime) {
    let clock = document.getElementById(id);
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    let t = getTimeRemaining(endtime);
    increaseTotalTime();

    if (t.total > 0) {
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    }
    else {
            minutesSpan.innerHTML = '00';
            secondsSpan.innerHTML = '00';
        }

        if (t.total <= 0) {
            clearInterval(timeinterval);
            if (sessionStorage.sevenMinutesSound === "true") {
                ion.sound.play("bell_ring");
            }
            if (sessionStorage.auto === "true")
            {
                increaseStep();
            }
        }
    }

    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
    return timeinterval;
}

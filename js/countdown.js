var currentTime = Date.parse(new Date());
var deadline = new Date(currentTime + timeInSeconds*1000);

var currentTimer = initializeClock('clockdiv', deadline);

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
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

/// initialize a clock for a given id and endtime
function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

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
            ion.sound.play("bell_ring");
            if (sessionStorage.auto == "true")
            {
                increaseStep();
            }
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
    return timeinterval;
}

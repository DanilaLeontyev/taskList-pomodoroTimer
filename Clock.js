let canvas = document.getElementById('clock');
let ctx = canvas.getContext('2d');
let ring = document.getElementById('ring');
let startTomato = document.getElementById('startTomato');
let check = false;
let nowMin = 0;
let nowSec = 0;
let noSound = false;

function clock() {
    let date = new Date();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.translate(150, 150);
    ctx.rotate(-Math.PI);
    ctx.save();

    // часовые деления
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(0, 100);
        ctx.lineTo(0, 125);
        ctx.stroke();
    }
    ctx.restore();

    //минутные деления
    ctx.save();
    for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 30);
        ctx.moveTo(0, 120);
        ctx.lineTo(0, 125);
        ctx.stroke();
    }
    ctx.restore();

    let sec = date.getSeconds();
    let min = date.getMinutes();
    let hr = date.getHours();

    hr = hr >= 12 ? hr - 12 : hr;
    // часовая стрелка
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 60);
    ctx.stroke();
    ctx.restore();

    //минутная стрелка
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.rotate((Math.PI / 30) * min);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 90);
    ctx.stroke();
    ctx.restore();

    //Секундная стрелка
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.rotate(sec * Math.PI / 30);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 110);
    ctx.stroke();
    ctx.restore();

    // Окружность часов
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'red';
    ctx.arc(0, 0, 140, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.restore();

    if (check === true) {
        // Время работы
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(43, 255, 89, 0.5)';
        ctx.lineWidth = 20;
        ctx.lineCap = 'butt';
        ctx.rotate(Math.PI / 2); // Где появилось смещение я хз
        ctx.arc(0, 0, 120,
            (Math.PI / 30) * nowMin,
            (Math.PI / 30) * (nowMin + 25));
        ctx.stroke();
        
        // Время отдыха
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(219, 39, 51, 0.5)';   
        ctx.arc(0, 0, 120,
            (Math.PI / 30) * (nowMin + 25),
            (Math.PI / 30) * (nowMin + 30));
        ctx.stroke();
        ctx.restore();

        
        if (min === nowMin + 25 && noSound === false) {
            ring.play();
            noSound = true;
        }
        if(min === nowMin + 30 && noSound === true) {
            ring.play();
            noSound = false;
            check = false;
            addInterval();
        }
    }

    ctx.restore();
}

setInterval(clock, 1000);

function addInterval() {
    check === false ? check = true : check = false;
    let nowDate = new Date();

    if(check === true) {
        startTomato.play();
    }
    setTimeout(function() {
        startTomato.pause();
    }, 3000);

    nowMin = nowDate.getMinutes();
    nowSec = nowDate.getSeconds();
}


canvas.addEventListener('click', addInterval);



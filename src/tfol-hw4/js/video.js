// Answer choices
var answers = [
    'A.  is able to hold a roll of tape',
    'B.  has a mechanism at one end to shear the tape',
    'C.  varies based on the tape it dispenses'
];

var stopPlayAt = 357, // Stop play at time in seconds
    stopPlayTimer;   // Reference to settimeout call

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'qe1y-jaXe4E',
        //  wmode: transparent  makes HTML goes on top of Flash
        //  fs: disable full screen
        playerVars: {//'autoplay': 0,
            'wmode': 'transparent',
            'fs': 0,
            'controls':1,
            'rel':0,
            'modestbranding':1,
            'showinfo':0},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
//                'onError': onPlayerError,
        }
    });
    document.getElementById('player').style['z-index']=-10;
    document.getElementById('player').style['-webkit-transform']='translateZ(0)';
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    var time, rate, remainingTime;
    clearTimeout(stopPlayTimer);
    if (event.data == YT.PlayerState.PLAYING) {
        time = player.getCurrentTime();
//            setTimeout(stopVideo, 6000);
//            done = true;
        // Add .4 of a second to the time in case it's close to the current time
        if (time + .5 < stopPlayAt) {
            rate = player.getPlaybackRate();
            remainingTime = (stopPlayAt - time) / rate;
            stopPlayTimer = setTimeout(pauseVideo, remainingTime * 1000);
        }
    }
}
function pauseVideo() {
    player.pauseVideo();
    // Display quiz
    setupQuiz();
}


function setupQuiz() {
    var bgDiv = document.createElement('div');
    bgDiv.setAttribute('id', 'quizbg');
    $('#player').after(bgDiv);
    var quizDiv = document.createElement('div');
    quizDiv.setAttribute('class', 'quizDiv');
    quizDiv.setAttribute('id', 'questionPane');
    $('#player').after(quizDiv);

    // Add answer choices to the quiz
    addChoices();

    //Setup Submit / Skip Buttons
    var buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('id','buttonDiv');
    buttonDiv.setAttribute('class','bottomAlign');
    // buttonDiv.innerHTML = "<button onclick='submitAns("+qTime+")'>Submit</button> <button onclick='closeQPane()'>Close</button><br />";
    buttonDiv.innerHTML = "<button onclick='submitAns()'>Check Your Answer</button>";
    quizDiv.appendChild(buttonDiv);
    $("button").button();

}

function addChoices() {
    var i = 0;
    for (var j=0; j < answers.length; j++) {
        var quizTable = document.createElement('table');
        quizTable.setAttribute('id', 'choice'+i);
        quizTable.setAttribute('class','qChoice');
        document.getElementById('questionPane').appendChild(quizTable);

        var tr = document.createElement('tr');
        tr.setAttribute('class','qTableRow');
        tr.setAttribute("id","ansID" + i);

        var td1 = document.createElement('td');
        td1.setAttribute('class','qTableCheck');
        td1.innerHTML='<input class="choices" id="check'+i+'" type="checkbox" /><label class="checkButton"  id="label'+i+'"  for="check'+i+'"></label>';

        var td2 = document.createElement('td');
        td2.setAttribute('id', 'textCell'+i);
        td2.setAttribute('class','qTableAns');
        td2.innerHTML='<div class="mcAns" id="ansText'+i+'"></div>';
        tr.appendChild(td1);
        tr.appendChild(td2);
        quizTable.appendChild(tr);

        $("#check"+i)[0].checked=false;
        $("#check"+i).button({text:false});
            //Handle the toggling graphics (showing check or not) and radio button behavior
        $("#check"+i).change( function (evt) {handleChange(evt.target);});

        document.getElementById('ansText'+i).innerHTML=answers[j];

        i++;
    }
}

function handleChange(input) {

    //Default Behavior -- Checkbox
    if (input.checked) {
        $(input).button('option','icons', {primary: "ui-icon-check"});
    }
    else {
        $(input).button('option','icons', {primary: "ui-icon-blank"});
    }
}

function submitAns() {
    var allcorrect = true;

    var allChecked = document.getElementById('check0').checked &&
                     document.getElementById('check1').checked &&
                     document.getElementById('check2').checked;
    if (!allChecked) {
        allcorrect = false;
    }

    if (allcorrect){
        alert('You got it!');
        closeQPane();
    } else{
        alert('Hint: Think about the tape dispensers you have interacted with. Maybe those on desks, and those bigger ones that tape a paper box.');
    }
}

function closeQPane() {
    $("div#questionPane").remove();
    $("div#quizbg").remove();

    player.seekTo(372);
    player.playVideo();
}


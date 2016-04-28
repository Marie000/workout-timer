//timer display and basic functionning 


var Timer = {
  currentMinutes: 0,
  currentSeconds: 0,
  timerSetting:'up',
  reverseTimer:function(){
    if(this.timerSetting==='up' && Workout.totalTime>0){
      this.timerSetting='down';
    }
    else {
      this.timerSetting='up';
    }
  },
  adjustDisplay:function(input){
    if(input<10){
      return '0'+input.toString();
    } else {
      return input.toString();
    }
  },
  //returns time - but does not display it (that is done by refreshDisplay) - who names these functions?
  displayTimer: function(minutes, seconds) {
    if(this.timerSetting==='up'){
    return Timer.adjustDisplay(minutes) + ":" + Timer.adjustDisplay(seconds);
    } else { //reversed (countdown)
      if(seconds===0){
        return (this.adjustDisplay(Workout.totalTime-minutes))+":00";
      } else {
        return (this.adjustDisplay(Workout.totalTime-minutes-1))+":"+(this.adjustDisplay(60-seconds));
      }
    }
  },
  refreshDisplay: function(minutes, seconds) {
    document.getElementById('timer').innerHTML = Timer.displayTimer(minutes,seconds);
    Timer.currentMinutes=minutes;
    Timer.currentSeconds=seconds;
  },
  //check if it is time to sound an alarm.
  checkTime:function(minutes,seconds){
    for(var i=1;i<10;i++){
    if(minutes===Workout.sectionTime*i && seconds===0){
       Alarm.displayMessage(i);
      }
    else if(minutes===Workout.totalTime && seconds===0){
      Alarm.displayMessage(0);
    }
    }

  },
  startTimer: function() {
    var currentSeconds = this.currentSeconds;
    var currentMinutes = this.currentMinutes;
    var refreshDisplay = this.refreshDisplay;
    var checkTime = this.checkTime;
    document.getElementById('startButton').disabled=true;
    this.timerInterval = setInterval(function() {
      if (currentSeconds === 59) {
        currentSeconds = 0;
        currentMinutes++;
      } else {
        currentSeconds++;
      }
      refreshDisplay(currentMinutes, currentSeconds);
      checkTime(currentMinutes,currentSeconds);
    }, 1000);
  },
  pauseTimer:function(){
    clearInterval(this.timerInterval);
    document.getElementById('startButton').disabled=false;
  },
  resetTimer:function(){
    clearInterval(this.timerInterval);
    this.currentSeconds=0;
    this.currentMinutes=0;
    this.refreshDisplay(0,0);
    document.getElementById('startButton').disabled=false;
    Workout.setDifficulty(Workout.difficulty);
  }
};

Timer.refreshDisplay(Timer.currentMinutes, Timer.currentSeconds);

//unrelated to the Timer file (just not sure where to put it)
var changeIcon=function(){
  if(document.getElementById('icon').className==="glyphicon glyphicon-chevron-up"){
    document.getElementById('icon').className="glyphicon glyphicon-chevron-down";
  } else {
    document.getElementById('icon').className="glyphicon glyphicon-chevron-up";
  }
};

//TIMER//
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
  displayTimer: function(minutes, seconds) {
    if(this.timerSetting==='up'){
    return Timer.adjustDisplay(minutes) + ":" + Timer.adjustDisplay(seconds);
    } else {
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
  checkTime:function(minutes,seconds){
    for(var i=1;i<10;i++){
    if(minutes===Workout.sectionTime*i && seconds===0){
       Alarm.displayMessage(i);
      } 
    else if(minutes===Workout.totalTime && seconds===0){
      Alarm.displayMessage(0)
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
    }, 100);
  },
  pauseTimer:function(){
    clearInterval(this.timerInterval);
    document.getElementById('startButton').disabled=false;
  },
};

Timer.refreshDisplay(Timer.currentMinutes, Timer.currentSeconds);

//WORKOUT//
var Workout = {
  totalTime:0,
  sectionTime:0,
  numOfIntervals:0,
  setSectionTime:function(time){
      switch(time){
        case 10:
        case 15:
        case 25:
          this.sectionTime=time/5;
          this.numOfIntervals=5;
          break;
        case 20:
        case 30:
        case 40:
          this.sectionTime=time/10;
          this.numOfIntervals=10;
      }
  },
  displayGoal:function(time){
    document.getElementById('goal').innerHTML = time+" minutes";
  },
  setGoal:function(goal){
    this.totalTime=goal;
    this.displayGoal(goal);
    this.setSectionTime(goal);
    console.log(this.sectionTime);
  },
  workoutType:"none chosen",
  workoutIntervals:[],
  difficulty:'medium',
  setType:function(type){
    this.workoutType=type;
    this.displayType(type);
    switch(type){
      case 'long distance':
        if(this.numOfIntervals===5){
          this.workoutIntervals=[3,5,5,5,3];
        } else {
          this.workoutIntervals=[3,4,5,5,5,5,5,5,4,3];
        }
        break;
      case 'uphill':
        if(this.numOfIntervals===5){
          this.workoutIntervals=[3,5,6,7,3];
        }else {
          this.workoutIntervals=[3,4,4,5,5,6,6,7,4,3];
        }
        break;
      case 'climb':
        if(this.numOfIntervals===5){
          this.workoutIntervals=[3,5,7,5,3];
        }else {
          this.workoutIntervals=[3,3,4,5,6,7,6,5,4,3];
        }
        break;
     case 'intervals':
        if(this.numOfIntervals===5){
          this.workoutIntervals=[3,7,3,7,3];
        }else {
          this.workoutIntervals=[3,3,4,7,4,7,4,7,4,3];
        }
        break;
      case 'random':
        this.workoutIntervals=[3];
        var length=this.numOfIntervals-2;
        for(var i=0;i<length;i++){
     this.workoutIntervals.push((Math.floor(Math.random()*5)+3));
        }
        this.workoutIntervals.push(3);
        break;
    }
    console.log(this.workoutIntervals);
  },
  setDifficulty:function(difficulty){
    this.difficulty=difficulty;
    switch(difficulty){
      case 'easy':
        document.getElementById('message').innerHTML="Start your workout at level 2";
        break;
      case 'medium':
        document.getElementById('message').innerHTML="Start your workout at level 3";
        break;
      case 'hard':
        document.getElementById('message').innerHTML="Start your workout at level 4";
    }
  },
  displayType:function(type){
    document.getElementById('type').innerHTML= type;
  },
};
Workout.displayGoal(0);
Workout.displayType("none chosen");

//ALARM//
var Alarm = {
  blink:function(){
    var count=0;
    var color="white";
      this.blinkInterval = setInterval(function(){
        if (count===20){
          clearInterval(this.blinkInterval);
        } else {
            if(color==="white"){
            document.getElementById('message').style.color="grey";
            color="grey";
            count++;
          } else {
            document.getElementById('message').style.color="white";
            color="white";
            count++;
          }
        }
      },250);
  },
  bell: new Audio('./sound/Bike-ring-bell.mp3'),
  displayMessage:function(number){
        Alarm.bell.play();
        if(number===0){
              document.getElementById('message').innerHTML="Your workout is over.\n Well done!";
              this.blink();
              Timer.pauseTimer();
        } else {
        if(number<Workout.workoutIntervals.length){
        var nextLevel = Workout.workoutIntervals[number];
          if(Workout.difficulty==='easy'){
            nextLevel--;
          } else if (Workout.difficulty==='hard'){
            nextLevel++;
          }
          if(Workout.workoutIntervals[number]===Workout.workoutIntervals[number-1]){
            document.getElementById('message').innerHTML="Keep your level at "+nextLevel;
            this.blink();
          } else {
            document.getElementById('message').innerHTML="Change your level to "+nextLevel;
            this.blink();
          }
        } else if(number===Workout.workoutIntervals.length){
          document.getElementById('message').innerHTML="Your workout is over.\n Well done!";
          this.blink();
          Timer.pauseTimer();
        }
      }
    },
};
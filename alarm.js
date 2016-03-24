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
var Workout = {
  totalTime:document.getElementById('setGoal').value,
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


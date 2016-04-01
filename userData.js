var UserData = {
	users:["marie","maurice"],
	currentUser:'',
	ref:new Firebase('https://workout-timer.firebaseio.com/'),
	calories:null,
	distance:null,
	day:0,
	month:0,
	year:0,
	prompt:function(){
		document.getElementById('resultTime').innerHTML=Workout.totalTime;
		document.getElementById('resultDifficulty').innerHTML=Workout.difficulty;
		document.getElementById('resultType').innerHTML=Workout.workoutType;
		document.getElementById('modalButton').style.display="block";
		this.getDate();
		var database = this.ref.child('users').child('marie').child('workouts');
		database.push({time:Workout.totalTime,difficulty:Workout.difficulty,type:Workout.workoutType})
	},
	getDate: function(){
		var date = new Date();
		this.day = date.getDate();
		this.month = date.getMonth()+1;
		this.year = date.getFullYear();
	}
};


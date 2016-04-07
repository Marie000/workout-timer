var UserData = {
	users:["marie","maurice"],
	currentUser:'',
	ref:new Firebase('https://workout-timer.firebaseio.com/'),
	calories:null,
	distance:null,
	date:0,
	prompt:function(){
		document.getElementById('resultTime').innerHTML=Workout.totalTime;
		document.getElementById('resultDifficulty').innerHTML=Workout.difficulty;
		document.getElementById('resultType').innerHTML=Workout.workoutType;
		document.getElementById('modalButton').style.display="inline-block";
		this.getDate();
		document.getElementById('date').innerHTML=this.date;

	},
	submitCalories: function(){
		this.calories = document.getElementById('caloriesInput').value
		document.getElementById('caloriesSection').innerHTML = this.calories;
	},
	submitDistance: function(){
		this.distance = document.getElementById('distanceInput').value
		document.getElementById('distanceSection').innerHTML = this.distance;
	},
	submitToDatabase: function(){
		var database = this.ref.child('users').child('marie').child('workouts');
		database.push({time:Workout.totalTime,difficulty:Workout.difficulty,type:Workout.workoutType,
			date:this.date,calories:this.calories,distance:this.distance})
		document.getElementById('modal-body').innerHTML = "Data submitted."
	},
	getDate: function(){
		var date = new Date();
		this.date = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
	}
};


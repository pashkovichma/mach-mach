window.addEventListener("load", function() {
	var difficulty = 4,
		skirt = 9,
		etalon_array = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg'],
		memory_array = [],
		check_array = [],
		rulesField = document.getElementById("rulesField"),
		gameField = document.getElementById("gameField"),
		btnNewGame = document.getElementById("newGame"),
		btnSkirt1 = document.getElementById("skirt1"),
		btnSkirt2 = document.getElementById("skirt2"),
		btnSkirt3 = document.getElementById("skirt3"),
		openedCards = 0,
		btnDifficultyLow = document.getElementById("difficultyLow"),
		btnDifficultyMedium = document.getElementById("difficultyMedium"),
		btnDifficultyHight = document.getElementById("difficultyHight"),
		btnShowRules = document.getElementById("showRules"),
	    secs,
	    mins,
	    timer,
	    timerMove,
	    flag=0,
	    timerField = document.getElementById("timer");
	
		btnNewGame.addEventListener("click",fNewGame);
		btnSkirt1.addEventListener("click", ()=>skirt=9);
		btnSkirt2.addEventListener("click", ()=>skirt=10);
		btnSkirt3.addEventListener("click", ()=>skirt=11);
		btnShowRules.addEventListener("click",fShowRules);
		btnDifficultyLow.addEventListener("click", ()=>difficulty=4);
		btnDifficultyMedium.addEventListener("click", ()=>difficulty=6);
		btnDifficultyHight.addEventListener("click", ()=>difficulty=8);
	
	function fShowRules(){
		rulesField.classList.toggle("unvisible");
		if(btnShowRules.innerHTML == "Show Rules"){
			btnShowRules.innerHTML = "Hide Rules"
		}
		else btnShowRules.innerHTML = "Show Rules";
	}  

	function fNewGame(){
		if(timerField.classList.contains("unvisible")){
			timerField.classList.remove("unvisible");
		}
		flag = 0;
		fTimer();
		rulesField.classList.add("unvisible");
		if (btnShowRules.classList.contains("unvisible")){
			btnShowRules.classList.remove("unvisible");
		}
		fNewBoard(difficulty);
	}

	Array.prototype.memory_tile_shuffle = function(){
	    function compareRandom(a, b) {
  			return Math.random() - 0.5;
		}
		this.sort(compareRandom);
	}

	function fNewBoard(difficulty){
		memory_array =[];
		var output = '';
		gameField.innerHTML = output;

		for (var q = 0; q<difficulty; q++){
			memory_array[q] = etalon_array[q];
		}
		memory_array = memory_array.concat(memory_array);
		memory_array.memory_tile_shuffle();
			
	    for (var i = 0; i < memory_array.length; i++){
	    	var	a = document.createElement("button"),
				b = document.createElement("div"),
				c = document.createElement("div"),
				d = document.createElement("div");

	    	a.setAttribute("id",'x'+i);
    		b.setAttribute("id",'y'+i);
    		a.classList.add("flip");
	    	b.classList.add("card");
	   		c.classList.add("face");
	    	c.classList.add("front");
	    	d.classList.add("face");
	    	d.classList.add("back");
	    	c.style.backgroundImage = 'url("img/'+skirt+'.jpg")';

    		gameField.appendChild(a);
		    a.appendChild(b);
		    b.appendChild(c);
		    b.appendChild(d);
		    d.style.backgroundImage = 'url("'+memory_array[i]+'")';
		}  

	   	for(var j = 0; j < memory_array.length; j++){
	    	var el1 = document.getElementById('x'+j);				
	   		el1.addEventListener("click",fFlip);
		}
	}

	function fFlip(){
		this.firstChild.classList.toggle("flipped");
		this.disabled = true;
		check_array.push(this);
		if(check_array.length == 2){
			if(check_array[0].firstChild.lastChild.style.backgroundImage == check_array[1].firstChild.lastChild.style.backgroundImage){
				fMove(check_array[0]);
				fMove(check_array[1]);
				check_array = [];
				openedCards += 2;
			}
			else{
				setTimeout(func1,150);
				function func1(){
					check_array[0].firstChild.classList.toggle("flipped");
					check_array[1].firstChild.classList.toggle("flipped");
					check_array[0].disabled = false;
					check_array[1].disabled = false;
					check_array = [];
				}
			}
			if(openedCards == difficulty*2){
				timerField.classList.add("unvisible");
			}
			setTimeout(
			()=>{if(openedCards == difficulty*2){
				flag = 1;
				alert("You\'ve matched all cards in "+mins + "minutes "+(secs-1)+" seconds. Let\'s try again!");
				gameField.innerHTML = "";
				openedCards = 0;				
			}}, 1000);
		}
	}

	function fMove(card){
		var start = Date.now(), 
			timerMove = setInterval(function() {
               var timePassed = Date.now() - start;
			    card.style.left = timePassed / 2 + 'px';
       			if (timePassed > 2000) clearInterval(timerMove);
		    }, 20);
	}

  	function fTimer(){
		if (timer){
			clearInterval(timer);
		} 
		mins = 0;
	 	secs = 0;
	 	if(secs<10){
		   	secs = "0"+secs;
		}
	 	timerField.innerHTML = mins + ' : ' + secs;
		timer = setInterval(fTimerOn, 1000);
	}
	function fTimerOn() {
	   	if(flag==1){
			clearInterval(timer);
		}
		if (secs==59){
	   		mins++;
	   		secs = 0;
	   	}
	   	else secs++;
	   	if(secs<10){
	   	secs = "0"+secs;
		}	
		timerField.innerHTML = mins + ':' + secs;
	}
})
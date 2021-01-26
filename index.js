function $(id) {
    return document.getElementById(id);
  }
let gameMode = ""; 
let arrayOfNames = [];
let arrayOfPoints = [];
let icons = [];
//Halado stringek
let firstChar_h = "123";
let secondChar_h = "HOS";
let thirdChar_h = "grp";
let fourthChar_h = "DPS";
//kezdőstringek
function beginnerCardsGenerate(){
    let firstChar = "123";
    let secondChar = "S"
    let thirdChar = "grp";
    let fourthChar = "DPS";
    let tmpString ="";
    for(let i = 0; i < firstChar.length;i++)
    {
        for(let j = 0; j < secondChar.length;j++)
        {
            for(let index = 0; index < thirdChar.length;index++)
                {
                    for(let index2 = 0; index2 < fourthChar.length;index2++)
                    {
                        
                        tmpString = firstChar.charAt(i) + secondChar.charAt(j) + thirdChar.charAt(index) +  fourthChar.charAt(index2);
                        let cardObject = {name:tmpString, isOnBoard:false, isAlreadyOut:false};
                        icons.push(cardObject);
                    }
                }
        }
    }
    shuffle(icons);
    console.log(icons);
}
function clickOnNumberOfPlayersBtn(){
    $('addPlayersName').hidden = false;
    document.getElementById('addPlayersName').innerHTML = "";
    let numberOfPlayers = $("numberOfPlayers").value;
    if(numberOfPlayers > 10){
        $("numberOfPlayers").value = 10; 
        numberOfPlayers = 10; 
    }
    if(numberOfPlayers < 1){
        $("numberOfPlayers").value = 1; 
        numberOfPlayers = 1; 
    }
    for(let i = 0 ; i < numberOfPlayers;i++)
    {
        let playerString = "Játékos" + (i+1);
        let textString = (i+1) + ".játékos";
        let textfield = document.createElement("input");
        textfield.type = "text";
        textfield.className = "names";
        textfield.value = playerString;
        document.getElementById('addPlayersName').append(textString);
        document.getElementById('addPlayersName').appendChild(textfield);
    }
    $('nameOfPlayersBtn').hidden = false;
    $('numberOfPlayers').disabled = true; 
    $('numberOfPlayersBtn').disabled = true; 
}
let nameAndPointsObject = {}; 
function clickOnNamesOfPlayersBtn(){
    arrayOfNames = []; 
    arrayOfPoints = [];
    let inputsNames = document.getElementsByClassName('names');
    for(let i = 0; i < inputsNames.length;i++){
        nameAndPointsObject = { name: inputsNames[i].value, points: 0};
        arrayOfNames.push(nameAndPointsObject);
    }
    $('addPlayersName').hidden = true;
    $('nameOfPlayersBtn').hidden = true;
    let s = ""; 
    $('playersName').hidden = false;
    let numberOfPlayers = $("numberOfPlayers").value;
    for(let i = 0 ; i < numberOfPlayers;i++)
    {
        s += "<li>";
        s += arrayOfNames[i].name; 
        s += "</li>";
    }
    $("nameListed").innerHTML += s;
}
let listString = [];
function showNamesList(){
    $('lista').innerHTML = "";
    listString  = ""; 
    for(let i = 0; i < arrayOfNames.length;i++){
        listString += "<li id='"+ (i+1)+"'>";
        listString += arrayOfNames[i].name + " " + arrayOfNames[i].points + "pont";
        listString += "</li>";
    }
    $('lista').innerHTML = listString;
}
function showResult(){
    arrayOfNames.sort(compare).reverse();
    $('lista').innerHTML = "";
    listString  = ""; 
    for(let i = 0; i < arrayOfNames.length;i++){
        listString += "<li id='"+ (i+1)+"'>";
        listString += arrayOfNames[i].name + " " + arrayOfNames[i].points + "pont";
        listString += "</li>";
    }
    $('result').innerHTML = listString;
    $('result').hidden = false;
    
}

function setGameMode(){
    gameMode = $('gameMode').value;
    if (gameMode === '') {
        alert('Érdeklődni kötelező!');
    }
    else if(gameMode == "gyakorlo"){
        $('moreSetting').hidden = false;
        $('gameModeBtn').disabled = true;
    }
    else if(gameMode == "verseny"){
        $('moreSetting').hidden = true;
        $('no_isSet').checked = true; 
        $('no_showSet').checked = true; 
        $('auto').checked = true; 
        $('gameModeBtn').disabled = true;
    }
}
///*GAME TABLE --> Start game után */
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
let iconsOnBoard = [];
function startGame(){
    if (gameMode === '') {
        alert('Érdeklődni kötelező!');
    }
    else if(arrayOfNames.length == 0)
    {
        alert('Játékosok számának megadása kötelező!');
    }
    else
    {
        showNamesList();
        $('gameView').hidden = false;
        $('settingsView').hidden = true;
        if(gameMode == "gyakorlo"){
            $('practiseMode').hidden = false; 
            if($('yes_isSet').checked)
            {
                $('isSet').hidden = false;
            }
            if($('yes_showSet').checked)
            {
                $('showSet').hidden = false;
            }
            if($('notAuto').checked)
            {
                $('addThreeCards').hidden = false;
            }
        }
        else if(gameMode == "verseny")
        {
            $('practiseMode').hidden = false; 
            $('no_isSet').checked = true; 
            $('isSet').hidden = true;
            $('no_showSet').checked = true;
            $('showSet').hidden = true;
            ('auto').checked = true;
            $('addThreeCards').hidden = true;
        }
        beginnerCardsGenerate();
        if(arrayOfNames.length == 1)
        {
            document.getElementById('lista').classList.toggle('selected');
            isOneNameSelected = true;
            if(gameMode == "verseny"){
                $('stopper').hidden = false; 
                timer();
            }
        }
    }
    drawFirstBoard();
    const ul = document.querySelector('#lista');
    ul.addEventListener('click', selectSetter);
}
let table = "" ;
let rows = 3;
let cols = 4;
function drawFirstBoard(){
    let number = 0; 
    table = "";
    for(let i = 0; i < rows;i++)
    {
        let stringMyRow = "myRow";
        table += "<tr id=" + '"' + stringMyRow  + '">';
        for(let j = 0; j < cols;j++)
        {
            let picture = "<td id='" + i.toString() + j.toString() + "'><img id='"+ icons[number].name +"' src=kezdo_icons\\" + icons[number].name + ".svg " + "style=width:150px;height:150px>" + "</td>";
            let string = "'<img id='"+ icons[number].name +"' src=kezdo_icons\\" + icons[number].name + ".svg " + "style=width:150px;height:150px>"; 
            table += picture;
            iconsOnBoard.push(icons[number].name);
            targetsOnBoard.push(string);
            icons[number].isOnBoard = true;
            number++;
            numberOfOutCards++;
        }
        table += '</tr>';
    }
    let num = 0;
    for(let i = 0; i < icons.length; i++)
    {
        if(icons[i].isOnBoard == false){
            num++;
        }
    }
    console.log("A pakliban található lapok száma:" + num);
    console.log(icons);
    $('gameField').innerHTML = table;
    console.log(iconsOnBoard);
    console.log(targetsOnBoard);
}
let isOver = false; 
function redrawBoard(){
    table = "";
    let number = 0; 
    for(let i = 0; i < rows;i++)
    {
        let stringMyRow = "myRow";
        table += "<tr id=" + '"' + stringMyRow  + '">';
        for(let j = 0; j < cols;j++)
        {
            let picture = "<td id='" + i.toString() + j.toString() + "'><img id='"+ iconsOnBoard[number] +"' src=kezdo_icons\\" + iconsOnBoard[number] + ".svg " + "style=width:150px;height:150px>" + "</td>";
            table += picture;
            number++;
        }
        table += '</tr>';
    }
    $('gameField').innerHTML = table;
    console.log("num:"+numberOfOutCards);
    console.log(isSetOnBoard());
    if(!isSetOnBoard() && numberOfOutCards > 26)
    {
        alert("JÁTÉK VÉGET ÉRT!");
        $('gameField').innerHTML = ""; 
        $('result').style.fontSize = "25px";
        $('countdown').hidden = true; 
        isOver = true; 
        showResult();
    }
}
function redrawBoardWhenShowingSet(string1, string2, string3){
    table = "";
    let number = 0; 
    for(let i = 0; i < rows;i++)
    {
        let stringMyRow = "myRow";
        table += "<tr id=" + '"' + stringMyRow  + '">';
        for(let j = 0; j < cols;j++)
        {   let picture;
            if(iconsOnBoard[number] == string1 || iconsOnBoard[number] == string2 || iconsOnBoard[number] == string3){
                picture = "<td id='" + i.toString() + j.toString() + "'><img" + " class='"+ "showSet'" + "id='"+ iconsOnBoard[number] +"' src=kezdo_icons\\" + iconsOnBoard[number] + ".svg " + "style=width:150px;height:150px>" + "</td>";
            }
            else{
                picture = "<td id='" + i.toString() + j.toString() + "'><img id='"+ iconsOnBoard[number] +"' src=kezdo_icons\\" + iconsOnBoard[number] + ".svg " + "style=width:150px;height:150px>" + "</td>";
            }
            table += picture;
            number++;
        }
        table += '</tr>';
    }
    $('gameField').innerHTML = table;
}



let numberOfOutCards = 0; 
function isAllCardsOut(){
    if(numberOfOutCards >= icons.length){
        return true;
    }
    else{
        return false;
    }
}
function redrawBoardAfterAdding(){
    if(!isAllCardsOut()){
        cols++;
        table = "";
        let index = 0;
        iconsOnBoard = [];
        for(let i = 0; i < rows;i++)
        {
            let stringMyRow = "myRow";
            table += "<tr id=" + '"' + stringMyRow  + '">';
            for(let j = 0; j < cols;j++)
            {
                let isFound = false; 
                for(index; index < icons.length && !isFound;index++)
                {
                    if(icons[index].isAlreadyOut == false)
                    {
                        let picture = "<td id='" + i.toString() + j.toString() + "'><img id='"+ icons[index].name +"' src=kezdo_icons\\" + icons[index].name + ".svg " + "style=width:150px;height:150px>" + "</td>";
                        table += picture;
                        icons[index].isOnBoard = true;
                        iconsOnBoard.push(icons[index].name);
                        isFound=true;
                    }
                }
            }
            table += '</tr>';
        }
        $('gameField').innerHTML = table;
    }
    else{
        $('addThreeCardsBtn').disabled = true; 
        console.log("IM HERE1");
    }
    if(!isSetOnBoard() && noMoreCards)
    {
        "JÁTÉK VÉGE";
    } 
    let num = 0;
    for(let i = 0; i < icons.length; i++)
    {
        if(icons[i].isOnBoard == false){
            num++;
        }
    }
    if(isAllCardsOut()){
            num = 0;
    }
    console.log("A pakliban található lapok száma:" + num);
}
let noMoreCards;
function addThreeCards() {
    if(numberOfOutCards < 27)
    {
        noMoreCards = false; 
        numberOfOutCards += 3;
        table = "" ;
        redrawBoardAfterAdding();
    }
    else
    {
        noMoreCards = true;
        $('addThreeCardsBtn').disabled = true; 
    }
}
function allCardsOut(){
    let isAllOut = true;
    for(let i = 0; i < icons.length; i++){
        if(icons[i].isOnBoard == false)
        {
            isAllOut = false;
        }
    }
    return isAllOut;
}
let selectedCards = [];
let targets = [];
let targetsOnBoard = [];
let wasThreeCardsSelected;
let tmpIndexOfTimeOut; 
function selectCard(e) {
    console.log(e.target);
    wasThreeCardsSelected = false; 
    if(isOneNameSelected == true){
        if(e.target.matches('.selectedCard'))
            {
                e.target.classList.remove('selectedCard');
                let id = e.target.id;
                for(let i = 0; i < selectedCards.length;i++){
                    if(selectedCards[i] == id){
                        selectedCards.splice(i,1);
                    }
                }
            }
        else
        {
            if(e.target.matches('.showSet')){
                
                e.target.classList.remove('showSet'); 
            }
            e.target.classList.toggle('selectedCard');
            selectedCards.push(e.target.id);
            targets.push(e.target);
            if(selectedCards.length == 3)
            {
                console.log("WHATSUP");
                wasThreeCardsSelected = true; 
                $('addThreeCardsBtn').disabled = false;
                if(checkIfSelectedCardsAreSet()){
                    alert("HELYES SET!");
                    takeOutSelectedCards();
                    if(iconsOnBoard.length < 12 || isSetOnBoard() == false){
                        addThreeCards();
                    }
                    $('countdown').hidden = true;
                    $('addThreeCardsBtn').disabled = false;
                    if(arrayOfNames.length == 1){
                        tmpIndexOfTimeOut = 1;
                    }
                    arrayOfNames[tmpIndexOfTimeOut-1].points += 1;
                    for(let i = 0; i < clickedNames.length; i++){
                        clickedNames[i].classList.remove('selected');
                        clickedNames[i].removeAttribute('stopped');
                        clickedNames[i].name = "";
                        console.log(clickedNames[i].className);
                    }
                    clickedNames = [];
                    isOneNameSelected = false;
                    
                }
                else{
                    
                    for(let i = 0; i < targets.length;i++){
                        targets[i].classList.remove('selectedCard');
                    }
                    alert("NEM HELYES SET!");
                    $('countdown').hidden = true;

                    if(arrayOfNames.length > 1)
                    {
                    let num = clickedNames.length-1;
                    
                    clickedNames[num].name = 'stopped';
                    clickedNames[num].classList.remove('selected');
                    }
                    ////////////////
                    if(arrayOfNames.length == 1){
                        tmpIndexOfTimeOut = 1;
                    }
                    arrayOfNames[tmpIndexOfTimeOut-1].points -= 1;
                    let counter = 0; 

                    for(let i = 0; i < clickedNames.length; i++){
                        if(clickedNames[i].name = "stopped"){
                            counter++; 
                        }
                    }
                    if(counter == arrayOfNames.length)
                    {
                        for(let i = 0; i < clickedNames.length; i++){
                            clickedNames[i].classList.remove('selected');
                            clickedNames[i].name = "";
                            
                        }
                        clickedNames = [];
                    }
                    isOneNameSelected = false;
                }
                if(!isOver)
                showNamesList();
                selectedCards = [];
            }
        }
        if(arrayOfNames.length == 1)
        {
            isOneNameSelected = true; 
        }
    }
}

function compare(a, b) {
    const item1 = a.points;
    const item2 = b.points;
  
    let comparison = 0;
    if (item1 > item2) {
      comparison = 1;
    } else if (item1 < item2) {
      comparison = -1;
    }
    return comparison;
}


function takeOutSelectedCards(){
    let firstCard = selectedCards[0];
    let secondCard = selectedCards[1];
    let thirdCard = selectedCards[2];
    for(let i = 0; i < icons.length;i++){
        if(icons[i].name == firstCard)
        {
            icons[i].isAlreadyOut = true;
        }
        else if(icons[i].name == secondCard)
        {
            icons[i].isAlreadyOut = true;
        }
        else if(icons[i].name == thirdCard)
        {
            icons[i].isAlreadyOut = true;
        }
    }
    cols--;
    for(let i = 0; i < iconsOnBoard.length;i++)
    {
        if(iconsOnBoard[i] == firstCard)
        {
            iconsOnBoard.splice(i, 1);
            i = i-2; 
        }
        else if(iconsOnBoard[i] == secondCard)
        {
            iconsOnBoard.splice(i, 1);
            i = i-2;
        }
        else if(iconsOnBoard[i] == thirdCard)
        {
            iconsOnBoard.splice(i, 1);
            i = i-2;
        }
    }
    redrawBoard();
}
function checkIfSelectedCardsAreSet(){
    let firstCard = selectedCards[0];
    let secondCard = selectedCards[1];
    let thirdCard = selectedCards[2]; 
    let allFirstCharSame = false;
    let allFirstCharDiff = false;
    let alThirdCharSame = false;
    let allThirdCharDiff = false;
    let allFourthCharSame = false;
    let allFourthCharDiff = false;
    if(firstCard[0] == secondCard[0] && firstCard[0] == thirdCard[0])
    {
        allFirstCharSame = true; 
    }
    else if(firstCard[0] != secondCard[0] && firstCard[0] != thirdCard[0] && secondCard[0] != thirdCard[0])
    {
        allFirstCharDiff = true; 
    }
    if(firstCard[2] == secondCard[2] && firstCard[2] == thirdCard[2])
    {
        alThirdCharSame = true; 
    }
    else if(firstCard[2] != secondCard[2] && firstCard[2] != thirdCard[2] && secondCard[2] != thirdCard[2])
    {
        allThirdCharDiff = true; 
    }
    if(firstCard[3] == secondCard[3] && firstCard[3] == thirdCard[3])
    {
        allFourthCharSame = true; 
    }
    else if(firstCard[3] != secondCard[3] && firstCard[3] != thirdCard[3] && secondCard[3] != thirdCard[3])
    {
        allFourthCharDiff = true; 
    }
    let isSelectedCardsSet = (allFirstCharSame && alThirdCharSame && allFourthCharSame) || 
                             (allFirstCharSame && alThirdCharSame && allFourthCharDiff) ||  
                             (allFirstCharSame && allThirdCharDiff && allFourthCharSame) ||
                             (allFirstCharDiff && alThirdCharSame && allFourthCharSame) || 
                             (allFirstCharSame && allThirdCharDiff && allFourthCharDiff) ||  
                             (allFirstCharDiff && alThirdCharSame && allFourthCharDiff) ||  
                             (allFirstCharDiff && allThirdCharDiff && allFourthCharSame) ||  
                             (allFirstCharDiff && allThirdCharDiff && allFourthCharDiff);  

    if(isSelectedCardsSet)
    {
        itWasSet = true; 
    }
    else
    {
        itWasSet = false; 
        console.log(itWasSet);
    }
    return isSelectedCardsSet;
}
function isSetOnBoard(){
    let thereIsSetOnBoard = false; 
    let firstCard;
    let secondCard;
    let thirdCard; 
    for(let i = 0; i < iconsOnBoard.length-2; i++){
        firstCard = iconsOnBoard[i];
        for(let i2 = i+1; i2 < iconsOnBoard.length-1; i2++){
            secondCard = iconsOnBoard[i2];
            for(let i3 = i2+1; i3 < iconsOnBoard.length; i3++){
                thirdCard = iconsOnBoard[i3];
                let allFirstCharSame = false;
                let allFirstCharDiff = false;
                let alThirdCharSame = false;
                let allThirdCharDiff = false;
                let allFourthCharSame = false;
                let allFourthCharDiff = false;
                if(firstCard[0] == secondCard[0] && firstCard[0] == thirdCard[0])
                {
                    allFirstCharSame = true; 
                }
                else if(firstCard[0] != secondCard[0] && firstCard[0] != thirdCard[0] && secondCard[0] != thirdCard[0])
                {
                    allFirstCharDiff = true; 
                }
                if(firstCard[2] == secondCard[2] && firstCard[2] == thirdCard[2])
                {
                    alThirdCharSame = true; 
                }
                else if(firstCard[2] != secondCard[2] && firstCard[2] != thirdCard[2] && secondCard[2] != thirdCard[2])
                {
                    allThirdCharDiff = true; 
                }
                if(firstCard[3] == secondCard[3] && firstCard[3] == thirdCard[3])
                {
                    allFourthCharSame = true; 
                }
                else if(firstCard[3] != secondCard[3] && firstCard[3] != thirdCard[3] && secondCard[3] != thirdCard[3])
                {
                    allFourthCharDiff = true; 
                }
                let thereIsSetOnBoard2 = 
                             (allFirstCharSame && alThirdCharSame && allFourthCharSame) || 
                             (allFirstCharSame && alThirdCharSame && allFourthCharDiff) ||  
                             (allFirstCharSame && allThirdCharDiff && allFourthCharSame) ||
                             (allFirstCharDiff && alThirdCharSame && allFourthCharSame) || 
                             (allFirstCharSame && allThirdCharDiff && allFourthCharDiff) ||  
                             (allFirstCharDiff && alThirdCharSame && allFourthCharDiff) ||  
                             (allFirstCharDiff && allThirdCharDiff && allFourthCharSame) ||  
                             (allFirstCharDiff && allThirdCharDiff && allFourthCharDiff);
                thereIsSetOnBoard = thereIsSetOnBoard || thereIsSetOnBoard2;
            }
        }
    }
    return thereIsSetOnBoard; 
}
function showSetOnBoard(){
    let thereIsSetOnBoard = false; 
    if(isSetOnBoard)
    {
        let firstCard;
        let secondCard;
        let thirdCard; 
        for(let i = 0; i < iconsOnBoard.length-2 && !thereIsSetOnBoard; i++){
            firstCard = iconsOnBoard[i];
            for(let i2 = i+1; i2 < iconsOnBoard.length-1 && !thereIsSetOnBoard; i2++){
                secondCard = iconsOnBoard[i2];
                for(let i3 = i2+1; i3 < iconsOnBoard.length && !thereIsSetOnBoard; i3++){
                    thirdCard = iconsOnBoard[i3];
                    let allFirstCharSame = firstCard[0] == secondCard[0] && firstCard[0] == thirdCard[0];
                    let allFirstCharDiff = firstCard[0] != secondCard[0] && firstCard[0] != thirdCard[0] && secondCard[0] != thirdCard[0];
                    let alThirdCharSame = firstCard[2] == secondCard[2] && firstCard[2] == thirdCard[2];
                    let allThirdCharDiff = firstCard[2] != secondCard[2] && firstCard[2] != thirdCard[2] && secondCard[2] != thirdCard[2];
                    let allFourthCharSame = firstCard[3] == secondCard[3] && firstCard[3] == thirdCard[3];
                    let allFourthCharDiff = firstCard[3] != secondCard[3] && firstCard[3] != thirdCard[3] && secondCard[3] != thirdCard[3];
                    let thereIsSetOnBoard2 = 
                                 (allFirstCharSame && alThirdCharSame && allFourthCharSame) || 
                                 (allFirstCharSame && alThirdCharSame && allFourthCharDiff) ||  
                                 (allFirstCharSame && allThirdCharDiff && allFourthCharSame) ||
                                 (allFirstCharDiff && alThirdCharSame && allFourthCharSame) || 
                                 (allFirstCharSame && allThirdCharDiff && allFourthCharDiff) ||  
                                 (allFirstCharDiff && alThirdCharSame && allFourthCharDiff) ||  
                                 (allFirstCharDiff && allThirdCharDiff && allFourthCharSame) ||  
                                 (allFirstCharDiff && allThirdCharDiff && allFourthCharDiff);
                    thereIsSetOnBoard = thereIsSetOnBoard || thereIsSetOnBoard2;
                    if(thereIsSetOnBoard){
                        console.log(firstCard);
                        console.log(secondCard);
                        console.log(thirdCard);
                        redrawBoardWhenShowingSet(firstCard, secondCard, thirdCard);
                    }
                }
            }
        }
    }
}
let itWasSet = false; 
let clickedNames = [];
let isOneNameSelected;
function selectSetter(e){
    if(e.target.matches('li') && !isOneNameSelected && !e.target.matches('li.selected') && e.target.name != "stopped"){
        e.target.classList.toggle('selected');
        clickedNames.push(e.target); 
        isOneNameSelected = true; 
        if((arrayOfNames.length > 1))
        {
            resetTimer(); 
        }
        tmpIndexOfTimeOut = e.target.id;

    }
}
let timeStarted = false;
let interval;
let threshold = 10000;
let secondsleft = threshold;
function startStopper() {
    secondsleft -= 1000;
    document.querySelector("#countdown").innerHTML = "Még " + Math.abs((secondsleft / 1000)) + " mp-ed maradt kiválasztani a SET-et.";
    if (secondsleft == 0) {
        if(!wasThreeCardsSelected)
        {
            //console.log(arrayOfNames[tmpIndexOfTimeOut].points);
            arrayOfNames[tmpIndexOfTimeOut-1].points -= 1;
        }
        clearInterval(interval);
        timeStarted = false;
        $('countdown').hidden = true;
        isOneNameSelected = false;
        for(let i = 0; i < targets.length;i++){
            targets[i].classList.remove('selectedCard');
        }
        if(clickedNames.length > 0)
        {
            let num = clickedNames.length-1;
            clickedNames[num].classList.remove('selected');
            clickedNames[num].name = "stopped"; 
            selectedCards = []; 
        }
        
        if(itWasSet)
        {
            clickedNames = [];
        }
        $('addThreeCardsBtn').disabled = false;
        let counter = 0; 
        for(let i = 0; i < clickedNames.length; i++){
            if(clickedNames[i].name = "stopped"){
                counter++; 
            }
        }
        if(counter == arrayOfNames.length)
        {
            for(let i = 0; i < clickedNames.length; i++){
                clickedNames[i].classList.remove('selected');
                clickedNames[i].name = "";
                
            }
            clickedNames = [];
        }
        showNamesList();
    }
}
function startschedule() {
	clearInterval(interval);
	secondsleft = threshold;
	document.querySelector("#countdown").innerHTML = "Még " + Math.abs((secondsleft / 1000)) + " mp-ed maradt kiválasztani a SET-et.";
	interval = setInterval(function() {
		startStopper();
	}, 1000)
}

function resetTimer() {
    threshold = 10000;
    secondsleft = threshold;
    startschedule();
    $('addThreeCardsBtn').disabled = true;
    console.log("IM HERE3");
    timeStarted = true; 
    $('countdown').hidden = false;
}
let h1 = document.getElementsByTagName('h1')[0];
let seconds = 0, minutes = 0, hours = 0; 
let t; 
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
function checkIfIsSetOnBoard(){
    if(isSetOnBoard())
    {
        alert("A táblán található set");
    }
    else
    {
        alert("A táblán NEM található set");
    }
}


function init()
{
    $("gameField").addEventListener('click', selectCard, false);
    $('numberOfPlayersBtn').onclick = clickOnNumberOfPlayersBtn;
    $('nameOfPlayersBtn').onclick = clickOnNamesOfPlayersBtn;
    $('gameModeBtn').onclick = setGameMode;
    $('startBtn').onclick = startGame;
    $('addThreeCardsBtn').onclick = addThreeCards;
    $('isSetBtn').onclick = checkIfIsSetOnBoard;
    $('showSetBtn').onclick = showSetOnBoard;
}

window.addEventListener('load', init, false);
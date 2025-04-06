const gameModule = (function(){
    let gameBoard = {};
    let gameStart = false;
    let gameEnd = false;
    let playerStatus = false;
    let players = [];
    let count = 0;
    
    const possiblePositions = [11, 12, 13, 21, 22, 23, 31, 32, 33];

    function checkWin(mainObj, mainArr){
        let obj = {
            filterObj: function(obj, arr){
                let player1 = [];
                let  player2 = [];
                for(key in obj){
                    if(obj[key].player === arr[0].name){
                        player1.push(obj[key].position)
                    }else {
                        player2.push(obj[key].position)
                    }
                }    
                return [player1, player2];
            },
            extractFirstDigit: function(arr){
                let array = [];
                let str = '';
                arr.forEach(element => {
                    str = String(element);
                    array.push(str[0])
                });
                return array;
            }, 
            extractLastDigit: function(arr){
                let array = [];
                let str = '';
                arr.forEach(element => {
                    str = String(element);
                    array.push(str[1])
                });
                return array;                
            },
            identicalChecker: function(arr){
                let count = 0;
                for(j=0;j<arr.length;j++){
                    for(i=0;i<arr.length;i++){
                        if(arr[j] === arr[i]){
                            count++;
                        }        
                    }
                    if(count === 3){
                        return true
                    };
                    count = 0;
                }        
            },
            existenceChecker: function(main , sub){
                let count = 0;
                let value = 0;
                for(i=0;i<sub.length;i++){
                    for(j=0;j<main.length;j++){
                        if(sub[i] === main[j]){
                            count = 1;
                            break;
                        }
                    }
                    if(count === 1){
                        value++;
                        count = 0;
                    }
                }
                if(value === 3)
                    return true;
                else return false;            
            }
        }

        return {
            gameChecker: function(){
                if(obj.identicalChecker(obj.extractFirstDigit(obj.filterObj(mainObj, mainArr)[0]))){
                    gameEnd = !gameEnd;
                    return `${mainArr[0].name} Won`;
                }else if(obj.identicalChecker(obj.extractFirstDigit(obj.filterObj(mainObj, mainArr)[1]))){
                    gameEnd = !gameEnd;
                    return `${mainArr[1].name} Won`;
                }else if(obj.identicalChecker(obj.extractLastDigit(obj.filterObj(mainObj, mainArr)[0]))){
                    gameEnd = !gameEnd;
                    return `${mainArr[0].name} Won`;
                }else if(obj.identicalChecker(obj.extractLastDigit(obj.filterObj(mainObj, mainArr)[1]))){
                    gameEnd = !gameEnd;
                    return `${mainArr[1].name} Won`;
                }else if(obj.existenceChecker(obj.filterObj(mainObj, mainArr)[0], [11, 22, 33])){
                    gameEnd = !gameEnd;
                    return `${mainArr[0].name} Won`;
                }else if(obj.existenceChecker(obj.filterObj(mainObj, mainArr)[1], [11, 22, 33])){
                    gameEnd = !gameEnd;
                    return `${mainArr[1].name} Won`;
                }else if(obj.existenceChecker(obj.filterObj(mainObj, mainArr)[0], [13, 22, 31])){
                    gameEnd = !gameEnd;
                    return `${mainArr[0].name} Won`;
                }else if(obj.existenceChecker(obj.filterObj(mainObj, mainArr)[1], [13, 22, 31])){
                    gameEnd = !gameEnd;
                    return `${mainArr[1].name} Won`;
                }else if(Object.keys(mainObj).length === 9){
                    gameEnd = !gameEnd;
                    return `A draw`;
                }
            }
        }
    }  

    return {
        createPlayer: function(name){
            if(players.length >= 2) return 'You can Only Add Two Player';
            players.push({name, value: count++});
        },
        startGame: function(){
            if(!(players.length === 2)) return 'Not Enough Players';
            gameStart = true;
        },
        addValue: function(pos){
            let name = '';
            if(gameStart === false) return "You haven't started the Game";
            else if(gameEnd == true) return "The Game Have ended!"
            else if(!(typeof pos === 'number') || !possiblePositions.includes(pos)) return 'Invalid Position';

            if(playerStatus === false) name = players[0].name;
            else if(playerStatus === true) name = players[1].name;
            if(!gameBoard[pos]){
                gameBoard[pos] = {
                 position: pos,
                 valueAdded: (function(){
                    if(playerStatus===true)return players[0].value
                      else return players[1].value
                 })(),
                 player: name
             }
             }else{
                 return 'The Position already is Chosen'
             };
             playerStatus = !(playerStatus);
             return checkWin(gameBoard, players).gameChecker();
         },
        getPlayers: function(){
            return players;
        },
        boardStat: function(){
            return gameBoard;
        },
        resetGame: function(){
            gameBoard = {};
            gameEnd = false;
        }
    }    
})();

const playerPoint = (function(){
    let firstCounter = 0;
    let secondCounter = 0
    return {
        incrementFirst: function(num){
            if((firstCounter + secondCounter) >= num-1) return 'Enough';
            return firstCounter++;
        },
        incrementSecond: function(num){
            if((firstCounter + secondCounter) >= num-1) return 'Enough';
            return secondCounter++;
        },
        getValueFirst: function(){
            return firstCounter;
        },
        getValueSecond: function(){
            return secondCounter;
        },
        reset: function(){
            firstCounter = 0;
            secondCounter = 0;
        }
    }
})()

const displayController = (function(){
    return {
        popUpMode: function(){
            document.querySelector('.hiddenBox').style.display = 'flex';
            document.querySelector('.overlay').style.display = 'block';    
        },
        normalMode: function(){
            document.querySelector('.hiddenBox').style.display = 'none';
            document.querySelector('.overlay').style.display = 'none';
            document.querySelector('.main').style.display = 'grid';
            document.querySelector('.btn').style.display = 'none';
        },
        resetMode: function(){
            document.querySelector('.hiddenBox').style.display = 'none';
            document.querySelector('.overlay').style.display = 'none';
            gameModule.resetGame();
            let box = document.querySelectorAll('.box');
            box.forEach(element => {
                element.textContent = ''
            });
            gameModule.startGame();          
        },
        drawMode: function(){
            displayController.displayHidden = true;
            document.querySelector('.hiddenBox').innerHTML = `
            <header>OOH!</header>
            <p>This Game was a Draw!</p>
            <button class="restart">Restart</button>                        
            <button class="reset">Reset</button>
            `;
            return;            
        },
        winnerMode: function(){
            displayController.displayHidden = true;
            document.querySelector('.hiddenBox').innerHTML = `
            <header>CONGRATULATIONS</header>
            <p>${displayController.winner} Won the Game!</p>
            <button class="restart">Restart</button>                        
            <button class="reset">Reset</button>
            `;
        },
        displayHidden: false,
        roundValue: "",
        winner: ''
    }
})()

document.addEventListener('click', (e)=>{    

    if(e.target.className.includes('btn')){
        displayController.popUpMode();
    }else if(e.target.className.includes('submit')){
        let player1Input = document.querySelector('#player1');
        let player2Input = document.querySelector('#player2');
        rounds = document.querySelector('#rounds');
        displayController.roundValue = rounds.value;

        if(player1Input.checkValidity() && player2Input.checkValidity() && rounds.checkValidity()){
            e.preventDefault();
            console.log(displayController.roundValue);

            gameModule.createPlayer(player1Input.value);
            gameModule.createPlayer(player2Input.value);
            gameModule.startGame();

            let table = document.querySelector('#myTable');
            displayController.normalMode();


            table.style.display = 'table';
            table.innerHTML = `
            <tr>
              <th>${gameModule.getPlayers()[0].name}</th>
              <th>${gameModule.getPlayers()[1].name}</th>
            </tr>
            <tr>
               <td class='pointPlayer1'>${playerPoint.getValueFirst()}</td>
               <td class='pointPlayer2'>${playerPoint.getValueSecond()}</td>
             </tr>
           `
           return playerPoint;
        }
    }else if(e.target.className === 'box'){
        let id = parseInt(e.target.id);
        let value = gameModule.addValue(id);

        if(gameModule.boardStat()[id].valueAdded){
                e.target.innerHTML = '\u2715'
            }else{
                e.target.innerHTML = '\u25EF'
        }    

        if(value){
            if(value.includes('Won')){
                if(value === `${gameModule.getPlayers()[0].name} Won`){
                    // console.log("Here's the part that I want");
                    // console.log(playerPoint.incrementFirst(displayController.roundValue));
                    if(playerPoint.incrementFirst(displayController.roundValue) === 'Enough') {
                        if(playerPoint.getValueFirst > playerPoint.getValueSecond){
                            displayController.winner = gameModule.getPlayers()[0].name;
                        }else if(playerPoint.getValueFirst > playerPoint.getValueSecond){
                            displayController.winner = gameModule.getPlayers()[1].name;
                        }else {
                            displayController.popUpMode();
                            displayController.drawMode();
                        }
                        displayController.popUpMode();
                        displayController.winnerMode();
                    }
                    console.log(playerPoint.getValueFirst());
                }else {
                    if(playerPoint.incrementSecond(displayController.roundValue) === 'Enough') {
                        if(playerPoint.getValueFirst > playerPoint.getValueSecond){
                            displayController.winner = gameModule.getPlayers()[0].name;
                        }else if(playerPoint.getValueFirst > playerPoint.getValueSecond){
                            displayController.winner = gameModule.getPlayers()[1].name;
                        }else {
                            displayController.popUpMode();
                            displayController.drawMode();
                        }
                        displayController.popUpMode();
                        displayController.winnerMode();
                    }
                    console.log(playerPoint.getValueSecond());
                }

                if(displayController.displayHidden === false){
                    document.querySelector('.pointPlayer1').textContent = playerPoint.getValueFirst();
                    document.querySelector('.pointPlayer2').textContent = playerPoint.getValueSecond();

                    displayController.popUpMode();
                    document.querySelector('.hiddenBox').innerHTML = `
                    <header>BRAVO!</header>
                    <p>${value}</p>
                    `;       
                    
                    setTimeout(() => {
                        displayController.resetMode();
                    }, 2500);
                }
                return;    
            }else if(value.includes('draw')){
                displayController.popUpMode();
                document.querySelector('.hiddenBox').innerHTML = `
                <header>OOF!</header>
                <p>This Game is Draw</p>
                `;

                setTimeout(() => {
                    displayController.resetMode();
                }, 2500);
                return;    
            }
        }
    }else if(e.target.className === 'restart'){
        e.preventDefault();
        displayController.resetMode();

        displayController.displayHidden = false;
        playerPoint.reset();
        document.querySelector('.pointPlayer1').textContent = playerPoint.getValueFirst();
        document.querySelector('.pointPlayer2').textContent = playerPoint.getValueSecond();
    }
})


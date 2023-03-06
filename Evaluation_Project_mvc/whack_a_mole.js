const Api = (() => {
    const holes = new Array();
    for(let i = 0; i < 12; i++){
        holes.push({
            id:i.toString(),
            if_have_mole:false,
            if_have_snake:false,
            mole_existing_time:0
        })
    }
    return holes;
})()

const View = (() => {
    const domSelector = {
        start_game: document.querySelector('#start_game'),
        score_counter: document.querySelector('#score_counter'),
        timer_count_down: document.querySelector("#timer_count_down"),
        moles: document.getElementsByClassName("mole"),
        snakes: document.getElementsByClassName("snake")
    }
    

    const render = (holes, score_counter, timer_counter) => {
        for(let hole of holes){
            if(hole.if_have_mole == true){
                document.getElementById(hole.id).style.visibility = "visible";
            }else{
                document.getElementById(hole.id).style.visibility = "hidden";
            }
            if(hole.if_have_snake == true){
                document.getElementById(12+ +hole.id).style.visibility = "visible";
            }else{
                document.getElementById(12+ +hole.id).style.visibility = "hidden";
            }

            document.querySelector('#score_counter').innerHTML = score_counter;
            document.querySelector("#timer_count_down").innerHTML = timer_counter;
        }
    }
    return {
        domSelector,
        render
    }
})()

const Model = ((api)=>{
    const holes = [...api];
    class state_Game_Board {
        constructor() {
            const holes = new Array();
            for(let i = 0; i < 12; i++){
                holes.push({id:i.toString(),
                            if_have_mole:false,
                            if_have_snake:false
                            })
            }
            this._holes = holes;
            this._score_counter = 0;
            this._timer_counter = 30;
            this._game_is_on = false;
        }

        get holes() {
            return this._holes;
        }

        get score_counter() {
            return this._score_counter;
        }

        get timer_counter() {
            return this._timer_counter;
        }

        get game_is_on(){
            return this._game_is_on;
        }

        set holes(new_holes){
            this._holes = new_holes;
        }

        set score_counter(new_score_counter) {
            this._score_counter = new_score_counter;
        }

        set timer_counter(new_timer_counter) {
            this._timer_counter = new_timer_counter;
        }

        set game_is_on(status){
            this._game_is_on = status; 
        }

    }
    return {
        state_Game_Board,
        holes,
    }
})(Api)



const Controller = ((view, model) => {
    const {state_Game_Board, holes} = model;
    const {domSelector, render} = view;

    let game_state = new state_Game_Board();
    game_state.holes = holes;


    let timer = game_state.timer_counter;
    setTimer = () => {
        return setInterval(() => {
            if(timer > 0){
                let random_num = Math.floor(Math.random()*11);
                if(game_state.holes.filter((a)=>{return a.if_have_mole == true}).length < 3){
                    game_state.holes[random_num].if_have_mole = true;
                    game_state.holes[random_num].mole_existing_time = 0;
                    let existing_moles = game_state.holes.filter((a)=>{return a.if_have_mole == true});
                    let idxes = [];
                    for(let i of existing_moles) idxes.push(+i.id);
                    for(let idx of idxes){
                        game_state.holes[idx].mole_existing_time ++;
                    }
                }else{
                    let existing_moles = game_state.holes.filter((a)=>{return a.mole_existing_time==2});
                    let idxes = [];
                    for(let i of existing_moles) idxes.push(+i.id);
                    for(let idx of idxes){
                        game_state.holes[idx].if_have_mole = false;
                        game_state.holes[idx].mole_existing_time = 0;
                    }   
                }
                timer --;
                snake_timer --;
                game_state.timer_counter = timer;
                render(game_state.holes, game_state.score_counter, game_state.timer_counter);
            }else{
                clearInterval(Intervaln);
                game_state = new state_Game_Board();
                console.log(game_state);
                
                render(game_state.holes, game_state.score_counter, game_state.timer_counter);
                alert("Time is Over");
                
            }
        }, 1000)
    }

    let snake_timer = game_state.timer_counter;
    setTimer_snake = () => {
        return setInterval(() => {
            if(snake_timer > 0){
                let random_num = Math.floor(Math.random()*11);
                
                if(game_state.holes.filter((a)=>{return a.if_have_snake == true}).length < 1){
                    game_state.holes[random_num].if_have_snake = true;
                    
                }else{
                    game_state.holes[game_state.holes.findIndex((a)=>{return a.if_have_snake == true})].if_have_snake = false;
                    game_state.holes[random_num].if_have_snake = true;
                }
            }else{
                clearInterval(Intervalm);
            }
        }, 2000)
    }
    
    


    for(let i = 0; i < domSelector.moles.length; i++){
        domSelector.moles[i].addEventListener('click', (event)=>{
            if(game_state.holes[+event.target.id].if_have_mole==true){
                game_state.holes[+event.target.id].if_have_mole = false;
                game_state.score_counter ++;
            }
            render(game_state.holes, game_state.score_counter, game_state.timer_counter);
        })
    }
    
    for(let i = 0; i< domSelector.snakes.length; i++){
        domSelector.snakes[i].addEventListener('click', (event)=>{
            console.log(+event.target.id-12);
            console.log(game_state);
            game_state.timer_counter = 0;
            timer = 0;
            snake_timer = 0;
            game_state.score_counter = 0;
            game_state.game_is_on = false;
            for(let i = 0; i < 12; i++){
                game_state.holes[i].if_have_snake = true;
            }
            render(game_state.holes, game_state.score_counter, game_state.timer_counter);
        })
    }



    domSelector.start_game.addEventListener('click', ()=>{
        if(game_state.game_is_on == false){
            game_state.game_is_on = true;
            for(let i = 0; i < 12; i++){
                game_state.holes[i].if_have_mole = false;
                game_state.holes[i].if_have_snake = false;
            }
            game_state.score_counter = 0;
            game_state.timer_counter = 30;
            timer = 30;
            snake_timer = 30;
            render(game_state.holes, game_state.score_counter, game_state.timer_counter);
            Intervaln = setTimer();
            Intervalm = setTimer_snake();
        }
    })


})(View, Model)



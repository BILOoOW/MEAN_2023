const Api = (() => {
    const holes = new Array();
    for(let i = 0; i < 12; i++){
        holes.push({
            id:i.toString(),
            if_have_mole:false,
            if_have_snake:false
        })
    }
    return holes;
})()

const View = (() => {
    const domSelector = {
        header: document.querySelector("#header"),
        start_game: document.querySelector('#start_game'),
        score_counter: document.querySelector('#score_counter'),
        game_board: document.querySelector("#game_board"),
        timer_count_down: document.querySelector("#timer_count_down"),
        holes: document.querySelector("#circle"),
        moles: document.getElementsByClassName("mole"),
        snakes: document.getElementsByClassName("snake")
    }
    

    const render = (holes, score_counter, timer_counter) => {
        
        for(let hole of holes){
            // console.log(hole);
            if(hole.if_have_mole == true){
                document.getElementById(hole.id).style.visibility = "visible";
            }else{
                document.getElementById(hole.id).style.visibility = "hidden";
            }

            if(hole.if_have_snake == true){
                // console.log(12+ +hole.id);
                document.getElementById(12+ +hole.id).style.visibility = "visible";
                // document.getElementById(hole.id).style.visibility = "hidden";
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

const Model = ((api, view)=>{
    const holes = [...api];
    const {domSelector, render} = view;
    class state_Game_Board {
        constructor() {
            this._holes = [];
            this._score_counter = 0;
            this._timer_counter = 30;
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

        set holes(new_holes){
            this._holes = new_holes;
        }

        set score_counter(new_score_counter) {
            this._score_counter = new_score_counter;
        }

        set timer_counter(new_timer_counter) {
            this._timer_counter = new_timer_counter;
        }

    }
    return {
        state_Game_Board,
        holes,
    }
})(Api, View)



const Controller = ((view, model) => {
    const {state_Game_Board, holes} = model;
    const {domSelector, render} = view;

    const game_state = new state_Game_Board();
    game_state.holes = holes;
    game_state.score_counter = 0;
    game_state.timer_counter = 30;

    // console.log(game_state);

    let timer = game_state.timer_counter;
    

    setTimer = () => {
        return setInterval(() => {
            // console.log(timer);
            if(timer > 0){
                let random_num = Math.floor(Math.random()*11);
                if(game_state.holes.filter((a)=>{return a.if_have_mole == true}).length < 3){
                    game_state.holes[random_num].if_have_mole = true;
                    // console.log(game_state);
                }
                
                timer --;
                game_state.timer_counter = timer;
                render(game_state.holes, game_state.score_counter, game_state.timer_counter);
            }else{
                clearInterval(Intervaln);
                alert("Time is Over!");
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
                    // console.log(game_state.holes.findIndex((a)=>{return a.if_have_snake == true}))
                    game_state.holes[game_state.holes.findIndex((a)=>{return a.if_have_snake == true})].if_have_snake = false;
                    game_state.holes[random_num].if_have_snake = true;
                }
                // console.log(game_state);
                snake_timer = snake_timer - 2;
                render(game_state.holes, game_state.score_counter, game_state.timer_counter);
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
            if(game_state.holes[+event.target.id-12].if_have_snake==true){
                for(let i = 0; i < 12; i++){
                    game_state.holes[i].if_have_snake = true;
                }
                game_state.score_counter = 0;
                game_state.timer_counter = 30;
                timer = 0;
                snake_timer = 0;
                
                render(game_state.holes, game_state.score_counter, game_state.timer_counter);
            }
        })
    }



    domSelector.start_game.addEventListener('click', ()=>{
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
    })


})(View, Model)



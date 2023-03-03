const Api = (() => {
    holes = new Array();
    // console.log(holes);
    for(let i = 0; i < 12; i++){
        holes.push({
            id:i.toString(),
            if_have_mole:false
        })
    }
    return holes;
})()

const View = (() => {
    const domSelector = {
        header: document.querySelector("#header"),
        game_board: document.querySelector("#game_board"),
        timer_count_down: document.querySelector("#timer_count_down"),
        holes: document.querySelector("#circle"),
        moles: document.getElementsByClassName("mole")
    }
    const createTemp = (dataArr,moles) => {
        // temp = ""
        // for (let item of dataArr) {
        //     if(item.if_have_mole){
        //         moles
        //     }
        // }
        // return temp
    }

    const render = (holes) => {
        
        for(let hole of holes){
            if(hole.if_have_mole == true){
                // console.log("inside render")
                console.log("#"+hole.id);
                console.log(document.getElementById('#'+hole.id))
                document.getElementById(hole.id).style.visibility = "visible";
            }
        }
    }

    console.log(domSelector);
    return {
        domSelector,
        createTemp,
        render
    }
})()

const Model = ((api, view)=>{
    const holes = [...api];
    const {domSelector, createTemp, render} = view;
    // console.log(holes);
    class state_Game_Board {
        constructor() {
            this._game_board = []
        }

        get game_board() {
            return this._game_board
        }

        set game_board(new_game_board) {
            this._game_board = new_game_board
            // const temp = createTemp(this._game_board)
            // render(domSelector.game_board, temp)
        }
    }
    return {
        holes,
        domSelector,
        createTemp,
        render
    }
})(Api, View)



const Controller = ((view, model) => {
    const {holes, domSelector, createTemp, render} = Model;
    // render(holes);
    let timer = 5;
    setTimer = () => {
        return setInterval(() => {
            if(timer > 0){
                let random_num = Math.floor(Math.random()*11);
                if(holes.filter((a)=>{return a.if_have_mole == true}).length < 3){
                    holes[random_num].if_have_mole = true;
                    render(holes);
                }
                
                timer --;
            }else{
                clearInterval(Intervaln);
            }
        }, 1000)
    }
    


    Intervaln = setTimer();
    Intervaln();
    console.log("finished");
    console.log("here")
    console.log(domSelector.moles);
    domSelector.holes.addEventListener('click', (event)=>{
        console.log(event.target.id);
        // if(holes[+event.target.id].if_have_mole==true){
        //     holes[+event.target.id].if_have_mole = false;
        //     render(holes);
        // }
    })


})(View, Model)



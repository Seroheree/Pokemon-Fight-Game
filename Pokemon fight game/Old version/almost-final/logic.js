class shot{
    constructor(pokePositionTOP,pokePositionLEFT,direction){
        this.pokePositionTOP=pokePositionTOP
        this.pokePositionLEFT=pokePositionLEFT
        this.direction=direction
    }
    ball(ShotColorClass){
        this.newball=document.createElement('div')
        this.newball.classList.add('ball')
        this.newball.classList.add(ShotColorClass)
        gamebox.appendChild(this.newball)
        this.newball.style.top=`${this.pokePositionTOP + 100}px`
        this.newball.style.left=`${this.pokePositionLEFT}px`
    }   
    async ballMove(){
            for(let x=40;x<550;x+=30){
            await sleep(50)
            this.newball.style.left=`${this.direction*x}%`
            this.newball.style.opacity=1
            this.doDamage()
            if(this.doDamage()===true){
                break;
            }
        }
    }    
    counter(ShotAnimationClass){
        gengar.classList.add(ShotAnimationClass)
        setTimeout(()=>{          
            if(start_ammo!=0){
                gengar.classList.remove(ShotAnimationClass)
                this.ballMove()
                start_ammo--
                bullets.textContent=start_ammo
            } else{
                gengar.classList.remove(ShotAnimationClass)
            }
        },1000)
    }

    doDamage(){
        let ballPositionX=this.newball.getBoundingClientRect().x
        let ballPositionY=this.newball.getBoundingClientRect().y
        let ballWidth=this.newball.getBoundingClientRect().width                                      //DO POPRAWY- WCZYTAC ZMIENNE Z FUNKCJI
        let ballHeight=this.newball.getBoundingClientRect().height

        if(ballPositionX<charizardX+charizardWidth &&
            ballPositionX+ballWidth>charizardX &&
            ballPositionY<charizardY+charizardHeight &&
            ballPositionY+ballHeight>charizardY){
            setTimeout(()=>{
                this.loseHp('.enemy-health-bar')
                this.loseHp('.enemy-health-bar')
                gamebox.removeChild(this.newball)
                EnemyPokemonHP--
                EnemyPokemonHP--
            },1)
            return true
        }
    }
    loseHp(HPBar){
        this.HpBox=document.querySelector(HPBar)
        this.HpBox.removeChild(this.HpBox.firstChild)
    }
}

class meleeAttack{
    meleeAttack(pokemon, meleeAttackClass, animationTime){
        pokemon.classList.add(meleeAttackClass)
        setTimeout(()=>{
            pokemon.classList.remove(meleeAttackClass)
        },animationTime)
    }

    doDamage(){
        const gengarX=gengar.getBoundingClientRect().x
        const gengarY=gengar.getBoundingClientRect().y                                                    //DO POPRAWY- WCZYTAC ZMIENNE Z FUNKCJI
        const gengarHeight=gengar.getBoundingClientRect().height
        const charizardX=charizard.getBoundingClientRect().x
        const charizardY=charizard.getBoundingClientRect().y
        const charizardWidth=charizard.getBoundingClientRect().width
        const charizardHeight=charizard.getBoundingClientRect().height
        if(gengarX<charizardX+charizardWidth &&
            gengarX+gengarWidth>charizardX &&
            gengarY<charizardY+charizardHeight &&
            gengarY+gengarHeight>charizardY){
                this.loseHp('.enemy-health-bar') 
                this.loseHp('.enemy-health-bar') 
                EnemyPokemonHP--
                EnemyPokemonHP--
        }
    } 

    loseHp(HPBar){
        this.HpBox=document.querySelector(HPBar)
        this.HpBox.removeChild(this.HpBox.firstChild)
    }
}

class chariShot extends shot{
    constructor(pokePositionTOP,pokePositionLEFT,direction){
        super(pokePositionTOP,pokePositionLEFT,direction)
    }
    doDamage(){
        let ballPositionX=this.newball.getBoundingClientRect().x
        let ballPositionY=this.newball.getBoundingClientRect().y
        const ballWidth=this.newball.getBoundingClientRect().width                                          //DO POPRAWY- WCZYTAC ZMIENNE Z FUNKCJI
        const ballHeight=this.newball.getBoundingClientRect().height
        if(ballPositionX<gengarX+gengarWidth &&
            ballPositionX+ballWidth>gengarX &&
            ballPositionY<gengarY+gengarHeight &&
            ballPositionY+ballHeight>gengarY){
            setTimeout(()=>{
                gamebox.removeChild(this.newball)
                this.loseHp('.my-health-bar')
                this.loseHp('.my-health-bar')
                MyPokemonHP--
            },1)
            return true
        }
    
    }

    shotAnimation(){
        charizard.classList.add('charizardBallAttack')
        setTimeout(()=>{
            charizard.classList.remove('charizardBallAttack')
        },500)
    }
}


class chariMelee extends meleeAttack{
    doDamage(){
        const charizardX=charizard.getBoundingClientRect().x
        const charizardY=charizard.getBoundingClientRect().y
        const charizardHeight=charizard.getBoundingClientRect().height
        const gengarX=gengar.getBoundingClientRect().x
        const gengarY=gengar.getBoundingClientRect().y
        const gengarHeight=gengar.getBoundingClientRect().height

    if(charizardX<gengarX+gengarWidth &&
        charizardX+charizardWidth>gengarX &&
        charizardY<gengarY+gengarHeight &&
        charizardY+charizardHeight>gengarY){
            this.loseHp('.my-health-bar')
            this.loseHp('.my-health-bar')
            MyPokemonHP--
            MyPokemonHP--
    }
    }
}

const gengar=document.querySelector('.my-pokemon')
const charizard=document.querySelector('.enemy-pokemon')
const gamebox=document.querySelector('.container')
const catchball=document.querySelector('.ball')
const bullets=document.querySelector('.bullet')
let timerr=document.querySelector('.timer')
const gameTimer=document.querySelector('.gameTimer')
let move_value=0
let enemy_move_value=73
let start_ammo=3

let MyPokemonHP=20
let EnemyPokemonHP=20

const gengarX=gengar.getBoundingClientRect().x
const gengarY=gengar.getBoundingClientRect().y
const gengarWidth=gengar.getBoundingClientRect().width
const gengarHeight=gengar.getBoundingClientRect().height
const charizardX=charizard.getBoundingClientRect().x
const charizardY=charizard.getBoundingClientRect().y
const charizardWidth=charizard.getBoundingClientRect().width
const charizardHeight=charizard.getBoundingClientRect().height

let sleep = (timeawait) => {
    return new Promise (resolve => setTimeout(resolve, timeawait))
}
async function timer(){
    for(let i=3;i>=0;i--){
        await sleep(1000)
        timerr.textContent=i
    }
    timerr.textContent=''
    if(timerr.textContent===''){
        start_ammo=3
        bullets.textContent=start_ammo
       }
}


let startTimer= ()=>{
    let gameTime=setInterval(() => {
        gameTimer.textContent-=1;
        if(gameTimer.textContent==0){
            if(EnemyPokemonHP<MyPokemonHP){
                alert('Gengar win!')
            }else if (EnemyPokemonHP>MyPokemonHP){
                alert('Charizard win!')
            }else{
                alert('Remis!')
            }
            clearInterval(gameTime);
        }
    }, 1000);
}

setInterval(()=>{
    if(MyPokemonHP==0){
        alert('Charizard Win!')
        window.close()
    }else if(EnemyPokemonHP==0){
        alert('Gengar Win!')
        window.close()
    } else if(MyPokemonHP==0 && EnemyPokemonHP==0){
        alert('Remis!')
        window.close()
    }
},50)

startTimer()

const pokeColison= () => {
const gengarX=gengar.getBoundingClientRect().x
const gengarY=gengar.getBoundingClientRect().y
const gengarWidth=gengar.getBoundingClientRect().width
const gengarHeight=gengar.getBoundingClientRect().height
const charizardX=charizard.getBoundingClientRect().x
const charizardY=charizard.getBoundingClientRect().y
const charizardWidth=charizard.getBoundingClientRect().width
const charizardHeight=charizard.getBoundingClientRect().height

    if(gengarX<charizardX+charizardWidth &&
        gengarX+gengarWidth>charizardX &&
        gengarY<charizardY+charizardHeight &&
        gengarY+gengarHeight>charizardY){
            return true
        } else
        return false
}

window.addEventListener('keydown',(kpress)=>{
    switch(kpress.keyCode){
        //GENGAR
        case 65:
            if(move_value<=0){
                break;
            }
            move_value-=2;
            gengar.style.left=`${move_value}%`
            break;
        case 68:
            case 37:
            if(pokeColison()!=true){
                move_value+=2;
                gengar.style.left=`${move_value}%`
            }
            break;
            case 32://shot SPACE
            let constructorGengarTop=gengar.getBoundingClientRect().top+170
            let constructorGengarLeft=gengar.getBoundingClientRect().left
            let gengarBallObject= new shot(constructorGengarTop,constructorGengarLeft,1)
            gengarBallObject.ball('GengarBall')
            gengarBallObject.counter('gengarBallAttack')
            break;
            case 82://relload R
            if(timerr.textContent===''){
                timer()
                break;
            }else
                break;
            case 16://melle shift
            if(gengar.classList.contains('attack-delay')){
                if(window.event.keyCode=16) return false;
            }else{
                let gengarMelleObject= new meleeAttack
                gengarMelleObject.meleeAttack(gengar, 'gengarMelee', 700)
                gengarMelleObject.doDamage()
                gengar.classList.add('attack-delay')
            }
            setTimeout(() => {
                gengar.classList.remove('attack-delay')
            }, 700);
                break;
            //CHARIZARD
            case 13:
                let constructorCharizardTop=charizard.getBoundingClientRect().top+170
                let constructorCharizardLeft=charizard.getBoundingClientRect().left
                let charizardShotObject=new chariShot(constructorCharizardTop,constructorCharizardLeft,-1)
                charizardShotObject.ball('chariBall')
                charizardShotObject.shotAnimation()
                charizardShotObject.ballMove()
                break;
            case 100:
                if(pokeColison()!=true){
                    enemy_move_value-=2;
                    charizard.style.left=`${enemy_move_value}%`
                }
                break;
            case 102:
                if(enemy_move_value>73){
                    break;
                }
                enemy_move_value+=2;
                charizard.style.left=`${enemy_move_value}%`
                break;
            case 96:
                if(charizard.classList.contains('attack-delay')){
                    if(window.event.keyCode=96) return false;
                }else{
                let charizardMeleeObject=new chariMelee
                charizardMeleeObject.meleeAttack(charizard,'charizardMeleeAttack', 700)
                charizardMeleeObject.doDamage()
                    charizard.classList.add('attack-delay')
                }
                setTimeout(() => {
                    charizard.classList.remove('attack-delay')
                }, 700);
                break;
    }
})

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

        this.newball.style.top=`${this.pokePositionTOP}px`
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
        MyPokemon.classList.add(ShotAnimationClass)
        setTimeout(()=>{          
            if(start_ammo!=0){
                MyPokemon.classList.remove(ShotAnimationClass)
                this.ballMove()
                start_ammo--
                bullets.textContent=start_ammo
            } else{
                MyPokemon.classList.remove(ShotAnimationClass)
            }
        },1000)
    }

    doDamage(){
        const ballPositionX=this.newball.getBoundingClientRect().x
        const ballPositionY=this.newball.getBoundingClientRect().y
        const ballWidth=this.newball.getBoundingClientRect().width                                      //DO POPRAWY- WCZYTAC ZMIENNE Z FUNKCJI
        const ballHeight=this.newball.getBoundingClientRect().height

        if(ballPositionX<enemyPositionX+enemyPokemonWidth &&
            ballPositionX+ballWidth>enemyPositionX &&
            ballPositionY<enemyPositionY+enemyPokemonHeight &&
            ballPositionY+ballHeight>enemyPositionY){
            setTimeout(()=>{
                this.loseHp('.enemy-health-bar')
                this.loseHp('.enemy-health-bar')
                gamebox.removeChild(this.newball)
            },1)
            return true
        }
    }

    loseHp(HPBar){
        this.HpBox=document.querySelector(HPBar)
        this.HpBox.removeChild(this.HpBox.firstChild)
    }

}

class meleeAttack extends shot{
    meleeAttack(pokemon, meleeAttackClass, animationTime){
        pokemon.classList.add(meleeAttackClass)

        setTimeout(()=>{
            pokemon.classList.remove(meleeAttackClass)
        },animationTime)
    }

    meleDmg(DamagedPoke, healthBar){
        const MyPokemonX=MyPokemon.getBoundingClientRect().x
        const MyPokemonY=MyPokemon.getBoundingClientRect().y                                                    //DO POPRAWY- WCZYTAC ZMIENNE Z FUNKCJI
        const MyPokemonHeight=MyPokemon.getBoundingClientRect().height
        if(MyPokemonX<enemyPositionX+enemyPokemonWidth &&
            MyPokemonX+MyPokemonWidth>enemyPositionX &&
            MyPokemonY<enemyPositionY+enemyPokemonHeight &&
            MyPokemonY+MyPokemonHeight>enemyPositionY){
                this.loseHp(healthBar)
        }
    }   
}


class chariShot extends shot{
    constructor(pokePositionTOP,pokePositionLEFT,direction){
        super(pokePositionTOP,pokePositionLEFT,direction)
    }
    doDamage(){
        const ballPositionX=this.newball.getBoundingClientRect().x
        const ballPositionY=this.newball.getBoundingClientRect().y
        const ballWidth=this.newball.getBoundingClientRect().width                                          //DO POPRAWY- WCZYTAC ZMIENNE Z FUNKCJI
        const ballHeight=this.newball.getBoundingClientRect().height
        if(ballPositionX<MyPokemonX+MyPokemonWidth &&
            ballPositionX+ballWidth>MyPokemonX &&
            ballPositionY<MyPokemonY+MyPokemonHeight &&
            ballPositionY+ballHeight>MyPokemonY){
            setTimeout(()=>{
                gamebox.removeChild(this.newball)
                this.loseHp('.my-health-bar')
                this.loseHp('.my-health-bar')
            },1)
            return true
        }
    }

    shotAnimation(){
        EnemyPokemon.classList.add('charizardBallAttack')
        setTimeout(()=>{
            EnemyPokemon.classList.remove('charizardBallAttack')
        },500)
    }
    
}

const MyPokemon=document.querySelector('.my-pokemon')
const EnemyPokemon=document.querySelector('.enemy-pokemon')
const gamebox=document.querySelector('.container')
const catchball=document.querySelector('.ball')
const bullets=document.querySelector('.bullet')
let timerr=document.querySelector('.timer')
const gameTimer=document.querySelector('.gameTimer')
let move_value=0
let enemy_move_value=80
let start_ammo=3

let MyPokemonHP=20
let EnemyPokemonHP=20

const MyPokemonX=MyPokemon.getBoundingClientRect().x
const MyPokemonY=MyPokemon.getBoundingClientRect().y
const MyPokemonWidth=MyPokemon.getBoundingClientRect().width
const MyPokemonHeight=MyPokemon.getBoundingClientRect().height


const enemyPositionX=EnemyPokemon.getBoundingClientRect().x
const enemyPositionY=EnemyPokemon.getBoundingClientRect().y
const enemyPokemonWidth=EnemyPokemon.getBoundingClientRect().width
const enemyPokemonHeight=EnemyPokemon.getBoundingClientRect().height

let sleep = (timeawait) => {
    return new Promise (resolve => setTimeout(resolve, timeawait))
}


let startTimer= ()=>{
    let gameTime=setInterval(() => {
        gameTimer.textContent-=1;
        if(gameTimer.textContent==0){
            if(EnemyPokemonHP<MyPokemonHP){
                alert('you win')
            }
            clearInterval(gameTime);
        }
    }, 1000);
}

startTimer()

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

window.addEventListener('keydown',(kpress)=>{
    switch(kpress.keyCode){
        //GENGAR
        case 65:
            if(move_value<=0){
                break;
            }
            move_value-=2;
            MyPokemon.style.left=`${move_value}%`
            break;
        case 87:
            MyPokemon.classList.add('jump')
            if(MyPokemon.classList.contains('gengarBall')){
                break;
            }else{
                setTimeout(()=>{
                    MyPokemon.classList.remove('jump')
                    },300)
            }
            break;
        case 68:
            case 37:
            move_value+=2;
            MyPokemon.style.left=`${move_value}%`
            break;
            case 32://shot SPACE
            let constructorMyTop=MyPokemon.getBoundingClientRect().top+170
            let constructorMyLeft=MyPokemon.getBoundingClientRect().left
            let x= new shot(constructorMyTop,constructorMyLeft,1)
            x.ball('GengarBall')
            x.counter('gengarBallAttack')
            if(MyPokemon.classList.contains('jump')){
                MyPokemon.classList.remove('jump')
                let chuj=MyPokemon.getBoundingClientRect().top
                MyPokemon.style.top=`${chuj}px`
                setTimeout(()=>{
                     MyPokemon.style.top=null
                },1000)
            }
            break;
            case 82://relload R
            if(timerr.textContent===''){
                timer()
                break;
            }else
                break;
            case 16://melle shift
                let z= new meleeAttack
                z.meleeAttack(MyPokemon, 'gengarMelee', 700)
                z.meleDmg('', '.enemy-health-bar')
                break;


            //CHARIZARD
            case 13:
                let constructorEnemyTop=EnemyPokemon.getBoundingClientRect().top+170
                let constructorEnemyLeft=EnemyPokemon.getBoundingClientRect().left
                let charShot=new chariShot(constructorEnemyTop,constructorEnemyLeft,-1)
                charShot.ball('chariBall')
                charShot.shotAnimation()
                charShot.ballMove()
                break;
            case 104:    
            EnemyPokemon.classList.add('jump')
                setTimeout(()=>{
                    EnemyPokemon.classList.remove('jump')
                    },300)
                    break;
            case 100:
                enemy_move_value-=2;
                EnemyPokemon.style.left=`${enemy_move_value}%`
                break;
            case 102:
                enemy_move_value+=2;
                EnemyPokemon.style.left=`${enemy_move_value}%`
                break;
            case 96:
                const enemyPositionX=EnemyPokemon.getBoundingClientRect().x
                const enemyPositionY=EnemyPokemon.getBoundingClientRect().y
                const enemyPokemonHeight=EnemyPokemon.getBoundingClientRect().height

                let c=new meleeAttack
                c.meleeAttack(EnemyPokemon,'charizardMeleeAttack', 400)

    }
})

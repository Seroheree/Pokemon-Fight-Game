class shot{
    ball(){
        this.newball=document.createElement('div')
        this.newball.classList.add('ball')
        gamebox.appendChild(this.newball)
        
        const y=MyPokemon.getBoundingClientRect().top+170
        const x=MyPokemon.getBoundingClientRect().left
        this.newball.style.left=`${x}px`
        this.newball.style.top=`${y}px`
        this.counter()
    }   
    async ballMove(){
            for(let x=40;x<550;x+=30){
            await sleep(50)
            this.newball.style.left=`${x}%`
            this.newball.style.opacity=1
            this.doDamage()
            if(this.doDamage()===true){
                break;
            }
        }
    }    
    counter(){
        MyPokemon.classList.add('gengarBall')
        setTimeout(()=>{          
            if(start_ammo!=0){
                MyPokemon.classList.remove('gengarBall')
                this.ballMove()
                start_ammo--
                bullets.textContent=start_ammo
            } else{
                MyPokemon.classList.remove('gengarBall')
            }
        },1000)
    }

    doDamage(){
        const ballPositionX=this.newball.getBoundingClientRect().x
        const ballPositionY=this.newball.getBoundingClientRect().y
        const ballWidth=this.newball.getBoundingClientRect().width
        const ballHeight=this.newball.getBoundingClientRect().height

        if(ballPositionX<enemyPositionX+enemyPokemonWidth &&
            ballPositionX+ballWidth>enemyPositionX &&
            ballPositionY<enemyPositionY+enemyPokemonHeight &&
            ballPositionY+ballHeight>enemyPositionY){
            setTimeout(()=>{
                this.loseHp()
                this.loseHp()
                gamebox.removeChild(this.newball)
            },1)
            return true
        }
    }

    loseHp(){
        this.enemyHpBox=document.querySelector('.enemy-health-bar')
        this.enemyHpBox.removeChild(this.enemyHpBox.firstChild)
        EnemyPokemonHP--
    }

}

class meleeAttack extends shot{
    meleeAttack(){
        MyPokemon.classList.add('gengarMelee')

        setTimeout(()=>{
            MyPokemon.classList.remove('gengarMelee')
        },700)
    }

    meleDmg(){
        const MyPokemonX=MyPokemon.getBoundingClientRect().x
        const MyPokemonWidth=MyPokemon.getBoundingClientRect().width
        const MyPokemonY=MyPokemon.getBoundingClientRect().y
        const MyPokemonHeight=MyPokemon.getBoundingClientRect().height
        

        if(MyPokemonX<enemyPositionX+enemyPokemonWidth &&
            MyPokemonX+MyPokemonWidth>enemyPositionX &&
            MyPokemonY<enemyPositionY+enemyPokemonHeight &&
            MyPokemonY+MyPokemonHeight>enemyPositionY){
                this.loseHp()
        }
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
let start_ammo=3

let MyPokemonHP=20
let EnemyPokemonHP=20

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
        case 37:
            if(move_value<=0){
                break;
            }
            move_value-=2;
            MyPokemon.style.left=`${move_value}%`
            break;
        case 38:
            MyPokemon.classList.add('jump')
            if(MyPokemon.classList.contains('gengarBall')){
                break;
            }else{
                setTimeout(()=>{
                    MyPokemon.classList.remove('jump')
                    },300)
            }
            break;
        case 39:
            case 37:
            move_value+=2;
            MyPokemon.style.left=`${move_value}%`
            break;
            case 32://shot SPACE
            let x= new shot
            x.ball()
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
                z.meleeAttack()
                z.meleDmg()
    }
})

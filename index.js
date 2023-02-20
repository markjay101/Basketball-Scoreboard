
const quarters = ["1st", "2nd", "3rd", "4th"]
let i = 0
let numfoul_home = parseInt(document.getElementById("fouls-home").textContent)
let numfoul_guest = parseInt(document.getElementById("fouls-guest").textContent)
let homescore = parseInt(document.getElementById("home-score").textContent) 
let guestscore = parseInt(document.getElementById("guest-score").textContent) 
let min = 0
let sec = 0
let shotClock = 0
let interval = null
let remainingSeconds = 720
let shotClockTime = 24
document.getElementById("stop-btn").disabled = true
Timer()
function Timer(){
    min = Math.floor(remainingSeconds / 60)
    sec = remainingSeconds % 60
    shotClock = shotClockTime % 60
    document.getElementById("min").textContent = min.toString().padStart(2, "0")
    document.getElementById("sec").textContent = sec.toString().padStart(2, "0")
    document.getElementById("shot-clock").textContent = shotClock.toString().padStart(2, "0")

    if(shotClock < 6){
        document.getElementById("shot-clock").style.color = "red"
    } 
    else{
        document.getElementById("shot-clock").style.color = "rgb(251, 251, 142)"
    }
}
function highlightScore(){
    if(homescore > guestscore){
        document.getElementById("home-score").style.boxShadow = "0px 0px 20px lightblue"
        document.getElementById("guest-score").style.boxShadow = "none"
        document.getElementById("home-score").style.border = "1px solid lightblue"
        document.getElementById("guest-score").style.border = "none"
    }  
    else if(guestscore > homescore){
        document.getElementById("home-score").style.boxShadow = "none"
        document.getElementById("guest-score").style.boxShadow = "0px 0px 20px lightblue"
        document.getElementById("home-score").style.border = "none"
        document.getElementById("guest-score").style.border = "1px solid lightblue"
    }
    else if(homescore === guestscore){
        document.getElementById("home-score").style.boxShadow = "none"
        document.getElementById("guest-score").style.boxShadow = "none"
        document.getElementById("home-score").style.border = "none"
        document.getElementById("guest-score").style.border = "none"
    }
}
function timerQuarter(){
    let qGame = document.getElementById("quarter").textContent
    document.getElementById("quarter").textContent = quarters[i+=1] 
    alert("End of " + qGame + " Quarter")
    if(i === 4){
        alert("End of the Game. Winner: " + winner())
        reset()
    }
    document.getElementById("start-btn").disabled = false
    document.getElementById("stop-btn").disabled = true
}
function winner(){
    if(homescore > guestscore)
        return "Home, final score: " + homescore + " - " +guestscore
    else
        return "Guest, final score: " + homescore + " - " +guestscore
}
function start(){
    document.getElementById("start-btn").disabled = true
    document.getElementById("stop-btn").disabled = false
    if(remainingSeconds === 0) return

    interval = setInterval(() =>{
        remainingSeconds--
        shotClockTime--
        Timer()

        if(remainingSeconds < 0){
            clearInterval(interval)
            interval = null
            remainingSeconds = 720
            shotClockTime = 24
            Timer()
            timerQuarter()
        } 
        if(shotClock < 0){
            shotClockTime = 24
            Timer()
        
        }   
    }, 1000)  
}
function stop(){
    clearInterval(interval)
    interval = 0
    document.getElementById("start-btn").disabled = false
    document.getElementById("stop-btn").disabled = true
}
function reset(){
    homescore = 0
    guestscore = 0
    document.getElementById("home-score").textContent = homescore
    document.getElementById("guest-score").textContent = guestscore
    document.getElementById("quarter").textContent = "1st"
    numfoul_guest = 0
    numfoul_home = 0
    document.getElementById("fouls-home").textContent = numfoul_home
    document.getElementById("fouls-guest").textContent = numfoul_guest
    remainingSeconds = 720
    shotClockTime = 24
    clearInterval(interval)
    interval = 0
    Timer()
    i = 0
    document.getElementById("start-btn").disabled = false
    document.getElementById("stop-btn").disabled = true
    highlightScore()
}

//Quarters functions...
function incQuarter(){
    if(document.getElementById("quarter").textContent !== quarters[quarters.length-1]){
        document.getElementById("quarter").textContent = quarters[i+=1]
    }
}
function decQuarter(){
    if(document.getElementById("quarter").textContent !== quarters[0]){
        document.getElementById("quarter").textContent = quarters[i-=1]
    }
}
//...end

//fouls function...
function incFoul_home(){
    numfoul_home += 1
    document.getElementById("fouls-home").textContent = numfoul_home
}
function decFoul_home(){
    if(numfoul_home > 0){
        numfoul_home -= 1
        document.getElementById("fouls-home").textContent = numfoul_home
    }   
}
function incFoul_guest(){
    numfoul_guest += 1
    document.getElementById("fouls-guest").textContent = numfoul_guest
}
function decFoul_guest(){
    if(numfoul_guest > 0){
        numfoul_guest -= 1
        document.getElementById("fouls-guest").textContent = numfoul_guest
    }   
}
//...end

//timer button function...
function min_up_btn(){
    if(remainingSeconds > 660)
        remainingSeconds = 720
    else
        remainingSeconds += 60
    Timer()
}
function min_down_btn(){ 
    if(remainingSeconds <= 60)
        remainingSeconds = 0
    else
        remainingSeconds -= 60
    Timer()
}
function sec_up_btn(){
    if(remainingSeconds > 719)
        remainingSeconds = 720
    else
        remainingSeconds += 1
    Timer()
}
function sec_down_btn(){
    if(remainingSeconds <= 0)
        remainingSeconds = 0
    else
        remainingSeconds -= 1
    Timer()
}
function shot_up_btn(){
    if(shotClockTime > 23)
        shotClockTime = 24
    else
        shotClockTime += 1
    Timer()
}
function shot_down_btn(){
    if(shotClockTime <= 0)
        shotClockTime = 0
    else
        shotClockTime -= 1
    Timer()
}
//...end

//scores button function...
function plus1_home(){
    homescore += 1
    document.getElementById("home-score").textContent = homescore
    highlightScore()
}
function plus2_home(){
    homescore += 2
    document.getElementById("home-score").textContent = homescore
    highlightScore()
}
function plus3_home(){
    homescore += 3
    document.getElementById("home-score").textContent = homescore
    highlightScore()
}
function minus1_home(){
    if(homescore < 1 )
        homescore = 0
    else
        homescore -= 1 
    document.getElementById("home-score").textContent = homescore
    highlightScore()
}
function minus2_home(){
    if(homescore < 2 )
        homescore = 0
    else
        homescore -= 2 
    document.getElementById("home-score").textContent = homescore
    highlightScore()
}
function minus3_home(){
    if(homescore < 3 )
        homescore = 0
    else
        homescore -= 3 
    document.getElementById("home-score").textContent = homescore
    highlightScore()
}
function plus1_guest(){
    guestscore += 1
    document.getElementById("guest-score").textContent = guestscore
    highlightScore()
}
function plus2_guest(){
    guestscore += 2
    document.getElementById("guest-score").textContent = guestscore
    highlightScore()
}
function plus3_guest(){
    guestscore += 3
    document.getElementById("guest-score").textContent = guestscore
    highlightScore()
}
function minus1_guest(){
    if(guestscore < 1 )
        guestscore = 0
    else
        guestscore -= 1 
    document.getElementById("guest-score").textContent = guestscore
    highlightScore()
}
function minus2_guest(){
    if(guestscore < 2 )
        guestscore = 0
    else
        guestscore -= 2 
    document.getElementById("guest-score").textContent = guestscore
    highlightScore()
}
function minus3_guest(){
    if(guestscore < 3 )
        guestscore = 0
    else
        guestscore -= 3 
    document.getElementById("guest-score").textContent = guestscore
    
}
//...end


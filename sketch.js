
difficulty = "default"

function preload() {
  words = loadStrings("words.txt")
}

function setup() {
  reset()
  createCanvas(windowWidth, windowHeight);
  generateWords()

  results = []
  prev_result = 0
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function reset() {
  typed = ''
  time = 0
  started = false
  final = 0
  restart_hover = 50
  
}

function draw() {
  background(50);

  textFont("Roboto Mono")
  
  // result
  if (final >= sentence.length-1) {
    textSize(width/30)
    textAlign(CENTER)
    text("WPM: " + Math.round((sentence.length / 5) / (time/1000/60)), width/2, height / 5)

    if (prev_result == 0) {
      text("New record!", width/2, height / 5 + 50)
    }
    else if (Math.round((sentence.length / 5) / (time/1000/60)) > Math.max(results)) {
      text("New record!", width/2, height / 5 + 50)

      text(Math.round(
        ((((sentence.length / 5) / (time/1000/60)) - Math.max(results)) / Math.max(results)) * 100) + '% better than the previous best attempt', width/2, height / 5 + 100)
    }
    else if (Math.round((sentence.length / 5) / (time/1000/60)) >= prev_result) {
      text(Math.round(
        ((sentence.length / 5) / (time/1000/60) - prev_result) / prev_result * 100) + '% better than the previous attempt', width/2, height/5 + 100)
    }
    else {
      text(Math.abs(Math.round(
        ((sentence.length / 5) / (time/1000/60) - prev_result) / prev_result * 100)) + '% worse than the previous result', width/2, height/5 + 100) 
    }

    for (j=0; j<results.length;j++) {
      if (j >= 5) {
        break
      }
      else {
        text(j+1 + '. ' + results[j] + " WPM", width/2, height/2 + j*50)
      }
    }

    textSize(width/40)
    text("click anywhere to play again", width/2, height * 9/10)

    if (mouseIsPressed && mouseButton == LEFT) {
      results.push(Math.round((sentence.length / 5) / (time/1000/60)))
      prev_result = Math.round((sentence.length / 5) / (time/1000/60))
      results.sort((a, b) => b-a)

      reset()
      generateWords()
    }

  }
  else {
    if (started) {
      time += deltaTime
    }

    fill(255)
    textAlign(CENTER)

    textSize(width / 25)
    text((time/1000).toFixed(2), width/2, height * 4/5)

    strokeWeight(0)
    fill(restart_hover)
    rect(width * 2/3, height * 4/5 - height/15, width/10, height/15)
    fill(255)
    textSize(width/50)
    text("restart", width * 2/3 + width/20, height * 4/5 - width/100)

    if (mouseX > width * 2/3 && mouseX < width * 2/3 + width/10 && mouseY > height * 4/5 - height/10 && mouseY < height * 4/5) {
      restart_hover = 60
      if (mouseIsPressed && mouseButton == LEFT) {
        reset()
        generateWords()
      }
    }
    else {
      restart_hover = 50
    }
    textSize(width / 75)

    // generated words
    fill(220)
    text(sentence, width/2, height/5)

    fill(110)
    text(sentence, width/2, height/2)
    
    // user typed words
    
    for (i=0; i<typed.length; i++) {
      if (typed[i] == sentence[i]) {
        fill("green")
      }
      else {
        fill("red")
      }

      if (even_sentence) {
        text(typed[i], width/2 - textWidth(sentence.slice(0, sentence.length/2)) + ((i + 0.5)*textWidth(sentence[0])), height/2)
      }
      else {
        text(typed[i], width/2 - textWidth(sentence.slice(0, sentence.length/2)) + (i*textWidth(sentence[0])), height/2)
      }
      final = i + 1 
    }
    fill(255)
    if (even_sentence) {
      text('_', width/2 - textWidth(sentence.slice(0, sentence.length/2)) + ((final + 0.5)*textWidth(sentence[0])), height/2)
    }
    else {
      text('_', width/2 - textWidth(sentence.slice(0, sentence.length/2)) + (final*textWidth(sentence[0])), height/2)
    }
    
  }
}

function generateWords() {
  textSize(width / 75)
  sentence = ''
  for (i=0; i<10; i++) {
    word = words[Math.floor(Math.random() * words.length)]
    sentence += word
    sentence += ' '
  }
  
  if (textWidth(sentence) >= width) {
    generateWords()
  }

  // this is to calculate if length of sentence is even
  // it will be useful when aligning the typed sentence
  even_sentence = sentence.length % 2 == 0
}

function keyTyped() {
  if (time == 0) {
    started = true
  }
  if (keyCode != ENTER && keyCode != BACKSPACE) {
    typed += key
  }
}

function keyPressed() {
  if (keyCode == BACKSPACE) {
    typed = typed.slice(0, typed.length-1)
  }
}


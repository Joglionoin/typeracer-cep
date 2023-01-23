
function preload() {
  words = loadStrings("words.txt")
}

function setup() {
  typed = ''
  time = 0
  started = false
  final = 0

  createCanvas(windowWidth, windowHeight);
  generateWords()

  // this is to calculate if length of sentence is even
  // it will be useful when aligning the typed sentence
  even_sentence = sentence.length % 2 == 0

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  background(50);

  textFont("Roboto Mono")

  if (final >= sentence.length-1) {
    textSize(width/20)
    textAlign(CENTER)
    text("WPM: " + Math.round((sentence.length / 5) / (time/1000/60)), width/2, height/2)
    
    textSize(width/40)
    text("click anywhere to play again", width/2, height * 2/3)

    if (mouseIsPressed) {
      final = 0
      generateWords()
    }

  }
  else {
    if (started) {
      time += deltaTime
    }

    fill(255)
    textSize(width / 25)
    textAlign(CENTER)
    text((time/1000).toFixed(2), width/2, height * 4/5)

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
  sentence = ''
  for (i=0; i<10; i++) {
    sentence += words[Math.floor(Math.random() * words.length)]
    sentence += ' '
  }

  if (textWidth(sentence) >= width) {
    generateWords()
  }
}

function keyTyped() {
  if (time == 0) {
    started = true
  }
  typed += key
}

function keyPressed() {
  if (keyCode == BACKSPACE) {
    typed = typed.slice(0, typed.length-1)
  }
}

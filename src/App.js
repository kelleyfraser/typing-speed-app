import React, { useState, useRef, useEffect } from 'react';
import './App.scss';
import AppHeader from './components/appHeader';
import TypingTest from './components/typingTest';
import ScoreCard from './components/scoreCard';

function App() {
  const ref = useRef(null);
  const maxTime = 60;
  const minTime = 0;
  let id = -1;

  const paragraphsArray = [
    "Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation? Did you ever hear about the Great Ice Age or the Pleistocene Epoch? Less than one million years ago, in fact, some 12,000 years ago, an ice sheet many thousands of feet thick rode over Burke Mountain in a southeastward direction. The many boulders frozen to the underside of the ice sheet tended to scratch the rocks over which they rode. The scratches or striations seen in the park rocks were caused by these attached boulders. The ice sheet also plucked and rounded Burke Mountain into the shape it possesses today.",
    "I don’t like cats and they don’t like me.I used to be allergic to them and I would get stuffed up and have hives.That doesn’t seem to happen anymore.But I still don’t like them.I lived with 3 cats that were not good at peeing in the litter box.They seemed to find something important to me and pee on it.Most of the time they peed on photographs or papers that would be ruined.Cats also bring fleas into the house.There is nothing worse than having to flea dip cats and also flea bomb a home.That is why I don’t like cats.",
    "The desert wind blew the tumbleweed in front of the car. Alex swerved to avoid the tumbleweed, but he turned the wheel a bit too strong and the car left the road and skidded onto the dirt median. He instantly slammed on the brakes and the car stopped in a cloud of dirt. When the dust cloud had settled and he could see around him again, he realized that he'd somehow crossed over into an entirely new dimension.",
    "Sleep deprivation causes all sorts of challenges and problems. When one doesn’t get enough sleep one’s mind doesn’t work clearly. Studies have shown that after staying awake for twenty-four hours one’s ability to do simple math is greatly impaired. Driving tired has been shown to be as bad as driving drunk. Moods change, depression, anxiety, and mania can be induced by lack of sleep. As much as people try to do without enough sleep it is a wonder more crazy things don’t happen in this world.",
    "He stared out the window at the snowy field. He'd been stuck in the house for close to a month and his only view of the outside world was through the window. There wasn't much to see. It was mostly just the field with an occasional bird or small animal who ventured into the field. As he continued to stare out the window, he wondered how much longer he'd be shackled to the steel bar inside the house.",
    "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
    "His parents continued to question him. He didn't know what to say to them since they refused to believe the truth. He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that grandpa, who had been dead for five years, could have told him where the treasure had been hidden. Of course, it didn't help that grandpa was roaring with laughter in the chair next to him as he tried to explain once again how he'd found it.",
    "The cab arrived late. The inside was in as bad of shape as the outside which was concerning, and it didn't appear that it had been cleaned in months. The green tree air-freshener hanging from the rearview mirror was either exhausted of its scent or not strong enough to overcome the other odors emitting from the cab. The correct decision, in this case, was to get the hell out of it and to call another cab, but she was late and didn't have a choice.",
    "Green vines attached to the trunk of the tree had wound themselves toward the top of the canopy. Ants used the vine as their private highway, avoiding all the creases and crags of the bark, to freely move at top speed from top to bottom or bottom to top depending on their current chore. At least this was the way it was supposed to be. Something had damaged the vine overnight halfway up the tree leaving a gap in the once pristine ant highway.",
    "I love the feel of wood curls flying off the lathe as I begin to shape the log in front of me. The sound of scraping changes based on the wetness of the wood, the speed at which the lathe is turning, and the type of cut I am making. The smell and feel of wet wood being turned are unique. The water is sprayed out as I cut through the different layers of wood. A log can turn into anything one's imagination can think of with the right set of hands-on tools. I have those hands and imagination. I use all of my senses and intuition to create a beautiful object. That is why I enjoy turning wood.",
    "It wasn't supposed to end that way. The plan had been meticulously thought out and practiced again and again. There was only one possible result once it had been implemented, but as they stood there the result wasn't anything close to what it should have been. They all blankly looked at each wondering how this could have happened. In their minds, they all began to blame the other members of the group as to why they had failed.",
    "There were a variety of ways to win the game. James had played it long enough to know most of them and he could see what his opponent was trying to do. There was a simple counterattack that James could use and the game should be his. He began deploying it with the confidence of a veteran player who had been in this situation a thousand times in the past. So, it was with great surprise when his opponent used a move he had never before seen or anticipated to easily defeat him in the game.",
    "Frank knew there was a correct time and place to reveal his secret and this wasn't it. The issue was that the secret might be revealed despite his best attempt to keep it from coming out. At this point, it was out of his control and completely dependent on those around him who also knew the secret. They wouldn't purposely reveal it, or at least he believed that, but they could easily inadvertently expose it. It was going to be a long hour as he nervously eyed everyone around the table hoping they would keep their mouths shut.",
    "He ordered his regular breakfast. Two eggs sunny-side up, hash browns, and two strips of bacon. He continued to look at the menu wondering if this would be the day he added something new. This was also part of the routine. A few seconds of hesitation to see if something else would be added to the order before demurring and saying that would be all. It was the same exact meal that he had ordered every day for the past two years."
  ];

  const [paragraph, setParagraph] = useState("One can cook on and with an open fire. These are some of the ways to cook with fire outside. Cooking meat using a spit is a great way to evenly cook meat. In order to keep meat from burning, it's best to slowly rotate it. Hot stones can be used to toast bread. Coals are hot and can bring things to a boil quickly. If one is very adventurous, one can make a hole in the ground, fill it with coals and place foil-covered meat, veggies, and potatoes into the coals, and cover all of it with dirt. In a short period of time, the food will be baked. Campfire cooking can be done in many ways.");
  const [characters, setCharacters] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(maxTime);

  useEffect(() => {
    resetGame();
  }, [paragraph]);

  useEffect(() => {
    let interval = null;

    if (isTyping) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    }

    if (timeLeft === minTime) {
      clearInterval(interval);
      setIsTyping(false);
    }

    return () => clearInterval(interval);
  }, [isTyping, timeLeft, minTime]);


  const getRandomParagraph = () => {
    let randomInteger = Math.floor(Math.random() * paragraphsArray.length);
    setParagraph(paragraphsArray[randomInteger]);
  }

  const initTyping = (event) => {
    let index = event.target.value.split("").length - 1;
    let typedChar = event.target.value.split("")[charIndex];

    if (index > 0 && timeLeft === maxTime) {
      setIsTyping(true);
    }

    if (timeLeft > 0) {
      if (index === charIndex) {
        if (timeLeft > 0) {
          setCharIndex(charIndex + 1);

          if (typedChar === characters[charIndex].content) {
            setIsCorrect(true);
          } else {
            setIsCorrect(false);
          }
        }
      } else {
        setIsCorrect(null);
        setCharIndex(charIndex - 1);
      }
    }
  }

  const resetGame = () => {
    id = -1;
    loadParagraph();
    ref.current.value = "";
    ref.current.focus();
    setCharIndex(0);
    setIsTyping(false);
    setTimeLeft(maxTime);
  }

  const loadParagraph = () => {
    setCharacters(paragraph.split("").map((char) => ({ id: ++id, key: id, content: char, isCorrect: null })))
  }

  const setIsCorrect = (value) => {
    setCharacters(
      characters.map((char) => {
        if (char.id === charIndex) {
          char.isCorrect = value;
          return char;
        } else {
          return char;
        }
      })
    );
  }

  return (
    <div className="App">
      <AppHeader getRandomParagraph={getRandomParagraph} />
      <div>
       <div className="timer-box">
          <h2 className="time">{timeLeft > 0 ? timeLeft + " s" : "0 s"}</h2>
        </div>
        <div className="wrapper">
          <input ref={ref} onChange={initTyping} type="text" className="input-field" />
          <div className="content-box">
            {timeLeft ? 
              <TypingTest 
                characters={characters} 
                charIndex={charIndex} /> 
              : 
              <ScoreCard characters={characters} charIndex={charIndex} />
            }
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
}

export default App;

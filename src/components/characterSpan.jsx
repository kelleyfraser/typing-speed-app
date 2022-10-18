const CharacterSpan = ({data, charIndex}) => {

  return (
    <span
      key={data.id}
      className={data.id === charIndex ? "active" : (data.isCorrect === true ? "correct" : (data.isCorrect === false ? "incorrect" : ""))}>
      {data.content}
    </span>
  )
}

export default CharacterSpan;
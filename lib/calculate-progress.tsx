const calculateProgress = (scoreInFloat: number) => {
  const score = Math.round(scoreInFloat * 100)

  if (score <= 49) {
    return (
      <>
        <span className="text-red-700 text-sm">{score}</span>
        <span className="text-gray-500 text-xs"> /100</span>
      </>
    )
  } else if (score <= 89) {
    return (
      <>
        <span className="text-blue-700 text-sm">{score}</span>
        <span className="text-gray-500 text-xs"> /100</span>
      </>
    )
  } else {
    return (
      <>
        <span className="text-green-700 text-sm">{score}</span>
        <span className="text-gray-500 text-xs"> /100</span>
      </>
    )
  }
}

export default calculateProgress

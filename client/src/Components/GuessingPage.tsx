
function GuessingPage({ setGuess }: any) {
    return (
        <div>
            <input className="focus:tw-border-red-500 tw-ml-2" type="text" placeholder="Guess what the drawing represents..." onChange={(e) => setGuess(e.target.value)} />
        </div>
    )
}

export default GuessingPage;
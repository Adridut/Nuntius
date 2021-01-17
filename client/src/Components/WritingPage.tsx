
function WritingPage({ setPhrase }: any) {
    return (
        <div>
            <input className="focus:tw-border-red-500 tw-ml-2" type="text" placeholder="Sentence you want your friends to guess..." onChange={(e) => setPhrase(e.target.value)} />
        </div>
    )
}

export default WritingPage;
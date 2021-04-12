function CustomButton({ onClick, text, color, custom }: any) {
    return (
        <button onClick={onClick}
            className={"tw-text-" + color + "-500 tw-border-" + color + "-500 hover:tw-bg-" + color + "-500 hover:tw-text-white focus:tw-outline-none tw-outline-none " + custom}>
            {text}</button>
    )
}

export default CustomButton;
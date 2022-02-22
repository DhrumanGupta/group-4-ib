function InputHandler({setText, text}) {
    return (
        <textarea
            className="min-h-[17rem] mt-2 duration-100 transition-all grow mx-auto mt-5 resize-none w-full md:max-w-screen-sm lg:max-w-screen-md 2xl:max-w-screen-lg mt-auto mb-2 form-control block p-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            rows="3"
            placeholder="Your message"
            onChange={(e) => setText(e.target.value)}
            value={text}
        />
    );
}

export default InputHandler;

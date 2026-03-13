export default function CallToAction() {
    return (
        <section className="flex flex-col items-center justify-center max-w-7xl mx-auto my-42 px-4">
            <h3 className="font-domine text-3xl max-w-md text-center bg-linear-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">
                Your Website Is Just One Prompt Away
            </h3>
            <p className="mt-4 text-sm/6 text-gray-500 max-w-md text-center">
                Describe your idea in a sentence and our AI handle layout, content, and performance automatically in seconds.
            </p>

            <button
                onClick={() => scrollTo({ left: 0, top: 0, behavior: 'smooth' })}
                className="mt-6 flex items-center bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition px-6 text-base py-3 text-white rounded-full">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)" fillRule="evenodd" clipRule="evenodd" fill="#fff"><path d="M8 4a.8.8 0 0 1 .77.58l.866 3.036a4 4 0 0 0 1.018 1.73c.481.48 1.73 1.018 1.73 1.018l3.036.867a.8.8 0 0 1 0 1.538l-3.036.868a4 4 0 0 0-2.748 2.747L8.77 19.42a.8.8 0 0 1-1.538 0l-.867-3.036a4 4 0 0 0-2.748-2.747L.58 12.769a.8.8 0 0 1 0-1.538l3.036-.867a4 4 0 0 0 2.748-2.748L7.23 4.58A.8.8 0 0 1 8 4m8-4a.4.4 0 0 1 .385.29l.433 1.518a2 2 0 0 0 .51.865c.24.24.864.509.864.509l1.518.434a.4.4 0 0 1 0 .769l-1.518.433a2 2 0 0 0-1.374 1.374l-.433 1.518a.4.4 0 0 1-.77 0l-.433-1.518a2 2 0 0 0-1.374-1.374l-1.518-.433a.4.4 0 0 1 0-.77l1.518-.433a2 2 0 0 0 1.374-1.374L15.615.29A.4.4 0 0 1 16 0" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z" /></clipPath></defs></svg>
                <span className="ml-2">
                    Generate My Website
                </span>
            </button>
            <img
                src="/assets/hand.png"
                alt="Hand"
                width={200}
                height={200}
                className="w-40 mt-20"
            />
        </section>
    );
}
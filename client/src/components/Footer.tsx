export default function Footer() {

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <footer className="w-full flex flex-col rounded-lg pt-20">

            <div className="w-full flex md:px-20">
                <div className="flex w-1/2 justify-start">
                    <img src="/Screenshot 2024-10-04 at 09.50.35.jpg" alt="BookNest" className="ml-20 w-80 h-80 object-contain" />
                </div>

                <div className="flex flex-col w-1/2 py-8">

                    <h2 className="text-3xl md:text-5xl font-serif">BookNest</h2>

                    <div className="flex w-full mt-12">

                        <div className="w-1/3">
                            <h3 className="text-xl tracking-wide leading-relaxed font-serif">About Us</h3>
                            <ul className="flex text-slate-600 text-sm leading-relaxed tracking-wide font-normal flex-col mt-4 gap-1">
                                <li>
                                    <a href="/" className="hover:underline">Mission</a>
                                </li>
                                <li>
                                    <a href="/" className="hover:underline">Team</a>
                                </li>
                                <li>
                                    <a href="/" className="hover:underline">Newsletter</a>
                                </li>
                            </ul>
                        </div>
                        <div className="w-1/3">
                            <h3 className="text-xl tracking-wide leading-relaxed font-serif">Support</h3>
                            <ul className="flex text-slate-600 text-sm leading-relaxed tracking-wide font-normal flex-col mt-4 gap-1">
                                <li>
                                    <a href="/" className="hover:underline">Contact</a>
                                </li>
                                <li>
                                    <a href="/" className="hover:underline">Refund Policy</a>
                                </li>
                                <li>
                                    <a href="/" className="hover:underline">FAQ's</a>
                                </li>
                            </ul>
                        </div>
                        <div className="w-1/3">
                            <h3 className="text-xl tracking-wide leading-relaxed font-serif">Social</h3>
                            <ul className="flex text-slate-600 text-sm leading-relaxed tracking-wide flex-col mt-4 gap-1">
                                <li>
                                    <a href="/" className="hover:underline">Instagram</a>
                                </li>
                                <li>
                                    <a href="/" className="hover:underline">Linkedin</a>
                                </li>
                                <li>
                                    <a href="/" className="hover:underline">Youtube</a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>


            </div>

            <div className="md:px-12 mt-12">
                <div className="border-t flex items-center justify-between border-slate-600 px-12 w-full h-20 text-slate-600 text-sm leading-relaxed tracking-wide">
                    <a href="/" className="hover:underline ">
                        Terms of Service
                    </a>
                    <p>
                        Copyright © Ehab Sohail
                    </p>

                    <button onClick={scrollToTop} className="hover:underline whitespace-nowrap">
                        <div className="flex gap-1">
                            Back to Top
                            <img src="/arrow-up.svg" className="w-6 h-6" />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    )
}

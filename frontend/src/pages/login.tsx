import { CheckIcon, LockIcon, MailIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="flex items-center min-h-screen justify-center max-w-6xl px-6 mx-auto">
            <Link to='https://prebuiltui.com?utm_source=prompt2app' className="flex-1 hidden md:block" title="Go back to home">
                <img
                    className="max-h-55 w-auto"
                    src="/assets/login-page-image.png"
                    alt="leftSideimg"
                />
            </Link>

            <div className="flex-1 flex flex-col items-center justify-center">

                <form className="md:w-96 w-full flex flex-col items-center justify-center">
                    <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
                    <p className="text-sm text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p>

                    <div className="grid grid-cols-3 w-full gap-6 mt-10 mb-2">
                        <button type="button" className="flex items-center justify-center rounded-full py-2.5 hover:bg-gray-50 focus:border-gray-300 border border-gray-200">
                            <img
                                src="/assets/google.svg"
                                alt="google"
                                width={50}
                                height={50}
                                className="size-5.5"
                            />
                        </button>
                        <button type="button" className="flex items-center justify-center rounded-full py-2.5 hover:bg-gray-50 focus:border-gray-300 border border-gray-200">
                            <img
                                src="/assets/x.svg"
                                alt="x"
                                width={50}
                                height={50}
                                className="size-5.5"
                            />
                        </button>
                        <button type="button" className="flex items-center justify-center rounded-full py-2.5 hover:bg-gray-50 focus:border-gray-300 border border-gray-200">
                            <img
                                src="/assets/facebook.svg"
                                alt="facebook"
                                width={50}
                                height={50}
                                className="size-5.5"
                            />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2">
                        <MailIcon size={18} className="text-gray-400" />
                        <input type="email" placeholder="Email id" className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full" required />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2">
                        <LockIcon size={18} className="text-gray-400" />
                        <input type="password" placeholder="Password" className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full" required />
                    </div>

                    <div className="w-full flex items-center justify-between mt-8">
                        <label className="flex gap-2 items-center cursor-pointer">
                            <input type="checkbox" className="hidden peer" defaultChecked />
                            <span className="size-4.5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-gray-800 peer-checked:bg-gray-800">
                                <CheckIcon className="text-white size-3" />
                            </span>
                            <span className="text-gray-500 select-none">Remember me</span>
                        </label>
                        <a className="text-gray-800 underline" href="#">Forgot password?</a>
                    </div>

                    <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition">
                        Login
                    </button>
                    <p className="text-gray-500/90 mt-4">Don’t have an account? <a className="text-gray-800 underline" href="#">Sign up</a></p>
                </form>
            </div>
        </div>
    );
};
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black py-20">
            <div className="container flex justify-between">
                <div className="flex flex-col gap-20">
                    <div>
                        <p className="text-grey text-sm font-medium capitalize mb-4">drop us an email</p>
                        <h4 className="text-white text-2xl font-medium">hello@revierside.com</h4>
                    </div>
                    <div>
                        <p className="text-grey text-sm font-medium capitalize mb-[22px]">San Francisco</p>
                        <h4 className="text-white text-sm font-medium">95 Third Street, San</h4>
                        <h4 className="text-white text-sm font-medium">Francisco, CA 94103</h4>
                    </div>
                </div>
                <div className="flex flex-col gap-20">
                    <div>
                        <ul className="text-white text-sm font-medium flex flex-col gap-4">
                            <li>Other</li>
                            <li>Get In touch</li>
                        </ul>
                    </div>
                    <div className="flex flex-row gap-5">
                        <div className="w-12 h-12 border border-white rounded-full flex justify-center text-white items-center">
                            <FaLinkedinIn />
                        </div>
                        <div className="w-12 h-12 border border-white rounded-full flex justify-center text-white items-center">
                            <FaFacebookF />
                        </div>
                        <div className="w-12 h-12 border border-white rounded-full flex justify-center text-white items-center">
                            <FaTwitter />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
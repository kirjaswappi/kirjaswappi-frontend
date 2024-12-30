import { useState } from "react";
import Button from "../../../components/shared/Button";
import About from "./About";
import MyLibrary from "./MyLibrary";
import RatingAndReview from "./RatingAndReview";

export default function UserTabs() {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        {
            label: "About",
            content: <About />,
        },
        {
            label: "My Library",
            content: <MyLibrary/>,
        },
        {
            label: "Rating & Reviews",
            content: <RatingAndReview />
        },
    ];

    return (
        <div>
            <div className="flex">
                {tabs?.map((tab, index) => (
                    <Button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={` p-2 rounded-full text-sm font-poppins font-normal ${
                            index === activeTab
                                ? "text-primary bg-primary-light"
                                : "text-grayDark"
                        }`}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>
            <div className="bg-[#E4E4E4] w-full h-[1px] mt-2 mb-5"></div>
            {tabs[activeTab]?.content}
        </div>
    );
}

"use client"

import HeaderSlider from "@/components/home/HeaderSlider"
import NewArrivals from "@/components/home/NewArrivals"
import NewsLetter from "@/components/home/NewsLetter"
import TopCategories from "@/components/home/TopCategories"
import TrendingPart from "@/components/home/TrendingPart"

const Home = () => {
    return (
        <div className="px-6 xl:px-16 max-w-[1540px] mx-auto ">
            <HeaderSlider />
            <TopCategories />
            <TrendingPart />
            <NewArrivals/>
            <NewsLetter/>
        </div>
    )
}

export default Home
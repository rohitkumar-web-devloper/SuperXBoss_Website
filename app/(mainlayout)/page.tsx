"use client"

import HeaderSlider from "@/components/home/HeaderSlider"
import NewsLetter from "@/components/home/NewsLetter"
import SchemesAndNewArrivals from "@/components/home/SchemesAndNewArrivals"
import TopCategories from "@/components/home/TopCategories"
import TrendingPart from "@/components/home/TrendingPart"

const Home = () => {
    return (
        <div className="px-6 md:px-16 ">
            <HeaderSlider />
            <TopCategories />
            
            <TrendingPart />
            <SchemesAndNewArrivals/>
            <NewsLetter/>
        </div>
    )
}

export default Home
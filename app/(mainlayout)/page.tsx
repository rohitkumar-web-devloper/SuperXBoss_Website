"use client"

import Brands from "@/components/home/Brands"
import HeaderSlider from "@/components/home/HeaderSlider"
import NewArrivals from "@/components/home/NewArrivals"
import NewsLetter from "@/components/home/NewsLetter"
import TopCategories from "@/components/home/TopCategories"
import TrendingPart from "@/components/home/TrendingPart"
import { useNoAuthProductsQuery } from "@/services/apis/publicApis/hooks"

const Home = () => {
    const { data, isLoading } = useNoAuthProductsQuery({
        new_arrival: true,
        page: 1,
        limit: 10
    });
    return (
        <div className="px-6 xl:px-16 max-w-[1540px] mx-auto ">
            <HeaderSlider data={data} isLoading={isLoading} />
            <Brands
                heading="Top Spare Parts Brands"
                subheading="Best spare parts brands for your needs"
                type="Spare Parts"
            />
            <TopCategories />

            <Brands
                heading="Top Vehicle Brands"
                subheading="Most popular vehicles this week"
                type="Vehicle"
            />

            <TrendingPart />
            <NewArrivals data={data} isLoading={isLoading} />
            {/* <NewsLetter /> */}
        </div>
    )
}

export default Home
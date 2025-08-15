"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import arrow from "@assets/arrow_icon.svg";
import cannonCameraImage from "@assets/cannon_camera_image.png";
import cannonCameraImage2 from "@assets/jbl_soundbox_image.png";
import cannonCameraImage3 from "@assets/macbook_image.png";

const HeaderSlider = () => {
    const sliderData = [
        {
            id: 1,
            title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
            offer: "Limited Time Offer 30% Off",
            buttonText1: "Buy now",
            buttonText2: "Find more",
            imgSrc: cannonCameraImage
        },
        {
            id: 2,
            title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
            offer: "Hurry up only few lefts!",
            buttonText1: "Shop Now",
            buttonText2: "Explore Deals",
            imgSrc: cannonCameraImage2
        },
        {
            id: 3,
            title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
            offer: "Exclusive Deal 40% Off",
            buttonText1: "Order Now",
            buttonText2: "Learn More",
            imgSrc: cannonCameraImage3
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isHovered, sliderData.length]);

    const handleSlideChange = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div
            className="overflow-hidden relative w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                }}
            >
                {sliderData.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded min-w-full"
                    >
                        <div className="md:pl-8 mt-10 md:mt-0">
                            <p className="md:text-base text-default-700 pb-1">
                                {slide.offer}
                            </p>
                            <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                                {slide.title}
                            </h1>
                            <div className="flex items-center mt-4 md:mt-6">
                                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-default rounded-full text-white font-medium">
                                    {slide.buttonText1}
                                </button>
                                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                                    {slide.buttonText2}
                                    <Image
                                        src={arrow}
                                        alt="arrow_icon"
                                        width={16}
                                        height={16}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center flex-1 justify-center">
                            <Image
                                className="md:w-72 w-48"
                                src={slide.imgSrc}
                                alt={`Slide ${index + 1}`}
                                width={300}
                                height={200}
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-8">
                {sliderData.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => handleSlideChange(index)}
                        className={`h-2 w-2 rounded-full cursor-pointer ${currentSlide === index ? "bg-default" : "bg-gray-500/30"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default HeaderSlider;
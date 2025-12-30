import React, { useState, useEffect, useRef } from 'react';
import lifeImages from '../../data/lifeCarousel';

const LifeCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const scrollRefs = useRef([]);
    const animationRunning = useRef(false);

    useEffect(() => {
        if (!isHovered) {
            const numImages = lifeImages[currentIndex].src.length;
            const duration = numImages * 5000; // 5 seconds per image

            // Start scroll animation if needed
            if (scrollRefs.current[currentIndex]) {
                const container = scrollRefs.current[currentIndex];
                const maxScroll = container.scrollWidth - container.clientWidth;
                if (maxScroll > 0) {
                    animationRunning.current = true;
                    container.scrollLeft = 0;
                    const startTime = Date.now();
                    const animateScroll = () => {
                        if (!animationRunning.current) return;
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        container.scrollLeft = maxScroll * progress;
                        if (progress < 1) {
                            requestAnimationFrame(animateScroll);
                        } else {
                            animationRunning.current = false;
                        }
                    };
                    requestAnimationFrame(animateScroll);
                }
            }

            const timeout = setTimeout(() => {
                setCurrentIndex((prev) =>
                    prev === lifeImages.length - 1 ? 0 : prev + 1
                );
            }, duration);

            return () => {
                clearTimeout(timeout);
                animationRunning.current = false;
            };
        } else {
            animationRunning.current = false;
        }
    }, [isHovered, currentIndex]);

    // useEffect(() => {
    //     console.log("Current Index changed to:", currentIndex);
    //     console.log("Number of images:", lifeImages[currentIndex].src.length);
    // }, [currentIndex]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === lifeImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? lifeImages.length - 1 : prevIndex - 1
        );
    };

    return (
        <div
            className="relative w-full max-w-4xl mx-auto group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 shadow-2xl">
                {/* Image Container */}
                <div
                    className="flex transition-transform duration-700 ease-out h-80 sm:h-96"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {lifeImages.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0 relative">
                            <div ref={(el) => scrollRefs.current[index] = el} className="w-full h-full overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                <div className="flex h-full">
                                    {image.src.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={`${image.alt} ${i + 1}`}
                                            className="flex-1 h-full object-cover"
                                            onError={(e) => {
                                                // Fallback for missing images
                                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDQwMCAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjU2IiBmaWxsPSIjMWEyMDJmIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjY2NkNmY2IiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkltYWdlIENvbWluZyBTb29uPC90ZXh0Pgo8L3N2Zz4=';
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                    ))}
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-md">
                        <h4 className="text-2xl font-bold mb-2 text-white">
                            {lifeImages[currentIndex].caption}
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                            {lifeImages[currentIndex].description}
                        </p>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
                    aria-label="Previous image"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
                    aria-label="Next image"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
                    <div
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700 ease-out"
                        style={{ width: `${((currentIndex + 1) / lifeImages.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-6 space-x-3">
                {lifeImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`relative transition-all duration-300 ${index === currentIndex
                            ? 'w-8 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full'
                            : 'w-3 h-3 bg-white/30 hover:bg-white/50 rounded-full hover:scale-110'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {index === currentIndex && (
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-4">
                <span className="text-white/60 text-sm font-medium">
                    {currentIndex + 1} / {lifeImages.length}
                </span>
            </div>
        </div>
    );
};

export default LifeCarousel;
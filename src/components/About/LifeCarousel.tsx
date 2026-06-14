import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import lifeImages from '../../data/lifeCarousel';

const LifeCarousel = () => {
    const reducedMotion = useReducedMotion();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
    const animationRunning = useRef(false);

    useEffect(() => {
        if (reducedMotion || isPaused) {
            animationRunning.current = false;
            return;
        }

        const numImages = lifeImages[currentIndex].src.length;
        const duration = numImages * 5000;

        if (scrollRefs.current[currentIndex]) {
            const container = scrollRefs.current[currentIndex]!;
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
    }, [reducedMotion, isPaused, currentIndex]);

    const goToSlide = (index: number) => {
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

    const arrowClass =
        'absolute top-1/2 -translate-y-1/2 rounded-full border border-border bg-surface/90 p-3 text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none max-md:opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100';

    return (
        <div
            className="group relative mx-auto w-full max-w-4xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                <div
                    className="flex h-80 transition-transform duration-700 ease-out motion-reduce:transition-none sm:h-96"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {lifeImages.map((image, index) => (
                        <div key={index} className="relative w-full shrink-0">
                            <div
                                ref={(el) => { scrollRefs.current[index] = el; }}
                                className="h-full w-full overflow-x-auto"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <div className="flex h-full">
                                    {image.src.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={image.alt}
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full flex-1 object-cover"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-md">
                        <h4 className="mb-2 text-2xl font-bold text-white">
                            {lifeImages[currentIndex].caption}
                        </h4>
                        <p className="text-sm leading-relaxed text-white/85">
                            {lifeImages[currentIndex].description}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={prevSlide}
                    className={`left-4 ${arrowClass}`}
                    aria-label="Previous slide"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={nextSlide}
                    className={`right-4 ${arrowClass}`}
                    aria-label="Next slide"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {!reducedMotion && (
                    <button
                        type="button"
                        onClick={() => setIsPaused((paused) => !paused)}
                        className="absolute left-4 top-4 rounded-full border border-border bg-surface/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-md transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
                    >
                        {isPaused ? 'Play' : 'Pause'}
                    </button>
                )}

                <div className="absolute left-0 right-0 top-0 h-1 bg-border">
                    <div
                        className="h-full bg-accent transition-all duration-700 ease-out motion-reduce:transition-none"
                        style={{ width: `${((currentIndex + 1) / lifeImages.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-center space-x-3">
                {lifeImages.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => goToSlide(index)}
                        className={`relative transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
                            index === currentIndex
                                ? 'h-3 w-8 rounded-full bg-accent'
                                : 'h-3 w-3 rounded-full bg-border hover:bg-muted/40'
                        }`}
                        aria-label={`Go to slide ${index + 1}: ${lifeImages[index].caption}`}
                        aria-current={index === currentIndex ? 'true' : undefined}
                    />
                ))}
            </div>

            <div className="mt-4 text-center">
                <span className="text-sm font-medium text-muted">
                    {currentIndex + 1} / {lifeImages.length}
                </span>
            </div>
        </div>
    );
};

export default LifeCarousel;

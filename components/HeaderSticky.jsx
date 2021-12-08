import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

export default function HeaderSticky() {

    const headerLogo = "Logo"

    const navbarLinks = [
        {
            "name": "Link #1",
            "href": "#"
        }, {
            "name": "Link #2",
            "href": "#"
        }, {
            "name": "Link #3",
            "href": "#"
        }, {
            "name": "Link #4",
            "href": "#"
        }
    ]

    const slideMode = true

    const fadeInMode = true

    const headerBackground = "white"

    const animationSpeed = "0.5"

    const showContainersBorders = false;

    /////////////////////////////////////

    const [showStickyHeader, setShowStickyHeader] = useState(false)
    const [headerStickyReachedTop, setHeaderStickyReachedTop] = useState(false)

    const headerFixed = useRef()
    const headerSticky = useRef()

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, [])

    const scrollHandler = () => {
        const headerFixedIsOffViewport = headerFixed.current.getBoundingClientRect().bottom < 0
        const headerStickyReachedTop = headerFixed.current.getBoundingClientRect().top == 0
        const headerStickyOffsetsTop = headerFixed.current.getBoundingClientRect().top < 0
        
        if (headerFixedIsOffViewport) {
            setShowStickyHeader(true)
        }
        if (headerStickyReachedTop) {
            setShowStickyHeader(false)
            setHeaderStickyReachedTop(true)
        } 
        else if (headerStickyOffsetsTop){
            setHeaderStickyReachedTop(false)
        }
    };

    return (
        <>
            {/* Fixed Header */}
            <div ref={headerFixed} className={`header__wrapper fixed ${showStickyHeader ? "hidden" : "active"}`}>
                <div className="header__container">
                    <div className="header__logo-wrapper">
                        <div className="header__logo">
                            {headerLogo}
                        </div>
                    </div>
                    <div className="navbar__wrapper">
                        <nav>
                            <ul className="navbar__list">
                                {
                                    navbarLinks.map((link, index) => {
                                        return (
                                            <li key={index}>
                                                <Link href={link.href}>
                                                    <a className="navbar__link">
                                                        {link.name}
                                                    </a>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Sticky Header */}
            <div ref={headerSticky} className={`header__wrapper sticky ${slideMode ? "slide" : ""} ${showStickyHeader ? "active" : "hidden"} ${headerStickyReachedTop ? "top-reach" : ""}`}>
                <div className="header__container">
                    <div className="header__logo-wrapper">
                        <div className="header__logo">
                            {headerLogo}
                        </div>
                    </div>
                    <div className="navbar__wrapper">
                        <nav>
                            <ul className="navbar__list">
                                {
                                    navbarLinks.map((link, index) => {
                                        return (
                                            <li key={index}>
                                                <Link href={link.href}>
                                                    <a className="navbar__link">
                                                        {link.name}
                                                    </a>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .header__wrapper {
                    background: ${headerBackground};
                    box-shadow: 2px 2px 5px -1px #bdbdbd;
                }
                .header__wrapper.fixed.hidden {
                    visibility: hidden;
                }
                .header__wrapper.sticky {
                    position: fixed;
                    width: 100%;
                    top: 0;
                    transform: translateY(${slideMode ? "-100%" : "0"});
                    transition: ${animationSpeed}s;
                    opacity: ${fadeInMode ? 0 : 1};
                }
                .header__wrapper.sticky.slide {
                    transform: translateY(-100%);
                }
                .header__wrapper.sticky.active {
                    opacity: 1;
                    transform: translateY(0%);
                }
                .header__wrapper.sticky.hidden.top-reach {
                    display: none;
                }
                .header__logo-wrapper{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 4rem;
                }
                .header__logo {
                    padding: 1rem;
                    cursor: pointer;
                }
                .navbar__list {
                    list-style-type:none;
                    padding-inline-start: 0;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                }
                .header__wrapper {
                    border: 1px solid ${showContainersBorders ? "black" : "transparent"};
                }
                .header__logo {
                    border: 1px solid ${showContainersBorders ? "black" : "transparent"};
                }
                .navbar__link {
                    border: 1px solid ${showContainersBorders ? "black" : "transparent"};
                }
                
            `}</style>

        </>
    )
};


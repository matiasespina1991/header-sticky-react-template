import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

export default function HeaderSticky() {

    const headerLogo = "https://i.ibb.co/cwdKp8m/demo-logo.png"

    const navbarLinks = [
        {
            "name": "home",
            "href": "#"
        }, {
            "name": "about us",
            "href": "#"
        }, {
            "name": "shop now",
            "href": "#"
        }, {
            "name": "contact",
            "href": "#"
        }
    ]

    /////////////////////////////////////////////////////////////

    // Defines de font size of the navbar links. Supports 'px', 'rem', 'em' or any CSS font unit
    const navbarLink_fontSize = '1rem';

    // Display healogo--background-img and navbar in Horizontal Layout instead of the default Vertical - On/Off
    const horizontalLayout = false

    const glassMode = false

    // Sticky header "slide in" animation On/Off (Feature disabled for mobile)
    const stickySlideInMode = false

    // Sticky header "fade in" animation On/Off (Feature disabled for mobile)
    const stickyFadeInMode = false

    // Speed of fade in & slide in animation in seconds
    const animationSpeed = "0.6"

    // Header Background color. Accepts color names, "transparent" or hex colors (eg. #0070F3)
    const headerBackgroundColor = "white"

    // If the parent elements or the body has padding or margin and the 
    // Header looks narrower, the following function force the header_fixed and 
    // header_sticky header to reach the full width of the browser viewport.
    const forceFullWidth = false

    // Display special Mobile Layout
    const mobileLayout = true

    // Hide the header on mobile
    const hideOnMobile = false

    // Specify the max width for the mobile layout
    const setMobileWidth = 600

    // Displays borders around header inner div elements / Use this as a Debug Mode - On/Off
    const showContentBorders = false

    /////////////////////////////////////////////////////////////

    const [showStickyHeader, setShowStickyHeader] = useState(false)
    const [headerStickyReachedTop, setHeaderStickyReachedTop] = useState(false)
    const [headerHeight, setHeaderHeight] = useState()
    const [navlinkHeight, setNavlinkHeight] = useState(0)
    const [expandedMobileNavbar, setExpandedMobileNavbar] = useState(false)

    const navbarListHeight = (navlinkHeight * navbarLinks.length)*2;

    const headerFixed = useRef()
    const headerSticky = useRef()
    const headerLogoWrapper = useRef()
    const navLink = useRef()

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, [])

    useEffect(() => {
        setHeaderHeight(headerLogoWrapper.current.getBoundingClientRect().height)
        setNavlinkHeight(navLink.current.getBoundingClientRect().height)
    },[headerHeight, navLink])

    const handleMobileNavbarIconClick = () => {
        setExpandedMobileNavbar(!expandedMobileNavbar)
    }

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
            
            <div 
                ref={headerFixed} 
                className={
                    'header__wrapper ' + 
                    'header_fixed ' +
                    (showStickyHeader ? "hidden " : "active ") +
                    (forceFullWidth ? "force-full-width" : "")
                }
            >
                <div 
                    className={
                        'header__container ' +
                        (horizontalLayout ? 'horizontal-layout ' : "")
                    }
                >
                    <div 
                        ref={headerLogoWrapper} 
                        className="header__logo-wrapper"
                    >
                        <div className="header__logo">
                            <Link href="/" passHref>
                                <div className="header__logo_background-img"></div>
                            </Link>
                        </div>
                    </div>
                    <div className={`navbar__wrapper ${expandedMobileNavbar ? "mobile" : ""}`}>
                        <nav>
                            <ul className={`navbar__list ${mobileLayout ? "mobile" : ""} ${expandedMobileNavbar ? "expanded" : ""}`}>
                                {
                                    navbarLinks.map((link, index) => {
                                        return (
                                            <li key={index}>
                                                <Link href={link.href}>
                                                    <a ref={navLink} className="navbar__link">
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

            <div 
                ref={headerSticky} 
                className={
                    "header__wrapper " +
                    "header_sticky " +
                    (stickySlideInMode ? "slide " : "") +
                    (showStickyHeader ? "active " : "hidden ") +
                    (headerStickyReachedTop ? "top-reach " : "") +
                    (forceFullWidth ? "force-full-width" : "")
                }
            >
                <div 
                    className={
                        'header__container ' +
                        (horizontalLayout ? 'horizontal-layout ' : "")
                    }
                >
                    <div className="header__logo-wrapper">
                        <div className="header__logo">
                            <div className="header__logo_background-img"></div>
                        </div>
                    </div>
                    <div 
                        className={`header__mobile-navbar-icon-wrapper ${mobileLayout ? "mobile" : ""}`}
                    >
                        <label htmlFor="check">
                            <input onClick={() => handleMobileNavbarIconClick()} type="checkbox" id="check"/> 
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                    <div className={`navbar__wrapper ${expandedMobileNavbar ? "mobile" : ""}`}>
                        <nav>
                        <ul className={`navbar__list ${mobileLayout ? "mobile" : ""} ${expandedMobileNavbar ? "expanded" : ""}`}>
                                {
                                    navbarLinks.map((link, index) => {
                                        return (
                                            <li key={index}>
                                                <Link href={link.href}>
                                                    <a ref={navLink} className="navbar__link">
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
                    background-color: ${headerBackgroundColor};
                    box-shadow: 2px 2px 5px -1px #bdbdbd;
                }
                .header__wrapper.header_fixed{
                    ${
                        glassMode ?
                        "background-color: transparent;"
                        :
                        ""
                    }
                }
                .header__wrapper.header_sticky {
                    ${
                        glassMode ?
                        "background-color: #ffffffd6;backdrop-filter: blur(6px);"
                        :
                        ""
                    }
                }
                .header__wrapper.header_fixed.hidden {
                    visibility: hidden;
                }
                .header__wrapper.header_sticky {
                    position: fixed;
                    width: 100%;
                    top: 0;
                    transform: translateY(${stickySlideInMode ? "-100%" : "0"});
                    transition: ${animationSpeed}s;
                    opacity: ${stickyFadeInMode ? 0 : 1};
                }
                .header__wrapper.header_sticky.slide {
                    transform: translateY(-100%);
                }
                .header__wrapper.header_sticky.active {
                    opacity: 1;
                    transform: translateY(0%);
                }
                .header__wrapper.header_sticky.hidden.top-reach .header__logo_background-img {
                    width: 3rem;
                    height: 3rem;
                }
                .header__wrapper.header_sticky.hidden .header__logo_background-img{
                    transition: width 0.2s;
                    transition: height 0.2s;
                }
                .header__wrapper.force-full-width {
                    ${forceFullWidth ? "width: 100vw;margin-left: calc(50% - 50vw);":""}
                }
                .header__container.horizontal-layout {
                    display: grid;
                    grid-template-columns: 1fr 8fr 1fr;
                }
                .header__logo-wrapper{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2;
                    ${!horizontalLayout ? "margin-top:1rem;" : ""}
                }
                .header__logo {
                    cursor: pointer;
                }
                .header__logo_background-img{
                    background-image: url('${headerLogo}');
                    width: 3rem;
                    height: 3rem;
                    transition: width 0.2s;
                    transition: height 0.2s;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    ${horizontalLayout ? "background-size: 2rem;" : ""}
                }
                .header_sticky .header__logo_background-img{
                    ${
                        !horizontalLayout ?
                        "width: 2rem;height: 2rem;"
                        :
                        ""
                    }
                    
                }
                .header__mobile-navbar-icon-wrapper{
                    transform: scale(0.3) translateY(-15.8px) translateX(40px);
                    display: none;
                    width: 100px;
                    min-height: ${headerHeight}px;
                    position: absolute;
                    float: right;
                    clear: both;
                    top: 0;
                    right: 0;
                    justify-content: center;
                    align-items: center;
                }
                .navbar__list {
                    list-style-type:none;
                    padding-inline-start: 0;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                }
                .navbar__list.mobile.expanded {
                    padding: 1rem 0;
                    margin: 0rem;
                }
                .header__wrapper {
                    border: 1px solid ${showContentBorders ? "black" : "transparent"};
                }
                .header__logo {
                    border: 1px solid ${showContentBorders ? "black" : "transparent"};
                }
                .navbar__link {
                    border: 1px solid ${showContentBorders ? "black" : "transparent"};
                }
                label{
                    display:flex;
                    flex-direction:column;
                    width:70px;
                    cursor:pointer;
                }
                label span{
                    background: black;
                    border-radius:10px;
                    height:7px;
                    margin: 7px 0;
                    transition: .4s  cubic-bezier(0.68, -0.6, 0.32, 1.6);
                }
                span:nth-of-type(1){
                    width:50%;
                    
                }
                span:nth-of-type(2){
                    width:100%;
                }
                span:nth-of-type(3){
                    width:75%;
                }
                input[type="checkbox"]{
                    display:none;
                }
                input[type="checkbox"]:checked ~ span:nth-of-type(1){
                    transform-origin:bottom;
                    transform:rotatez(45deg) translate(8px,0px)
                }
                input[type="checkbox"]:checked ~ span:nth-of-type(2){
                    transform-origin:top;
                    transform:rotatez(-45deg)
                }
                input[type="checkbox"]:checked ~ span:nth-of-type(3){
                    transform-origin:bottom;
                    width:50%;
                    transform: translate(30px,-11px) rotatez(45deg);
                }
                
                @media (max-width: ${setMobileWidth}px) {
                    .header__container.horizontal-layout {
                        display: grid;
                        grid-template-columns: 1fr 9fr;
                    }
                    .header__wrapper.header_fixed{
                        visibility: hidden;
                    }
                    .header__wrapper.header_sticky, .navbar__wrapper {
                        ${
                            glassMode ?
                            "background-color: #ffffffbd;backdrop-filter: blur(6px);"
                            :
                            ""
                        }
                    }
                    .navbar__wrapper {
                        ${mobileLayout ? "position: absolute;" : ""}
                        width: 100%;
                        background: white;
                    }
                    .header__wrapper.header_sticky {
                        transform: translateY(0) !important;
                        transition: 0s !important;
                        opacity: 1 !important;
                    }
                    .header__wrapper.header_sticky.hidden.top-reach {
                        display: block;
                    }
                    .header__logo-wrapper{
                        ${
                            !horizontalLayout ?
                            "margin-top: 0;"
                            :
                            ""
                        }
                    }
                    .header_sticky .header__logo_background-img{
                        ${
                            !horizontalLayout ?
                            "width: 3rem;height: 3rem;"
                            :
                            ""
                        }
                        
                    }
                    .header__logo_background-img{
                        background-size: 2rem;
                    }
                    .header__mobile-navbar-icon-wrapper.mobile{
                        display: flex;
                    }
                    .horizontal-layout .navbar__wrapper{
                        ${mobileLayout ? `top: ${headerHeight}px` : ""}
                    }
                    .navbar__wrapper.mobile{
                        box-shadow: 2px 2px 5px -1px #bdbdbd;
                    }
                    .navbar__list.mobile {
                        text-align: center;
                        height: 0px;
                        transition: height 0.2s;
                        overflow: hidden;
                        margin-block: unset;
                        flex-direction: column;
                    }
                    .navbar__list.mobile.expanded{
                        height: ${navbarListHeight * 2}px;
                        margin: 0.3rem 0 1rem 0;
                    }
                    .navbar__list.mobile li {
                        padding: 0.7rem;
                    }
                    .navbar__link{
                        font-size: ${navbarLink_fontSize};
                    }
                }
                @media (max-width: ${setMobileWidth}px) {
                    .header__wrapper{
                        display: ${hideOnMobile ? "none": "block"};
                    }
                }
            `}</style>

        </>
    )
};


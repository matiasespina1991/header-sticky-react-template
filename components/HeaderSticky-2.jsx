import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

export default function HeaderSticky() {

    const headerLogo = "https://i.ibb.co/cwdKp8m/demo-logo.png"

    const navbarLinks = [
        {
            "name": "home",
            "href": "/"
        }, {
            "name": "about us",
            "href": "/"
        }, {
            "name": "shop now",
            "href": "/"
        }, {
            "name": "contact",
            "href": "/"
        }
    ]

    /////////////////////////////////////////////////////////////

    // Defines de font size of the navbar links. Supports 'px', 'rem', 'em' or any CSS font unit
    const navbarLink_fontSize = '1rem';

    // Displays header logo and navbar in Horizontal Layout instead of the default Vertical - On/Off
    const horizontalLayout = true

    // Defines a transparent layout
    const glassMode = true

    // sticky header in default mode (If true it will override other modes)
    const DEFAULT_STICKY_MODE = false

    // Sticky header "slide in" animation On/Off (Feature disabled for mobile)
    const slideInMode = true

    // Sticky header "fade in" animation On/Off (Feature disabled for mobile)
    const fadeInMode = false

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

    const [headerHeight, setHeaderHeight] = useState()
    const [navlinkHeight, setNavlinkHeight] = useState()
    const [slideInEffectIsOn, setSlideInEffectIsOn] = useState(false)
    const [headerFixedIsOffViewport, setHeaderFixedIsOffViewport] = useState(false)
    const [headerStickyReachedTop, setHeaderStickyReachedTop] = useState(true)
    const [expandedMobileNavbar, setExpandedMobileNavbar] = useState(false)
    const [headerHorizontalOffset, setHeaderHorizontalOffset] = useState()

    const navbarListHeight = (navlinkHeight * navbarLinks.length)*3;

    const spaceFillContainer = useRef()
    const headerSticky = useRef()
    const headerLogoWrapper = useRef()
    const navLink = useRef()

    const scrollHandler = () => {
        setHeaderFixedIsOffViewport(spaceFillContainer.current.getBoundingClientRect().bottom < -1)
        setHeaderStickyReachedTop(spaceFillContainer.current.getBoundingClientRect().top >= 0)
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, [])

    useEffect(() => {
        if (headerFixedIsOffViewport === true) {
            setSlideInEffectIsOn(true)
        }
        if (headerStickyReachedTop === true){
            setSlideInEffectIsOn(false)
        }
    }, [headerFixedIsOffViewport, slideInEffectIsOn , headerStickyReachedTop ])

    useEffect(() => {
        const getHeaderHorizontalOffset = headerSticky.current.getBoundingClientRect().x
        setHeaderHorizontalOffset(getHeaderHorizontalOffset)
    }, [headerHorizontalOffset])



    useEffect(() => {
        setHeaderHeight(headerSticky.current.getBoundingClientRect().height)
        setNavlinkHeight(navLink.current.getBoundingClientRect().height)
    },[headerHeight, navLink])

    const handleMobileNavbarIconClick = () => {
        setExpandedMobileNavbar(!expandedMobileNavbar)
    }
    
    return (
        <>
            {/* Space-fill Container */}
            <div
                ref={spaceFillContainer} 
                className={
                    'space-fill-container ' +
                    ( slideInMode ? 'header-effects--ON ' : 'header-effects--OFF ' ) +
                    ( slideInEffectIsOn ? 'slide-effect--ON ' : 'slide-effect--OFF' )
                }
            >

            </div>

            {/* Sticky Header */}

            <div 
                ref={headerSticky} 
                className={
                    'header__wrapper ' +
                    ( glassMode ? 'glass-mode ' : "" ) + 
                    ( slideInMode ? 'slide-effect ' : "" ) +
                    ( fadeInMode ? 'fade-in-effect ' : "" ) +
                    ( slideInEffectIsOn ? 'slide-effect--ON ' : 'slide-effect--OFF ' ) +
                    ( !slideInMode && !fadeInMode || DEFAULT_STICKY_MODE ? 'default-sticky-mode ' : "" ) +
                    ( forceFullWidth ? 'force-full-width ' : "" )
                }
            >
                <div 
                    className={
                        'header__container ' +
                        ( horizontalLayout ? 'horizontal-layout ' : "" )
                    }
                >
                    <div 
                        ref={headerLogoWrapper} 
                        className='header__logo-wrapper'
                    >
                        <div className='header__logo'>
                            <div className='header__logo_background-img'></div>
                        </div>
                    </div>
                    <div 
                        className={`header__mobile-navbar-icon-wrapper ${ mobileLayout ? 'mobile' : "" }`}
                    >
                        <label className="mobile-menu-icon__wrapper" htmlFor="mobile-menu-icon">
                            <input onClick={() => handleMobileNavbarIconClick()} type="checkbox" id="mobile-menu-icon"/> 
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                    <div className={`navbar__wrapper ${ expandedMobileNavbar ? 'mobile' : "" }`}>
                        <nav>
                        <ul className={`navbar__list ${mobileLayout ? 'mobile' : ""} ${ expandedMobileNavbar ? 'expanded' : "" }`}>
                                {
                                    navbarLinks.map((link, index) => {
                                        return (
                                            <li key={index}>
                                                <Link scroll={false} href={link.href}>
                                                    <a ref={navLink} className='navbar__link'>
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
                .space-fill-container.header-effects--ON{
                    display: block;
                }

                .space-fill-container.header-effects--OFF{
                    display: none;
                }

                .space-fill-container.slide-effect--OFF{
                    margin-bottom: -${headerHeight}px;
                }

                .space-fill-container.slide-effect--ON{
                    margin-bottom: 0px;
                }

                .slide-effect {
                    transition: 0.2s;
                }

                .header__wrapper.slide-effect--OFF {
                    top: -100%;
                }

                .header__wrapper.slide-effect--ON {
                    position: fixed;
                    top: 0%;
                }
            `}</style>

            <style jsx>{`
                .space-fill-container{
                    height: ${headerHeight}px;
                    margin-bottom: -${headerHeight}px;
                }
                .header__wrapper{
                    background-color: ${headerBackgroundColor};
                    box-shadow: 2px 2px 5px -1px #bdbdbd;
                    width: 100%;
                    transition: ${animationSpeed}s;
                }
                .header__wrapper.glass-mode {
                    background-color: #ffffffb0;
                    backdrop-filter: blur(6.3px);
                }
                .header__wrapper.force-full-width {
                    width: 100vw;
                    margin-left: -${headerHorizontalOffset}px;
                }
                .header__wrapper.default-sticky-mode {
                    position: sticky;
                    top: 0;
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
                .header__wrapper .header__logo_background-img{
                    ${
                        !horizontalLayout ?
                        "height: 2rem;"
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
                .navbar__link{
                    font-size: ${navbarLink_fontSize};
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
                .mobile-menu-icon__wrapper{
                    display:flex;
                    flex-direction:column;
                    width:70px;
                    cursor:pointer;
                }
                .mobile-menu-icon__wrapper span{
                    background: black;
                    border-radius:10px;
                    height:7px;
                    margin: 7px 0;
                    transition: .4s  cubic-bezier(0.68, -0.6, 0.32, 1.6);
                }
                .mobile-menu-icon__wrapper span:nth-of-type(1){
                    width:50%;
                    
                }
                .mobile-menu-icon__wrapper span:nth-of-type(2){
                    width:100%;
                }
                .mobile-menu-icon__wrapper span:nth-of-type(3){
                    width:75%;
                }
                .mobile-menu-icon__wrapper input[type="checkbox"]{
                    display:none;
                }
                .mobile-menu-icon__wrapper input[type="checkbox"]:checked ~ span:nth-of-type(1){
                    transform-origin:bottom;
                    transform:rotatez(45deg) translate(8px,0px)
                }
                .mobile-menu-icon__wrapper input[type="checkbox"]:checked ~ span:nth-of-type(2){
                    transform-origin:top;
                    transform:rotatez(-45deg)
                }
                .mobile-menu-icon__wrapper input[type="checkbox"]:checked ~ span:nth-of-type(3){
                    transform-origin:bottom;
                    width:50%;
                    transform: translate(30px,-11px) rotatez(45deg);
                }
                
                @media (max-width: ${setMobileWidth}px) {
                    .header__container.horizontal-layout {
                        display: grid;
                        grid-template-columns: 1fr 9fr;
                    }
                    .header__wrapper, .navbar__wrapper {
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
                    .header__wrapper {
                        transform: translateY(0) !important;
                        transition: 0s !important;
                        opacity: 1 !important;
                    }
                    .header__logo-wrapper{
                        ${
                            !horizontalLayout ?
                            "margin-top: 0;"
                            :
                            ""
                        }
                    }
                    .header__wrapper .header__logo_background-img{
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
                        ${mobileLayout ? `top: calc(${headerHeight}px - 2px)` : ""}
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
                        height: ${navbarListHeight}px;
                    }
                    .navbar__list.mobile li {
                        padding: 0.7rem;
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




// .header__wrapper.fixed.reached-top .header__logo_background-img {
//     width: 3rem;
//     height: 3rem;
//     transition: height 0.2s;
// }
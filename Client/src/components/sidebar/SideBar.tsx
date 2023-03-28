import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./sidebar.scss"

const sidebarNavItems: NavItem[] = [
    {
        display: "Dashboard",
        icon: <i className='bi bi-graph-up'></i>,
        to: "/dashboard",
        section: 'dashboard'
    },
    {
        display: "Roastings",
        icon: <i className='bi bi-fire'></i>,
        to: "/roastings",
        section: 'roastings'
    },
    {
        display: "Green coffee",
        icon: <i className='bi bi-basket3-fill'></i>,
        to: "/greencoffee",
        section: 'greencoffee'
    }
]

const SideBar = (): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sideBarRef = useRef<HTMLDivElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            if (sideBarRef.current && indicatorRef.current) {
                const sidebarItem = sideBarRef.current.querySelector('.sideBarMenuItem');
                indicatorRef.current.style.height = `${sidebarItem?.clientHeight}px`
                setStepHeight(sidebarItem?.clientHeight ?? 0)
            }
        }, 50)
    }, []);
    
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return(
        <div className='sideBar'>
            <h1 className='sideBarLogo'>Brew Place Roastery</h1>
            <hr />
            <div ref={sideBarRef} className='sideBarMenu'>
                <div 
                    ref={indicatorRef} 
                    className="sideBarMenuIndicator"
                    style={{
                        transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                    }}
                ></div>
                {
                    sidebarNavItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <div className={`sideBarMenuItem ${activeIndex === index ? 'active' : ''}`}>
                                <div className="sideBarMenuItemIcon">
                                    {item.icon}
                                </div>
                                <div className="sideBarMenuItemText">
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

type NavItem = {
    display: string;
    icon: JSX.Element;
    to: string;
    section: string;
}

export default SideBar;
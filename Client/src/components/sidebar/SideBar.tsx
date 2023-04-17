import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./sidebar.scss"
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

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
        display: "Green Coffee",
        icon: <i className='bi bi-basket3-fill'></i>,
        to: "/greencoffee",
        section: 'greencoffee'
    },
    {
        display: "Users",
        icon: <i className='bi bi-people-fill'></i>,
        to: "/users",
        section: 'users'
    }
]

const SideBar = (): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const [collapsed, setCollapsed] = useState(true);
    const [isUsersEnabled, setIsUsersEnabled] = useState(false)

    const sideBarRef = useRef<HTMLDivElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const checkUsersEnabled = async () => {
            try {
                await axiosPrivate.get('/Authentication/users');
                setIsUsersEnabled(true);
            } catch (error) {
                setIsUsersEnabled(false);
            }
        }
        checkUsersEnabled()
    })
    

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

    const handleLogOut = async () => {
        try {
            await axiosPrivate.post('/token/logout',
            {
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken')
            })
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        } catch (error) {
            console.error(error)
        } finally {
            navigate('/')
        }
    }

    return(
        <div className={`sideBar ${collapsed ? 'collapsed' : ''}`}>
            <h1 className={`sideBarLogo`}>
                {collapsed ? 'BP' : 'Brew Place Roastery'}
            </h1>
            <hr />
            <div ref={sideBarRef} className='sideBarMenu'>
                <div 
                    ref={indicatorRef} 
                    className={`sideBarMenuIndicator ${collapsed ? 'collapsed' : ''}`}
                    style={{
                        transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                    }}
                ></div>
                {
                    sidebarNavItems.map((item, index) => (
                        <Link to={item.section === 'users' && !isUsersEnabled ? {} : item.to} key={index}>
                            <div className={`sideBarMenuItem 
                                ${activeIndex === index ? 'active' : ''} 
                                ${collapsed ? 'collapsed' : ''}
                                ${item.section === 'users' && !isUsersEnabled ? 'disabled' : ''}`
                                }>
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
            <button
                className={`logoutButton ${collapsed ? 'collapsed' : ''}`}
                onClick={handleLogOut}
            >
                Log Out
            </button>
            <button 
                className={`collapseButton ${collapsed ? 'collapsed' : ''}`}
                onClick={() => {setCollapsed(prev => !prev)}}>
                <i className={ collapsed 
                    ? "bi bi-arrows-expand"
                    : "bi bi-arrows-collapse" 
                }/>
            </button>
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
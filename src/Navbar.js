import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import './CSS/Navbar.css';



export default function Navbar(){
    const handleScroll = () => {
        const position = window.pageYOffset;
        document.documentElement.style.setProperty('--nav-bg-alpha', Math.max(Math.min(1 - (position - 100) / 600, 1), 0.5));
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return(
        <nav className="navbar">
            <HomeBtn/>

            <NavContainer>
                <NavItem type="Button" title="Startseite" link="/"/>

                <NavItem type="Dropdown" title="Über uns">
                    <NavItem type="Child" title="Gottesdienste" link="/gottesdienste"/>
                    <NavItem type="Child" title="Glaubensbekenntnis" link="/glaubensbekenntnis"/>
                </NavItem>

                <NavItem type="Button" title="Veranstaltungen" link="/veranstaltungen"/>


                <NavItem type="Dropdown" title="Predigten">
                    <NavItem type="Child" title="Aktuelle" link="/aktuelle-predigten"/>
                    <NavItem type="Child" title="Predigtreihen" link="/predigtreihen"/>
                </NavItem>

                <NavItem type="Button" title="Kontakt" link="/kontakt"/>

                <NavItem type="Button" title="Русский" link="/russian" tag="lang"/>
            </NavContainer>
        </nav>
    );
}

function useIsNarrowScreen(){
    // Listener to change type of Navbar depending on the screen size (screen-width smaller than 575px -> Dropdown-Navbar; else -> Casual Line-Navbar).
    // Important, because screen width can dynamically change, when e.g. rotating the screen. Otherwise Layout might break

    const mediaWatcher = window.matchMedia("(max-width: 575px)");

    //Set state with initial value
    const [isNarrowScreen, setIsNarrowScreen] = useState(mediaWatcher.matches);
    
    //Listener for when the screen width changes
    function updateIsNarrowScreen(e) {
        setIsNarrowScreen(e.matches);
    }
    mediaWatcher.addEventListener('change', updateIsNarrowScreen)

    return isNarrowScreen;
}



function HomeBtn(){
    return(
        <Link to="/" className="home-btn">
            <button className="btn-h" ><img className="image" src={process.env.PUBLIC_URL + "/Icons/fbg-bremen_icon-black-fg.png"} alt="FBG-Bremen Icon"/></button>
        </Link>
    );
}



function NavContainer(params){
    //currently any other objects than those declared in MapToObj (Nav_"name") will be ignored
    let isNarrowScreen = useIsNarrowScreen();

    let content = <NavContent> {React.Children.map(params.children, (child) => { return child; })} </NavContent>;

    if(isNarrowScreen) return <Dropdown>{ content }</Dropdown>
    else return <div className="line-nav">{ content }</div>
}

function NavContent(params){
    const content = React.Children.toArray(params.children);
    return MapToObj(content);
}

//returns for every nav-item the equivalent object (depending on type of navbar (dropdown/line-nav))
function MapToObj(objs){
    let isNarrowScreen = useIsNarrowScreen();

    return objs.map((obj) => {
        if(obj === undefined || obj.props === undefined) return null;
        
        switch(obj.props.type){
            case "Button":
                if(isNarrowScreen) return <DropdownItem title={obj.props.title} link={obj.props.link}  key={obj.props.title}/>;
                else return <NavbarBtn title={obj.props.title} link={obj.props.link}  key={obj.props.title} tag={obj.props.tag}/>;
            case "Dropdown":
                if(isNarrowScreen) return <NestedDropdown title={obj.props.title}  key={obj.props.title}>{ MapToObj(React.Children.toArray(indentNavItemChildren(obj.props.children))) }</NestedDropdown>;
                else return <Dropdown title={obj.props.title} key={obj.props.title}>{ MapToObj(React.Children.toArray(obj.props.children)) }</Dropdown>;
            case "Child":
                if(isNarrowScreen) return <DropdownItem title={obj.props.title} link={obj.props.link}  key={obj.props.title}/>;
                else return <DropdownItem title={obj.props.title} link={obj.props.link} key={obj.props.title}/>;
            case "NestedDropdown":
                return <NestedDropdown title={obj.props.title}  key={obj.props.title}>{ MapToObj(React.Children.toArray(indentNavItemChildren(obj.props.children))) }</NestedDropdown>;
            default:
                console.warn("Object not identified! Object of type: " + obj.type.name);
                return null;
        }
    });
}

//#region Navbar-Objects

function NavbarBtn(props){
    const location = useLocation().pathname;
    return(
        <Link to={props.link} className="btn-nav">
            <button className="btn-n btn-clickable">
                <p className={`text ${props.tag === "lang" ? "lang-box" : ""} ${location === props.link ? "page-loaded" : ""}`}>{props.title}</p>
            </button>
        </Link>
    );
}


var closeDropdown;

function Dropdown(props){
    //Dropdown opening behaviour - opens also when hovering
    const [isOverButton, setIsOverButton] = useState(false);
    const [isOverList, setIsOverList] = useState(false);
    const [isOpen, setIsOpen] = useState();
    const [animation, setAnimation] = useState(0);
    closeDropdown = () => { setIsOpen(false); setIsOverList(false); setIsOverButton(false); }

    useLayoutEffect(() => {
        if (isOpen && !isOverButton && !isOverList) {
            setIsOpen(false);
        } else if (!isOpen && (isOverButton || isOverList)) {
            setIsOpen(true);
            setAnimation(0);
        }
    }, [isOverButton, isOverList, isOpen]);


    return (
        <div className="dropdown">
            <div className="btn-d" onMouseEnter={() => { setIsOverButton(true); }} onMouseLeave={() => { setIsOverButton(false); } } onClick={() => { setIsOpen(!isOpen); setIsOverButton(!isOpen); setIsOverList(false); }}>
                <DropdownTopBtn title={props.title}/>
            </div>

            {
                isOpen &&
                <div onMouseEnter={() => { setIsOverList(true); }} onMouseLeave={() => { setIsOverList(false); } }>
                    <DropdownMenu animIdx={animation}>
                        {props.children}
                    </DropdownMenu>
                </div>
            }
        </div>
    );
}


//#endregion


//#region Dropdown-Utility  

//The Button of the Navbar always visible (either text-button or the 3-line-button for thin screens)
function DropdownTopBtn(props){
    let isNarrowScreen = useIsNarrowScreen();

    if(isNarrowScreen) return (
        <button className="icon-d">
            <img className="img" src={process.env.PUBLIC_URL + "/Icons/DropdownIcon.png"} alt="Dropdown Icon"/>
        </button>
    );

    return (
        <>
            <button className="text-d nav-ctr-clr">{props.title}</button>
            <img className="dropdown-down-arrow" src={process.env.PUBLIC_URL + "/Icons/ArrowDownIcon.png"} alt="Arrow down Icon"/>
        </>
    );
}


function DropdownMenu(props){
    return(
        <div className="menu-d" animation={props.animIdx}>
            {props.children}
        </div>
    );
}



function NestedDropdown(props){
    const [isOpen, setIsOpen] = useState();

    return (
        <>
            <div className="dropdown-nested" onClick={() => { setIsOpen(!isOpen); }}>
                <button className="dropdown-item">{props.title}</button>
                <img className="dropdown-down-arrow" src={process.env.PUBLIC_URL + "/Icons/ArrowDownIcon.png"} alt="Arrow down Icon"/>
            </div>

            {
                isOpen && props.children
            }
        </>
    );
}

function DropdownItem(props){
    const location = useLocation().pathname;
    return(
        <Link to={props.link} className="item-dm">
            <button className={`btn-dmi btn-clickable ${location === props.link ? "page-loaded" : ""}`} onClick={() => { if(closeDropdown != null) {closeDropdown();} }}>{props.title}</button>
        </Link>
    );
}


function indentNavItemChildren(children){
    if(!Array.isArray(children)) return children;

    return children.map((child) => {
        return <NavItem type={child.props.type} title={"   " + child.props.title} link={child.props.link} key={child.props.title}>
            {child.props.children !== undefined ? indentNavItemChildren(child.props.children) : child.props.children}
        </NavItem>;
    });
}


//#endregion


function NavItem(props){
}

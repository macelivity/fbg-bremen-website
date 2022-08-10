import React, { useState, useLayoutEffect } from 'react';
import { Link } from "react-router-dom";

import './CSS/Navbar.css';



export default function Navbar(){
    return(
        <nav className="navbar">
            <HomeBtn/>

            <NavContainer>
                <NavItem type="Button" title="Startseite" link="/"/>

                <NavItem type="Dropdown" title="Über uns">
                    <NavItem type="Child" title="Gottesdienste" link="/gottesdienste"/>
                    <NavItem type="Child" title="Glaubensbekenntnis" link="/glaubensbekenntnis"/>
                </NavItem>

                <NavItem type="Button" title="Neuigkeiten" link="/neuigkeiten"/>


                <NavItem type="Dropdown" title="Predigten">
                    <NavItem type="Child" title="Aktuelle" link="/aktuelle-predigten"/>
                    <NavItem type="Child" title="Predigtreihen" link="/predigtreihen"/>
                </NavItem>

                <NavItem type="Button" title="Kontakt" link="/kontakt"/>

                <NavItem type="Button" title="Русский" link="/russian"/>
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


function NavContainer(params){
    //currently any other objects than those declared in MapToObj (Nav_"name") will be ignored
    let isNarrowScreen = useIsNarrowScreen();

    let content = <NavContent> {React.Children.map(params.children, (child) => { return child; })} </NavContent>;

    if(isNarrowScreen) return <Dropdown>{ content }</Dropdown>
    else return <div className="lineNav-btn-collection">{ content }</div>
}

function NavContent(params){
    const content = React.Children.toArray(params.children);
    return MapToObj(content);
}

function MapToObj(objs){
    let isNarrowScreen = useIsNarrowScreen();

    return objs.map((obj) => {
        if(obj === undefined || obj.props === undefined) return null;
        
        switch(obj.props.type){
            case "Button":
                if(isNarrowScreen) return <DropdownItem title={obj.props.title} link={obj.props.link}  key={obj.props.title}/>;
                else return <NavbarBtn title={obj.props.title} link={obj.props.link}  key={obj.props.title}/>;
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


function NavbarBtn(props){
    return(
        <Link to={props.link} className="navbar-btn-shell">
            <button className="navbar-btn btn-clickable">{props.title}</button>
        </Link>
    );
}

function HomeBtn(){
    return(
        <Link to="/" className="home-btn-shell">
            <button className="home-btn" ><img className="home-btn-image" src={process.env.PUBLIC_URL + "/Icons/fbg-bremen_icon-white-fg.png"} alt="FBG-Bremen Icon"/></button>
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
        <div className="dropdown-btn-shell">
            <div className="dropdown-btn" onMouseEnter={() => { setIsOverButton(true); }} onMouseLeave={() => { setIsOverButton(false); } } onClick={() => { setIsOpen(!isOpen); setIsOverButton(!isOpen); setIsOverList(false); }}>
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

//The Button of the Navbar always visible (either text-button or te 3-line-button for thin screens)
function DropdownTopBtn(props){
    let isNarrowScreen = useIsNarrowScreen();

    if(isNarrowScreen) return (
        <button className="dropdown-btn-icon-shell">
            <img className="dropdown-btn-icon" src={process.env.PUBLIC_URL + "/Icons/DropdownIcon.png"} alt="Dropdown Icon"/>
        </button>
    );

    return (
        <>
            <button className="dropdown-btn-text">{props.title}</button>
            <img className="dropdown-btn-extraIcon" src={process.env.PUBLIC_URL + "/Icons/ArrowDownIcon.png"} alt="Arrow down Icon"/>
        </>
    );
}

function NestedDropdown(props){
    const [isOpen, setIsOpen] = useState();

    return (
        <>
            <div className="nestedDropdown-btn" onClick={() => { setIsOpen(!isOpen); }}>
                <button className="dropdown-item">{props.title}</button>
                <img className="dropdown-btn-extraIcon" src={process.env.PUBLIC_URL + "/Icons/ArrowDownIcon.png"} alt="Arrow down Icon"/>
            </div>

            {
                isOpen && props.children
            }
        </>
    );
}

function DropdownMenu(props){
    return(
        <div className="dropdown-menu" animation={props.animIdx}>
            {props.children}
        </div>
    );
}
function DropdownItem(props){
    return(
        <Link to={props.link} className="dropdown-item-shell">
            <button className="dropdown-item btn-clickable" onClick={() => { if(closeDropdown != null) {closeDropdown();} }}>{props.title}</button>
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


function NavItem(props){
}

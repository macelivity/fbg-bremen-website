

export function Rect(props){
    return(
        <svg className={"bg-rect " + (props.className !== undefined ? props.className : "")} viewBox="0 0 12 1" preserveAspectRatio="none">
            <rect width="12" height="1"/>
            Sorry, your browser does not support inline SVG.
        </svg>
    );
}

export function TriangleDown(props){
    return(
        <svg className={"bg-triangle-down" + (props.className !== undefined ? props.className : "")} viewBox="0 0 12 1" preserveAspectRatio="none">
            <polyline points="0 0, 6 1, 12 0, 12 1, 0 1, 0 0"/>
            Sorry, your browser does not support inline SVG.
        </svg>
    );
}


export function SlopeUp(props){
    return(
        <svg className={"bg-slope-up" + (props.className !== undefined ? props.className : "")} viewBox="0 0 120 10" preserveAspectRatio="none">
            <path d="M 0 0 L 0 10 C 0 -3 120 -3 120 10 L 120 0 Z"/>
            Sorry, your browser does not support inline SVG.
        </svg>
    );
}
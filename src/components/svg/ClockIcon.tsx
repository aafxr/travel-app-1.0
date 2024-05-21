import React from "react";

export function ClockIcon(props: React.SVGProps<SVGSVGElement>){
    return (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12ZM11 13L16.2 16.2L17 14.9L12.5 12.2V7H11V13Z"
                  fill="currentColor" />
        </svg>

    )
}
/**
 * @param {boolean} badge
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React from "react";

interface BellIconProps extends React.SVGProps<SVGSVGElement> {
    badge?: boolean
}

export function BellIcon({badge = false, ...props}: BellIconProps) {
    return (
        <svg {...props} viewBox="8 8 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 27H19V28C19 29.6569 20.3431 31 22 31C23.6569 31 25 29.6569 25 28V27Z" stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M15 27H29C29.5523 27 30 26.5523 30 26V25.4142C30 25.149 29.8946 24.8947 29.7071 24.7071L29.1963 24.1963C29.0706 24.0706 29 23.9001 29 23.7224V20C29 16.134 25.866 13 22 13C18.134 13 15 16.134 15 20V23.7224C15 23.9002 14.9294 24.0706 14.8037 24.1963L14.2929 24.7071C14.1054 24.8947 14 25.149 14 25.4142V26C14 26.5523 14.4477 27 15 27Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {badge && <circle cx="18" cy="14" r="4" fill="#FF0909" stroke='none'/>}
        </svg>
    )
}
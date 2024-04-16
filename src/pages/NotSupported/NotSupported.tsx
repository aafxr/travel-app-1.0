import React, {PropsWithChildren} from 'react';

export function NotSupported({children}: PropsWithChildren) {
    return (
        <div className='wrapper'>
            {children}
        </div>
    );
}

export default NotSupported;
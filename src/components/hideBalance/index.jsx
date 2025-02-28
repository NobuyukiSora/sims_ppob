import React, { useState } from 'react';

export const HideBalance = ({ balance }) => {
    const [isHidden, setIsHidden] = useState(true);

    const toggleVisibility = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div>
            <h3 className='text-white'>
                {'Rp'} {isHidden ? (
                    Array.from(String(balance)).map((_, index) => (
                        <span key={index} className="inline-block w-2 h-2 bg-white rounded-xl mx-0.5"></span>
                    ))
                ) : (
                    `${balance}`
                )}
            </h3>
            <button onClick={toggleVisibility} className='text-white'>
                {'Lihat saldo'}
                {/* {isHidden ? 'Show' : 'Hide'} */}
            </button>
        </div>
    );
}


import React, { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const ScrollBar = forwardRef((props, ref) => {
    const { direction = 'ltr', ...rest } = props;

    return (
        <SimpleBar
            ref={ref}
            style={{
                direction: direction === 'rtl' ? 'rtl' : 'ltr',
                ...rest.style,
            }}
            {...rest}
        />
    );
});

export default ScrollBar;

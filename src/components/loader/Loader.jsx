import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            {/* Title with different colors for "Sabrina" and "Bio" */}
            <h1 className="loading-title">
                <span className="sabrina">Sabrina</span>
                <span className="bio">Bio</span>
            </h1>
            <div className="loader"></div> {/* The loader itself */}
        </div>
    );
}

export default Loader;

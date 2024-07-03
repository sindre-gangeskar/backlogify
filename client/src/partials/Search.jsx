import React from 'react';
import { useState, useRef, useEffect } from 'react';
import '../css/Search.css';
import { debounce, drop } from 'lodash';
import { RxMagnifyingGlass, RxReset } from "react-icons/rx";
import { HiOutlineCog8Tooth, HiCog8Tooth } from "react-icons/hi2";
import { RxZoomIn, RxZoomOut } from 'react-icons/rx';

function Search({ onSubmit, setAppIDVisibility, setGameTitleVisibility, increaseScale, decreaseScale, scaleValue }) {
    const [ settingsShown, setSettingsShown ] = useState(false);
    const textSizesArr = [ 'sm', 'md', 'lg', 'xl' ];

    const toggleSettings = () => {
        setSettingsShown(!settingsShown);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const name = data.get('name');
        onSubmit(name);
    };

    const handleReset = (e) => {
        e.preventDefault();
        onSubmit('');
    };

    const debouncedToggleAppIdVisibility = debounce(e => {
        setAppIDVisibility(e.target.checked);
    }, 200);

    const debouncedToggleGameTitleVisibility = debounce(e => {
        setGameTitleVisibility(e.target.checked);
    }, 200);

    return (
        <>
            <div className="search-wrapper">
                <form className='search-form' onSubmit={handleFormSubmit}>
                    <input className='search' placeholder='Search for title...' name="name" autoComplete='name' required />
                    <span className="buttons-wrapper">
                        <button type="submit" className='search-btn'><RxMagnifyingGlass /></button>
                        <button onClick={handleReset} className='reset-btn'><RxReset /></button>
                        <button type='button' className={`settings-btn ${settingsShown ? 'active' : ''}`} onClick={toggleSettings}>{settingsShown ? <HiCog8Tooth /> : <HiOutlineCog8Tooth />}</button>
                    </span>
                </form>

                <div className="settings-wrapper">
                    <ul className={`settings-menu ${settingsShown ? 'shown' : ''}`}>Options
                        <hr />
                        <li className='list-item'>
                            <p>Show Game Titles</p>
                            <input type="checkbox" name='toggle-game-titles' className='toggle-game-titles-btn custom-checkbox' onChange={debouncedToggleGameTitleVisibility} />
                        </li>
                        <li className='list-item'>
                            <p>Show AppIDs</p>
                            <input type="checkbox" name='toggle-appids' className='toggle-appids-btn custom-checkbox' onChange={debouncedToggleAppIdVisibility} />
                        </li>
                        <hr />

                        <li className='list-item zoom-btn-group'>
                            <button className='zoom-in' onClick={increaseScale}><RxZoomIn></RxZoomIn></button>
                            <button className='zoom-out' onClick={decreaseScale}><RxZoomOut></RxZoomOut></button>
                        </li>
                        <li className='list-item zoom-btn-group'>
                            <pre>{textSizesArr[ scaleValue ]}</pre>
                        </li>
                    </ul>
                </div>
            </div >
        </>
    );
}

export default Search;

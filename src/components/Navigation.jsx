import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    const tabs = [
        { name: 'About', path: '/' },
        { name: 'Research', path: '/research/' },
        { name: 'CV', path: '/cv/' }
    ];

    return (
        <nav className="nav-sidebar">
            <ul className="nav-list">
                {tabs.map((tab) => (
                    <li key={tab.name} className="nav-item">
                        <NavLink
                            to={tab.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            {tab.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;

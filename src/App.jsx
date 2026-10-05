import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import About from './components/About';
import Research from './components/Research';
import usePageTracking from './usePageTracking';
import usePageTitle from './usePageTitle';

// PDF.js is large, so only load the CV page when it's visited
const CV = lazy(() => import('./components/CV'));
import './App.css';

function AppContent() {
    // Track page views with Google Analytics
    usePageTracking();
    usePageTitle();

    return (
        <div className="app-container">
            <Navigation />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/research" element={<Research />} />
                    <Route path="/cv" element={<Suspense fallback={null}><CV /></Suspense>} />
                </Routes>
            </main>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import Header from './Header';
import CollapsibleSection from './CollapsibleSection';

const About = () => {
    return (
        <>
            <Header />

            <section className="about-static">
                <p className="about-bio">I am a PhD candidate in Astronomy and Astrophysics at Harvard University. My research focuses on <a href="https://astrobites.org/2022/10/30/guide-to-transient-astronomy/" target="_blank" rel="noopener noreferrer">transients</a>, with a particular emphasis on long-duration events, wide-field surveys, and compact object mergers. I am also interested in developing tools and methods for detecting and characterizing these phenomena.</p>
                <p className="about-bio">Other things that I spend time on are running, reading, skiing, weightlifting, and following news in aerospace engineering.</p>
            </section>

            <CollapsibleSection title="Previously">
                <div className="item">
                    <div className="item-header">
                        <span className="title">ProDex Labs, Founding Engineer</span>
                    </div>
                    <p>Developed software to help manufacturers optimize their operations with a native AI agent.</p>
                </div>

                <div className="item">
                    <div className="item-header">
                        <span className="title">SpaceX, Falcon GNC</span>
                    </div>
                    <p>Developed high-fidelity Monte Carlo simulations for the Falcon rocket. Drove operational changes to promote launch reliability and accelerate launch cadence.</p>
                </div>

                <div className="item">
                    <div className="item-header">
                        <span className="title">Harvard University, BA in Astrophysics & Mathematics</span>
                    </div>
                    <p>Cum Laude, 2025</p>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Open-source software">
                <div className="item">
                    <a href="https://github.com/Adam-Boesky/astro_SPLASH" className="project-link">SPLASH</a>
                    <span className="sep">—</span>
                    <span>Supernova classification pipeline leveraging host galaxy properties</span>
                </div>
                <div className="item">
                    <a href="https://github.com/Adam-Boesky/ztforce" className="project-link">ztforce</a>
                    <span className="sep">—</span>
                    <span>Forced PSF photometry on ZTF science images (<a href="https://ztforce.readthedocs.io" target="_blank" rel="noopener noreferrer">docs</a>)</span>
                </div>
                <div className="item">
                    <a href="https://github.com/TeamCOMPAS/COMPAS" className="project-link">COMPAS</a>
                    <span className="sep">—</span>
                    <span>Rapid binary population synthesis code</span>
                </div>
                <div className="item">
                    <a href="https://github.com/jdinovi/HOOTSim" className="project-link">HOOTSim</a>
                    <span className="sep">—</span>
                    <span>N-Body simulator</span>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Recent good reads">
                <div className="reads-list">
                <div className="item">
                    <a href="https://www.wayfaremagazine.org/p/tohu-and-tikkun" className="project-link" target="_blank" rel="noopener noreferrer">Tohu and Tikkun</a>
                    <span className="sep">—</span>
                    <span>Berel Feldman, <em>Wayfarer</em></span>
                </div>
                <div className="item">
                    <span className="project-link" style={{ color: '#888' }}>A Gentleman in Moscow</span>
                    <span className="sep">—</span>
                    <span>Amor Towles</span>
                </div>
                <div className="item">
                    <a href="https://podcasts.apple.com/us/podcast/invest-like-the-best-with-patrick-oshaughnessy/id1154105909?i=1000663067868" className="project-link" target="_blank" rel="noopener noreferrer">Jeremy Giffon — Special Situations in Private Markets</a>
                    <span className="sep">—</span>
                    <span><em>Invest Like the Best</em></span>
                </div>
                </div>
            </CollapsibleSection>

        </>
    );
};

export default About;

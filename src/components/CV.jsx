import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const CV_URL = 'https://raw.githubusercontent.com/Adam-Boesky/apb_cv/main-pdf/tex/cv_pubs.pdf';
const CV_SOURCE_URL = 'https://github.com/Adam-Boesky/apb_cv/tree/main';

// Render pages at a fixed high resolution and let CSS scale them to the
// container width, so they stay sharp without re-rendering on resize.
const RENDER_SCALE = 2 * Math.min(window.devicePixelRatio || 1, 2);

const CV = () => {
    const pagesRef = useRef(null);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        let cancelled = false;
        const loadingTask = pdfjsLib.getDocument({ url: CV_URL });

        const renderPdf = async () => {
            const pdf = await loadingTask.promise;
            const container = pagesRef.current;

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                if (cancelled) return;

                const viewport = page.getViewport({ scale: RENDER_SCALE });
                const pageEl = document.createElement('div');
                pageEl.className = 'cv-page';
                pageEl.style.aspectRatio = `${viewport.width} / ${viewport.height}`;

                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                pageEl.appendChild(canvas);
                container.appendChild(pageEl);

                await page.render({ canvas, viewport }).promise;
                if (!cancelled) setStatus('loaded');

                // Canvases aren't clickable, so overlay the PDF's hyperlinks
                const annotations = await page.getAnnotations();
                for (const annotation of annotations) {
                    if (annotation.subtype !== 'Link' || !annotation.url) continue;
                    const [x1, y1] = viewport.convertToViewportPoint(annotation.rect[0], annotation.rect[1]);
                    const [x2, y2] = viewport.convertToViewportPoint(annotation.rect[2], annotation.rect[3]);
                    const link = document.createElement('a');
                    link.href = annotation.url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.className = 'cv-page-link';
                    link.style.left = `${(Math.min(x1, x2) / viewport.width) * 100}%`;
                    link.style.top = `${(Math.min(y1, y2) / viewport.height) * 100}%`;
                    link.style.width = `${(Math.abs(x2 - x1) / viewport.width) * 100}%`;
                    link.style.height = `${(Math.abs(y2 - y1) / viewport.height) * 100}%`;
                    pageEl.appendChild(link);
                }
            }
        };

        renderPdf().catch((err) => {
            if (!cancelled) {
                console.error('Failed to render CV', err);
                setStatus('error');
            }
        });

        return () => {
            cancelled = true;
            loadingTask.destroy();
            if (pagesRef.current) pagesRef.current.replaceChildren();
        };
    }, []);

    return (
        <div className="cv">
            <div className="cv-actions">
                <a href={CV_URL} target="_blank" rel="noopener noreferrer">Download PDF</a>
                <span className="sep">·</span>
                <a href={CV_SOURCE_URL} target="_blank" rel="noopener noreferrer">View source on GitHub</a>
            </div>
            {status === 'loading' && <p className="cv-status">Loading CV…</p>}
            {status === 'error' && (
                <p className="cv-status">
                    Couldn't load the CV here. <a href={CV_URL} target="_blank" rel="noopener noreferrer">Open the PDF directly</a>.
                </p>
            )}
            <div className="cv-pages" ref={pagesRef} />
        </div>
    );
};

export default CV;

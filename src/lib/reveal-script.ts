/**
 * The one-shot half of the scroll reveal.
 *
 * The reveal utilities in `globals.css` have two modes. Left alone they run on
 * `animation-timeline: view()`, which costs no JavaScript but is *scroll-linked*:
 * progress tracks the scroll position, so scrolling back up plays the reveal in
 * reverse and the content fades out again. This script switches the whole site
 * to the other mode — a timed run that fires once, when the element first
 * arrives, and then stays settled no matter how the visitor scrolls.
 *
 * It is written as a blocking inline script in `<head>` rather than as a client
 * component, and that is the whole design:
 *
 *  1. **No flash.** `[data-reveal="on"]` is what hides an unseen element. Set
 *     before first paint, nothing is ever painted visible and then snatched
 *     back. A `useEffect` on a client component runs after paint, which is one
 *     frame of the finished page followed by it disappearing.
 *  2. **No half-failed state.** The same script both hides elements and reveals
 *     them. If it does not run — JavaScript off, a parse error, a blocked
 *     bundle — the attribute is never set, the CSS below `[data-reveal="on"]`
 *     never matches, and the page renders in place. There is no arrangement in
 *     which content is left at `opacity: 0` with nothing coming to reveal it.
 *  3. **No dependency and no hydration cost.** It is a few hundred bytes that
 *     run once, and every page on the site stays a Server Component.
 *
 * The observer itself is deliberately one observer for the whole document, not
 * one per element: elements are handed to it as they appear, and each is
 * dropped from it the moment it is stamped. `data-seen` is a plain attribute
 * rather than a class so it survives React re-rendering `className`.
 *
 * Continuous scroll effects — `rail-draw`, `plate-settle`, `parallax-plate`,
 * `header-cast` — are *not* touched by any of this. They are about progress
 * rather than arrival, and tracking the scroll is the point of them.
 */

/** Every utility that is an *arrival*. Progress effects are absent on purpose. */
const REVEAL_SELECTOR = [
  ".reveal",
  ".reveal-soft",
  ".reveal-fade",
  ".reveal-plate",
  ".reveal-left",
  ".reveal-right",
  ".reveal-marker",
  ".reveal-lift",
  ".reveal-group",
  ".reveal-rows",
  ".reveal-words",
].join(",");

/**
 * Minified by hand rather than by a build step, because it ships as a string
 * inside the document and never passes through the bundler. Kept in ES5 shape
 * for the same reason: it runs before anything else on the page, so it cannot
 * assume a transpile.
 */
export const revealScript = `(function(){try{
var r=document.documentElement;
if(!('IntersectionObserver' in window))return;
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var S=${JSON.stringify(REVEAL_SELECTOR)};
r.setAttribute('data-reveal','on');
var live=0;
var io=new IntersectionObserver(function(es){live=1;for(var i=0;i<es.length;i++){var e=es[i];if(!e.isIntersecting)continue;e.target.setAttribute('data-seen','');io.unobserve(e.target)}},{rootMargin:'0px 0px -8% 0px'});
var q=0;
function scan(){q=0;var n=document.querySelectorAll(S);for(var i=0;i<n.length;i++){if(!n[i].hasAttribute('data-seen'))io.observe(n[i])}}
function queue(){if(!q)q=requestAnimationFrame(scan)}
function start(){scan();new MutationObserver(queue).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
setTimeout(function(){if(!live)r.removeAttribute('data-reveal')},3000);
}catch(e){document.documentElement.removeAttribute('data-reveal')}})();`;

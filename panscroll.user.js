// ==UserScript==
// @name PanScroll
// @description User script to pan webpages using the middle mouse button.
// @licence GPLv3; http://www.gnu.org/copyleft/gpl.html
// @match http://*/*
// @match https://*/*
// ==/UserScript==

/* Pan webpages using the middle mouse button.
 * Copyright (C) 2011 Daniel Gröber <me ät dxld dot at>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function(){
    var mouseButton = 1; // middle mouse button (tested in chromium)
    var paralyzeHoldoff = 80; // ms mouseclick window

    var lastEv = null;

    document.addEventListener('mousemove', function(ev){
        var btn = ev.button;
        if (btn == mouseButton) { // middle mouse button
            window.scrollBy(lastEv.screenX - ev.screenX
                            , lastEv.screenY - ev.screenY);
        }

        lastEv = ev;
    });

    var downEvent = null;
    var downTime = 0;
    var downTimeout = null;

    document.addEventListener('mousedown', function(ev){
        if(ev.button != mouseButton) return;

        if(!ev._panscroll_handled) {
            downEvent = ev;
            downTime = new Date().getTime();

            downTimeout = setTimeout(function(){
                ev._panscroll_handled = true;
                downEvent.srcElement.dispatchEvent(ev);
            }, paralyzeHoldoff);
        }
    });

    document.addEventListener('mouseup', function(ev){
        clearTimeout(downTimeout);
    });

    document.addEventListener('click', function(ev){
        if(ev.button != mouseButton) return;

        if(new Date().getTime() - downTime > paralyzeHoldoff) {
            ev.preventDefault();
            ev.stopPropagation();
            return false;
        }
    });
})(undefined);


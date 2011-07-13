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
    var mouseButton = 1 // middle mouse button (tested in chromium)
    var lastEv = null;

    document.addEventListener('mousemove', function(ev){
        if(!lastEv) {
            lastEv = ev;
            return;
        }

        var btn = ev.button;
        if (btn == mouseButton) { // middle mouse button
            window.scrollBy(lastEv.screenX - ev.screenX
                            , lastEv.screenY - ev.screenY);
        } else {
            lastEv = 0
        }

        lastEv = ev;
    });

    var preventClickEvents = function(ev){
        if(ev.button == 1) {
            var el = null;
            if(el = ev.toElement) {
                el.onclick = null;
                el.onmousedown = null;
                el.onmouseup = null;
            }
        }
    }

    document.addEventListener('mousedown', preventClickEvents);
    document.addEventListener('mouseup', preventClickEvents);
    document.addEventListener('click', preventClickEvents);
})(undefined);


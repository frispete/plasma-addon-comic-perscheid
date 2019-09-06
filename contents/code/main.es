/*
 *   Copyright (C) 2007 Tobias Koenig <tokoe@kde.org>
 *   Copyright (C) 2009 - 2017 Matthias Fuchs <mat69@gmx.net>
 *   Copyright (C) 2019 Hans-Peter Jansen <hpj@urpla.net>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU Library General Public License version 2 as
 *   published by the Free Software Foundation
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details
 *
 *   You should have received a copy of the GNU Library General Public
 *   License along with this program; if not, write to the
 *   Free Software Foundation, Inc.,
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

function init()
{
    comic.comicAuthor = "Martin Perscheid";
    comic.websiteUrl = "http://www.martin-perscheid.de/";
    comic.shopUrl = "http://www.martin-perscheid.de/shop.html";
    // trigger front page load
    comic.requestPage(comic.websiteUrl, comic.User);
}

function pageRetrieved(id, data)
{
    var url = comic.websiteUrl;

    // find the most recent strip on front page
    if (id == comic.User) {
        var re = new RegExp('<img src="image/cartoon/(\\d+)\.gif"');
        var match = re.exec(data);
        if ( match != null ) {
	    // load page with recent strip
            comic.lastIdentifier = match[1];
	    comic.firstIdentifier = comic.lastIdentifier - 24;
            url += comic.identifier + ".html";
	    print("Fetch page " + url);
            comic.requestPage(url, comic.Page);
        } else {
            print("Failed to fetch the most recent strip from " + comic.websiteUrl);
            comic.error();
        }
    }

    // handle web page
    else if (id == comic.Page) {
        // get previous id
        var re = new RegExp('href="(\\d+)\.html" title="Cartoon davor"');
        var match = re.exec(data);
        if (match != null) {
            comic.previousIdentifier = match[1];
        } else {
            print("No previous strip.");
        }

        // get next id
        var re = new RegExp('href="(\\d+)\.html" title="Cartoon danach"');
        var match = re.exec(data);
        if (match != null) {
            comic.nextIdentifier = match[1];
        } else {
            print("No next strip.");
        }

        // no comic.title
        comic.additionalText = comic.identifier;

	// fetch strip
	url += "/image/cartoon/" + comic.identifier + ".gif";
	print("Fetch image " + url);
        comic.requestPage(url, comic.Image);
    }
}

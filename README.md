# dob-filings
Sample application for surfacing NYC DOB job filings.

## Design Choices

I haven't had to develop an app with just jQuery in years, but I decided to use as many modern tools as I could apply to this situation, with a bias toward tools that would let me get the app up and running quickly. 

I used gulp and npm tasks to automate processes, and Handlebars to handle templates. Without a proper AMD library (I didn't get require.js running in this project), the way I'm storing the templates is difficult to read and not optimal. I wrote a Node script to download the sample data set and insert into a local Mongo instance, which must be configured beforehand. 

My Node app is very similar to the Node app I'm responsible for in my current job. It serves a single-page app and serves up data to the frontend via APIs. I went with MongoDB because it goes well with Node and it was easy to insert and manipulate the test data set. 

I based my styles on Foundation because I'm familiar with its conventions and I knew it would get me going quickly. I'm building my sass with node-sass, which is  straightforward and doesn't require babysitting or detailed configuration. 

I went with a procedural Javascript client because there was no need to use classes with so much jQuery and such a simple application, with only a single screen. The way I bound my events and structured my views (via templates) resembles my current React practices, though. 

I decided to display a single page with a single view of fields that can be manipulated by the user. That way, the user can always see the steps they took to get to the currently viewable dataset, and they can step out of where they are to get back to the largest possible result. 

There's a lot about this app that's not the best from a UX perspective, and a lot that wouldn't scale well in any way. The huge number of columns in the dataset doesn't make for a good user experience - there's just too much data and not much of it is immediately relevant. So I chose to show a given subset of interesting fields, and make the rest of the fields visible in a modal when the user clicks a row. But when all of the fields need to be sortable, it's awkward to see the visible rows sorted by a field that's not visible.

MongoDB isn't very good at making all of a document's fields searchable all at once, so I saved some time on solving this problem by making the user specify the field to search by. This isn't the best user experience, and I'd prefer a fulltext search, but this is the best solution given the time I allocated to the problem. It's also awkward to see search results that don't display the field matching the search term you entered. But I'm happy with the overall experience of filtering, searching, and paging data - the UI is clean and responsive. 

I could have converted the DB field names into nice names for the frontend across the entire column set, but I chose not to take the time to do this.

I didn't implement any URL hash changes or front-end routing, so it would be bad UX to not be able to copy the URL you're at and paste it or bookmark it. 

## Choice of Framework

This is easy - I've been working on a very similar app to this on a Node/Gulp/Webpack/React/Alt.js stack, and so I'd happily use that for this application. Some of those pieces would take more setup time than the tools I used on this app, but the scalability and code-readability of an app like that would make the time spent more than worthwhile in the long run. 
## Room Manager

This is a solution we've been working on, to be able to use our meeting rooms more efficiently and without having to check on the calendar first. It allows booking a room on the spot, as well as providing a quick glance into the room's daily timeline.

![](https://s15.postimg.cc/yrktdnh2z/room-manager.png)


## UI

We've opt'ed for a simple look in order to blend in, light mode (white background) denotes the room is available, displaying the room's title in the middle and how long till the next meeting. Dark mode signifies the room is currently occupied.

## On your locale

We're using [Parcel](https://parceljs.org/) to bundle the project, in order to run it with the built-in mockup data, use the command `npm run dev` -- if you'd rather test it through the API,  use `npm run stage`.

You may find room details within `src/index.js` where `id` is the calendar ID of the room and `title` is the display name. We've kept these hardcoded rather than set as environment variables since we're planning to wrap this up as an Android app.

It's possible to change the API address through `src/services/schedule.js` or play around with mockup data in `src/services/mockup/schedule.js`.
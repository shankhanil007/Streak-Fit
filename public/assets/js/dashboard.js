// Add squares

const day = [
  "Jan 1",
  "Jan 2",
  "Jan 3",
  "Jan 4",
  "Jan 5",
  "Jan 6",
  "Jan 7",
  "Jan 8",
  "Jan 9",
  "Jan 10",
  "Jan 11",
  "Jan 12",
  "Jan 13",
  "Jan 14",
  "Jan 15",
  "Jan 16",
  "Jan 17",
  "Jan 18",
  "Jan 19",
  "Jan 20",
  "Jan 21",
  "Jan 22",
  "Jan 23",
  "Jan 24",
  "Jan 25",
  "Jan 26",
  "Jan 27",
  "Jan 28",
  "Jan 29",
  "Jan 30",
  "Jan 31",
  "Feb 1",
  "Feb 2",
  "Feb 3",
  "Feb 4",
  "Feb 5",
  "Feb 6",
  "Feb 7",
  "Feb 8",
  "Feb 9",
  "Feb 10",
  "Feb 11",
  "Feb 12",
  "Feb 13",
  "Feb 14",
  "Feb 15",
  "Feb 16",
  "Feb 17",
  "Feb 18",
  "Feb 19",
  "Feb 20",
  "Feb 21",
  "Feb 22",
  "Feb 23",
  "Feb 24",
  "Feb 25",
  "Feb 26",
  "Feb 27",
  "Feb 28",
  "March 1",
  "March 2",
  "March 3",
  "March 4",
  "March 5",
  "March 6",
  "March 7",
  "March 8",
  "March 9",
  "March 10",
  "March 11",
  "March 12",
  "March 13",
  "March 14",
  "March 15",
  "March 16",
  "March 17",
  "March 18",
  "March 19",
  "March 20",
  "March 21",
  "March 22",
  "March 23",
  "March 24",
  "March 25",
  "March 26",
  "March 27",
  "March 28",
  "March 29",
  "March 30",
  "March 31",
  "April 1",
  "April 2",
  "April 3",
  "April 4",
  "April 5",
  "April 6",
  "April 7",
  "April 8",
  "April 9",
  "April 10",
  "April 11",
  "April 12",
  "April 13",
  "April 14",
  "April 15",
  "April 16",
  "April 17",
  "April 18",
  "April 19",
  "April 20",
  "April 21",
  "April 22",
  "April 23",
  "April 24",
  "April 25",
  "April 26",
  "April 27",
  "April 28",
  "April 29",
  "April 30",
  "May 1",
  "May 2",
  "May 3",
  "May 4",
  "May 5",
  "May 6",
  "May 7",
  "May 8",
  "May 9",
  "May 10",
  "May 11",
  "May 12",
  "May 13",
  "May 14",
  "May 15",
  "May 16",
  "May 17",
  "May 18",
  "May 19",
  "May 20",
  "May 21",
  "May 22",
  "May 23",
  "May 24",
  "May 25",
  "May 26",
  "May 27",
  "May 28",
  "May 29",
  "May 30",
  "May 31",
  "June 1",
  "June 2",
  "June 3",
  "June 4",
  "June 5",
  "June 6",
  "June 7",
  "June 8",
  "June 9",
  "June 10",
  "June 11",
  "June 12",
  "June 13",
  "June 14",
  "June 15",
  "June 16",
  "June 17",
  "June 18",
  "June 19",
  "June 20",
  "June 21",
  "June 22",
  "June 23",
  "June 24",
  "June 25",
  "June 26",
  "June 27",
  "June 28",
  "June 29",
  "June 30",
  "July 1",
  "July 2",
  "July 3",
  "July 4",
  "July 5",
  "July 6",
  "July 7",
  "July 8",
  "July 9",
  "July 10",
  "July 11",
  "July 12",
  "July 13",
  "July 14",
  "July 15",
  "July 16",
  "July 17",
  "July 18",
  "July 19",
  "July 20",
  "July 21",
  "July 22",
  "July 23",
  "July 24",
  "July 25",
  "July 26",
  "July 27",
  "July 28",
  "July 29",
  "July 30",
  "July 31",
  "Aug 1",
  "Aug 2",
  "Aug 3",
  "Aug 4",
  "Aug 5",
  "Aug 6",
  "Aug 7",
  "Aug 8",
  "Aug 9",
  "Aug 10",
  "Aug 11",
  "Aug 12",
  "Aug 13",
  "Aug 14",
  "Aug 15",
  "Aug 16",
  "Aug 17",
  "Aug 18",
  "Aug 19",
  "Aug 20",
  "Aug 21",
  "Aug 22",
  "Aug 23",
  "Aug 24",
  "Aug 25",
  "Aug 26",
  "Aug 27",
  "Aug 28",
  "Aug 29",
  "Aug 30",
  "Aug 31",
  "Sept 1",
  "Sept 2",
  "Sept 3",
  "Sept 4",
  "Sept 5",
  "Sept 6",
  "Sept 7",
  "Sept 8",
  "Sept 9",
  "Sept 10",
  "Sept 11",
  "Sept 12",
  "Sept 13",
  "Sept 14",
  "Sept 15",
  "Sept 16",
  "Sept 17",
  "Sept 18",
  "Sept 19",
  "Sept 20",
  "Sept 21",
  "Sept 22",
  "Sept 23",
  "Sept 24",
  "Sept 25",
  "Sept 26",
  "Sept 27",
  "Sept 28",
  "Sept 29",
  "Sept 30",
  "Oct 1",
  "Oct 2",
  "Oct 3",
  "Oct 4",
  "Oct 5",
  "Oct 6",
  "Oct 7",
  "Oct 8",
  "Oct 9",
  "Oct 10",
  "Oct 11",
  "Oct 12",
  "Oct 13",
  "Oct 14",
  "Oct 15",
  "Oct 16",
  "Oct 17",
  "Oct 18",
  "Oct 19",
  "Oct 20",
  "Oct 21",
  "Oct 22",
  "Oct 23",
  "Oct 24",
  "Oct 25",
  "Oct 26",
  "Oct 27",
  "Oct 28",
  "Oct 29",
  "Oct 30",
  "Oct 31",
  "Nov 1",
  "Nov 2",
  "Nov 3",
  "Nov 4",
  "Nov 5",
  "Nov 6",
  "Nov 7",
  "Nov 8",
  "Nov 9",
  "Nov 10",
  "Nov 11",
  "Nov 12",
  "Nov 13",
  "Nov 14",
  "Nov 15",
  "Nov 16",
  "Nov 17",
  "Nov 18",
  "Nov 19",
  "Nov 20",
  "Nov 21",
  "Nov 22",
  "Nov 23",
  "Nov 24",
  "Nov 25",
  "Nov 26",
  "Nov 27",
  "Nov 28",
  "Nov 29",
  "Nov 30",
  "Dec 1",
  "Dec 2",
  "Dec 3",
  "Dec 4",
  "Dec 5",
  "Dec 6",
  "Dec 7",
  "Dec 8",
  "Dec 9",
  "Dec 10",
  "Dec 11",
  "Dec 12",
  "Dec 13",
  "Dec 14",
  "Dec 15",
  "Dec 16",
  "Dec 17",
  "Dec 18",
  "Dec 19",
  "Dec 20",
  "Dec 21",
  "Dec 22",
  "Dec 23",
  "Dec 24",
  "Dec 25",
  "Dec 26",
  "Dec 27",
  "Dec 28",
  "Dec 29",
  "Dec 30",
  "Dec 31",
];

const squares = document.querySelector(".squares");
for (var i = 1; i < 283; i++) {
  const level = Math.floor(Math.random() * 3);
  const x = Math.floor(Math.random() * level * 30);
  const y = Math.floor(Math.random() * level * 150);
  const z = Math.floor(Math.random() * level * 50);
  var st = `${day[i - 1]}\nPush ups: ${x}\nSit Ups: ${z}\nSkips: ${y}`;
  squares.insertAdjacentHTML(
    "beforeend",
    `<li data-toggle="tooltip" data-placement="top" title="${st}" data-level="${level}"></li>`
  );
}
for (var i = 283; i < 366; i++) {
  const level = 0;
  const x = Math.floor(Math.random() * level * 30);
  const y = Math.floor(Math.random() * level * 30);
  const z = Math.floor(Math.random() * level * 50);
  var st = `${day[i - 1]}\nPush ups: ${x}\nSit Ups: ${z}\nSkips: ${y}`;
  squares.insertAdjacentHTML(
    "beforeend",
    `<li data-toggle="tooltip" data-placement="top" title="${st}" data-level="${level}"></li>`
  );
}

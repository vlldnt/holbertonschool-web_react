const $ = require( "jquery" );

if (typeof window !== "undefined") {
  window.$ = window.jQuery = $;
}

$(function () {
  const p1 = $("<p>").text("Holberton Dashboard");
  const p2 = $("<p>").html("Dashboard <strong>data for</strong> the students");
  const p3 = $("<p>").text("Copyright - Holberton School");
  $("body").append(p1, p2, p3);
});

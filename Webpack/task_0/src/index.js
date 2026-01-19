const $ = require( "jquery" );

if (typeof window !== "undefined") {
  window.$ = window.jQuery = $;
}

$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard <strong>data for</strong> the students</p>');
$('body').append('<p>Copyright - Holberton School</p>');

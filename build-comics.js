#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');

// Read files
var boilerplatePage = readFileSync(__dirname + '/boilerplate/comic-empty.html', 'utf-8')
var comicsDB = require(__dirname + '/comics.json')
var templateComic = readFileSync(__dirname + '/boilerplate/comic-template.html', 'utf-8')
var comicsHTML = ""

// Simplify replacing stuff in text
var items
function insert(match) {
  return items[match];
}

// Building the comics
comicsDB.comics.forEach(comic => {
  if(comic.alt == undefined) comic.alt = comic.caption;
  if(comic.title == undefined) comic.title = comic.caption;

  items = {
    URL: comic.url,
    TITLE: comic.title,
    ALTTAG: comic.alt,
    CAPTION: comic.caption
  }

  var block = templateComic.replace(/URL|TITLE|ALTTAG|CAPTION/g, insert);
  comicsHTML += block;
});

// Completing empty page with title and filename
items = {
  TITLE: comicsDB.title,
  FILENAME: comicsDB.filename,
  COMICS: comicsHTML
}

var output = boilerplatePage.replace(/TITLE|FILENAME|COMICS/g, insert);
writeFileSync(comicsDB.filename, output, 'utf-8');

let Song = require("./lib/jasmine_examples/Song")
let Player = require("./lib/jasmine_examples/Player")

let song = new Song("Test")
let player = new Player()
player.play(song)

if (player.isPlaying)
    console.log(player.currentlyPlayingSong)
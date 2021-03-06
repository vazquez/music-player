

var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
    { name: 'Hello, Operator?', length: '1:01' },
    { name: 'Ring, ring, ring', length: '5:01' },
    { name: 'Fits in your pocket', length: '3:21'},
    { name: 'Can you hear me now?', length: '3:14' },
    { name: 'Wrong phone number', length: '2:15'}
  ]
};

var currentlyPlayingSong = null;
var createSongRow = function(songNumber, songName, songLength){
  var template =
    '<tr>'
    + ' <td class="song-number col-md-1" data-song-number="'+ songNumber +'">' + songNumber + '</td>'
    + ' <td class="col-md-9">' + songName + '</td>'
    + ' <td class="col-md-2">' + songLength + '</td>'
    + '</tr>'
  ;

  // Instead of returning the row immediately, we'll attach hover
  // functionality to it first.
  var $row = $(template);

  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-number');
    var songNumber = songNumberCell.data('song-number');
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
    }
  };

  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-number');
    var songNumber = songNumberCell.data('song-number');

    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(songNumber);
    }
  };

  var clickHandler = function(event){
    var songNumber = $(this).data('song-number');

    if (currentlyPlayingSong !== null) {
      // Revert to song number for currently playing song because user started playing new song.
      var currentlyPlayingCell = $('.song-number[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingCell.html(currentlyPlayingSong);
    }

    if (currentlyPlayingSong !== songNumber) {
      // Switch from Play -> Pause button to indicate new song is playing.
      $(this).html('<a class="album-song-button"><i class="fa fa-pause"></i></a>');
      currentlyPlayingSong = songNumber;
    }

    else if (currentlyPlayingSong === songNumber) {
      // Switch from Pause -> Play button to pause currently playing song.
      $(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
      currentlyPlayingSong = null;
    }
  };

  $row.find('.song-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var changeAlbumView = function(album){

  // Update title
  var $albumTitle = $('.album-title');
  $albumTitle.text(album.name);

  // Update Album artist
  var $albumArtist = $('.album-artist');
  $albumArtist.text(album.artist);

  // Update meta info
  var $albumMeta = $('.album-meta-info');
  $albumMeta.text(album.year + " on " + album.label);


  // Update album image
  var $albumImage = $('.album-image img');
  $albumImage.attr('src', album.albumArtUrl);

  // Update song list
  var $songList = $('.album-song-listing');
  $songList.empty();

  var songs = album.songs;
  for (var i = 0; i < songs.length; i++) {
    var songData = songs[i];
    var $newRow = createSongRow(i + 1, songData.name, songData.length);
    $songList.append($newRow);
  };
}

var updateSeekPercentage = function($seekbar, event){
  var barWidth = $seekbar.width();
  var offsetX = event.pageX - $seekbar.offset().left;

  var offsetXPercent = (offsetX / barWidth) * 100;
  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);

  var percentageString = offsetXPercent + '%';
  $seekbar.find('.fill').width(percentageString);
  $seekbar.find('.thumb').css({left: percentageString});
}

var setupSeekBars = function(){
  $seekBars = $('.player-bar .seek-bar');
  $seekBars.click(function(event) {
    updateSeekPercentage($(this), event)
  });

  $seekBars.find('.thumb').mousedown(function(event) {
    var $seekBar = $(this).parent();
    $seekBar.addClass('no-animate');
    $(document).on('mousemove.thumb', function(event) {
      event.preventDefault();
      updateSeekPercentage($seekBar, event);
    });

    $(document).bind('mouseup.thumb', function(){
      $seekBar.removeClass('no-animate');
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });

  });
}

if (document.URL.match(/\/album.html/)) {
  jQuery(document).ready(function($) {
    changeAlbumView(albumPicasso);
    setupSeekBars();
    $('.album-image').click(function(){
      changeAlbumView(albumMarconi);
    });
  });
};

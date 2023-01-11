const musicDiv = document.querySelector(".topArtist_div");
const musicPlayer = document.querySelector(".music_player");
const savePlaylits = document.querySelector(".save_playlist");
const searchBar = document.querySelector(".search");
const clrPlaylist = document.querySelector("#clr");

//==========ALL API LOGIC =========//

const url =
  "https://api.napster.com/v2.1/tracks/top?apikey=NGFhZWY2YzgtMjdjOS00MTQ0LWI3YTUtMjYwYjg4MGYxYjRj";

const playingTracks = [];
let countTracks = [];
let idx = 0;
let playlist = [];

class Playlist {
  async getTracks() {
    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      const tracks = data.tracks;
      return tracks;
    } catch (error) {
      console.log(error);
    }
  }
}

//==========END API LOGIC =========//

const music = new Audio();

//==========ALL UI LOGIC =========//

class UI {
  //==========ALL API  UI LOGIC =========//

  getUI(res) {
    let allTracks = "";
    res.forEach((ele) => {
      allTracks += ` <div class="outer_card" >
          <div class="image_card">
            <img src="http://direct.rhapsody.com/imageserver/v2/albums/${ele.albumId}/images/300x300.jpg" alt="aw" />
          </div>
          <h3>${ele.artistName}</h3>
          <p>${ele.albumName}</p>
          <div class="playbutton" data-id=${ele.id}>
            <i class="bx bx-play" id="${ele.previewURL}" ></i>

          </div>
          <div class="playList_btn"data-id=${ele.id} >
              <i class='bx bxs-playlist' id="playlist"></i>

          </div>
        </div>`;
    });
    musicDiv.innerHTML = allTracks;
  }

  getPlayButton() {
    const playBtn = [...document.querySelectorAll(".playbutton")];
    // console.log(playBtn);
    playBtn.forEach((play) => {
      let id = play.dataset.id;
      play.addEventListener("click", () => {
        // if(d.id === )
        let d = JSON.parse(JSON.stringify(Music.findMusic(id)));
        // console.log(d);
        let alreadyExist = countTracks.find((i) => i.id === d.id);
        if (!alreadyExist) {
          // countTracks = [...countTracks, d];
          countTracks.push(d);
        // console.log(countTracks);

        }
        this.nowPlaying(d);
        this.mostPlayed(countTracks);
        this.musicControl();
        const child = play.querySelector(".bx");
        music.src = child.id;
        if (music.pause) {
          music.play();
          child.classList.remove("bx-play");
          child.classList.add("bx-pause");
        } else if (music.played) {
          music.pause();
          child.classList.add("bx-play");
          child.classList.remove("bx-pause");
        }
      });
    });
  }

  //==========END OF API  UI LOGIC =========//

  //==========NOWPLAYING  UI LOGIC =========//

  nowPlaying(res) {
    musicPlayer.innerHTML = `
          <div class="music_player_image">
              <img src="http://direct.rhapsody.com/imageserver/v2/albums/${res.albumId}/images/300x300.jpg" alt="" />
            </div>
            <h4 class="artist">${res.artistName}</h4>
            <p class="album">${res.albumName}</p>

            <div class="player">
              <p class="initial">0.00</p>
              <input type="range" min="0" max="100" id="rangebar" />
              <p class="end">-0.00</p>
            </div>
            <div class="music_controls">
              <i class="bx bx-shuffle"></i>
              <i class="bx bxs-skip-previous-circle"></i>
              <div class="play_pause_div">
                <i class="bx bx-pause"></i>
              </div>
              <!-- <i class='bx bx-pause'></i> -->
              <i class="bx bxs-skip-next-circle"></i>
              <i class="bx bx-repeat"></i>
            </div>
    `;
  }

  //==========END OF  NOW PLAYING  UI LOGIC =========//

  //==========SEARCH UI LOGIC =========//

  search(res) {
    searchBar.addEventListener("change", (e) => {
      let filerSearch = res.filter((r) =>
        r.artistName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filerSearch);
      this.getUI(filerSearch);
      this.savePlaylist(filerSearch);
      // this.mostPlayed(filerSearch);
    });
  }
  //========== END OF SEARCH UI LOGIC =========//

  //==========ALL MUSIC CONTROLS LOGIC =========//

  musicControl() {
    const play = document.querySelector(".play_pause_div i");
    const previousSong = document.querySelector(".bxs-skip-previous-circle");
    const nextsong = document.querySelector(".bxs-skip-next-circle");
    const loopSong = document.querySelector(".bx-repeat");
    const addToPlayList = document.querySelector("#playlist");
    // console.log(addToPlayList);
    const range = document.querySelector("#rangebar");
    const initialTime = document.querySelector(".initial");
    const endTime = document.querySelector(".end");
    const musicPlayerSrc = document.querySelector(".music_player_image img");
    const musicPlayerH4 = document.querySelector(".artist");
    const musicPlayerp = document.querySelector(".album");

    addToPlayList.addEventListener("click", () => {
      //  countTracks.forEach( m  => this.nowPlaying(m))
    });

    loopSong.addEventListener("click", () => {
      music.loop = true;
      music.play();
      console.log("looping on the way");
    });

    nextsong.addEventListener("click", () => {
      if (idx < newData.length) {
        idx++;
      } else {
        idx = 0;
      }
      display(newData[idx]);
      // countTracks = [...countTracks, newData[idx]];
    });

    previousSong.addEventListener("click", () => {
      if (idx > 0) {
        idx--;
      } else {
        idx = newData.length;
      }

      display(newData[idx]);
      // countTracks = [...countTracks, newData[idx]];
      // console.log(countTracks);
    });

    function display(data) {
      // console.log(data);
      let musicUrl = data.previewURL;
      music.src = musicUrl;
      music.play();
      musicPlayerSrc.src = `http://direct.rhapsody.com/imageserver/v2/albums/${data.albumId}/images/300x300.jpg`;
      musicPlayerH4.innerText = data.artistName;
      musicPlayerp.innerText = data.albumName;
    }

    play.addEventListener("click", () => {
      if (music.paused || music.currentTime < 0) {
        // console.log("working");
        music.play();
        play.classList.remove("bx-play");
        play.classList.add("bx-pause");
      } else {
        music.pause();
        play.classList.add("bx-play");
        play.classList.remove("bx-pause");
        // console.log("notworking");
      }
    });

    music.addEventListener("timeupdate", () => {
      let music_curr = music.currentTime;
      let music_dur = music.duration;
      let min = Math.floor(music_dur / 60);
      let sec = Math.floor(music_dur % 60);
      endTime.innerHTML = `${min}.${sec}`;

      let min1 = Math.floor(music_curr / 60);
      let sec1 = Math.floor(music_curr % 60);
      initialTime.innerHTML = `${min1}.${sec1}`;

      let musicbar = parseInt((music_curr / music_dur) * 100);
      range.value = musicbar;
    });

    range.addEventListener("change", () => {
      music.currentTime = (range.value * music.duration) / 100;
    });
  }

  //==========END OF MUSIC CONTROLS LOGIC =========//

  //==========ALL PLAYLIST LOGIC =========//

  saveToPlayList() {
    const playListBtn = [...document.querySelectorAll(".playList_btn")];
    playListBtn.forEach((pList) => {
      let id = pList.dataset.id;
      pList.addEventListener("click", () => {
        let data = { ...Music.findMusic(id) };
        if (!playlist.some((item) => item.id === data.id)){
            playlist.push(data);
        Storage.savePlaylist(playlist);
        }
      });
    });
  }

  clrBtnLogic() {
    clrPlaylist.addEventListener("click", () => {
      this.clearPlayList();
    });
  }

  clearPlayList() {
    const lists = playlist.map((item) => item.id);
    lists.forEach((id) => this.removeSong(id));
    console.log(lists);
  }

  removeSong(id) {
    playlist = playlist.filter((item) => item.id !== id);
    Storage.savePlaylist(playlist);
  }

  save() {
    playlist = Storage.getPlaylist() || [];
    // debugger
    this.savePlaylist(playlist);
  }

  savePlaylist(playlist) {
    let lists = "";
    // debugger
    if(!playlist){
      return;
    }
    playlist.forEach((list) => {
      lists += `
      <div class="inner_div" data-id=${list.id}>
           <div class="save_image_div">
            <img src="http://direct.rhapsody.com/imageserver/v2/albums/${list.albumId}/images/300x300.jpg" alt="">
          </div>
          <h4>${list.artistName}</h4>
          <p>${list.albumName}</p>
      </div>
      `;
    });
    // savePlaylits.append(innerDiv);
    savePlaylits.innerHTML = lists;
    
  }

  playlistPlaying() {
    const playlistDiv = [...document.querySelectorAll(".inner_div")];
    playlistDiv.forEach((div) => {
      let playId = div.dataset.id;
      div.addEventListener("click", () => {
        let play = { ...Music.findPlaylist(playId) };
        this.nowPlaying(play);
        this.musicControl();
        music.src = play.previewURL;
        music.play();
      });
    });
  }

  mostPlayed(countTracks) {
    // console.log(countTracks);
    const numberofList = document.querySelector(".mostPlayer_text p");
    const mostPlayedList = document.querySelector(".maine_list");
    let result = "";
    countTracks
      .slice()
      .reverse()
      .forEach((mp) => {
        result += `
                       <div class="song_list">
              <div class="songList_img">
                <img src="http://direct.rhapsody.com/imageserver/v2/albums/${
                  mp.albumId
                }/images/300x300.jpg" alt="" />
              </div>
              <h4>${mp.artistName}</h4>
              <p>${mp.albumName}</p>
              <p>${parseFloat(mp.playbackSeconds / 60).toFixed(2)}</p>
              <i class="bx bxl-deezer"></i>
            </div>
          `;
      });
    numberofList.innerHTML = `<p>${countTracks.length} songs on List</p>`;
    mostPlayedList.innerHTML = result;
  }
}

//==========END OF PLAYLIST LOGIC =========//

//==========ALL DATA FILTER AND FIND LOGIC =========//

let newData = [];
class Music {
  static getDetails(res) {
    newData = [...res];
  }

  static findMusic(id) {
    return newData.find((data) => data.id === id);
  }

  static findPlaylist(id) {
    return playlist.find((data) => data.id === id);
  }
}

//==========END OF DATA FILTER AND FIND LOGIC =========//

//==========ALL LOCAL STORAGE LOGIC =========//

class Storage {
  static saveMusic(res) {
    // console.log(res);
    localStorage.setItem("music", JSON.stringify(res));
  }

  static savePlaylist(playlist) {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }

  static getPlaylist() {
    return JSON.parse(localStorage.getItem("playlist"));
  }
}

//==========END OF LOCAL STORAGE LOGIC =========//

//==========ALL RENDER LOGIC =========//

document.addEventListener("DOMContentLoaded", () => {
  const track = new Playlist();
  // const tra = new Track();
  const ui = new UI();

  ui.save();

  track
    .getTracks()
    .then((res) => {
      // console.log(res);
      ui.getUI(res);
      Music.getDetails(res);
      Storage.saveMusic(res);
      ui.search(res);
    })
    .then(() => {
      ui.getPlayButton();
      ui.saveToPlayList();
      ui.playlistPlaying();
      ui.clrBtnLogic();
    });
});

$('#volume').change(function (e) {
  e.preventDefault()
  $('#show_volume').text($('#volume').val())
})
$("#addUrl").click(function (e) {
  e.preventDefault();
  $("#urlList").append(`
  <div class="uk-inline">
    <a class="uk-form-icon uk-form-icon-flip" href="#" uk-icon="icon: close" id="removeUrl"></a>
    <input class="uk-input" type="text" value="${$("#setUrl").val()}" id="url" disabled>
  </div>
  `);
  $("#setUrl").val("");
});
$("#removeUrl").click(function (e) {
  e.preventDefault();
  $(this).parent.remove();
});

function SaveSetting() {
  let YtUrls = []
  $.each($("#url"), function (indexInArray, valueOfElement) {
    const val = $(valueOfElement).val()
    console.log(val);
    YtUrls.push(val)
  });
  $('#url').each(function (i, elem) {
    console.log(i);
    console.log(elem);
  });
  console.log(YtUrls);
  const isRandom = $('#isRandom').prop('checked')
  const volume = $('#volume').val()

  window.YtUrls = YtUrls
  window.isRandom = isRandom
  window.volume = volume
}
function LoadSetting() {
  return {
    YtUrls: YtUrls,
    isRandom: window.isRandom,
    volume: window.volume,
  }
}
function ShowQuiz(q_number) {
  const setting = LoadSetting()
  if (setting.YtUrls.length < q_number) {
    GameEnd()
    return
  }
  const YtUrl = setting.YtUrls[q_number - 1]
  const YtId = YtUrl.split('/')[3]
  window.q_number = q_number
  document.title = `${q_number}問目 | イントロクイズ`
  $('#player').remove()
  $('body').prepend('<div id="player"></div>')
  player = new YT.Player('player', {
    videoId: YtId,
    events: {
      onReady: function (event) {
        player.setVolume(setting.volume)
        player.playVideo()
      },
    },
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: YtId,
    },
  })
  $('#player, #next').hide()
  $('#ShowAnswer').show()

  $('#start').click(function (e) {
    e.preventDefault()
    player.playVideo()
  })
  $('#stop').click(function (e) {
    e.preventDefault()
    player.pauseVideo()
  })
}
function ShowAnswer(q_number) {
  document.title = `答え ${q_number}問目 | イントロクイズ`
  $('#ShowAnswer').hide()
  $('#player, #next').show()
}
function GameStart() {
  const setting = LoadSetting()
  if (setting.YtUrls.length === 0) {
    UIkit.notification({
      message:
        '再生する動画が指定されていません。設定からURLを貼り付けて保存をしてください。',
      status: 'danger',
    })
    return
  }
  let YtUrls = setting.YtUrls
  if (window.isRandom) {
    shuffle(YtUrls)
  }
  $('body').html(`
        <div id="player"></div>
        <div id="operation">
        <!--<button class="uk-button uk-button-secondary" id="play"><span uk-icon="icon: play"></span>再生</button>-->
        <button class="uk-button uk-button-secondary" id="stop">停止</button>
        </div>
        <button class="uk-button uk-button-danger" id="ShowAnswer" onclick="ShowAnswer(window.q_number)">答え</button>
        <button class="uk-button uk-button-primary" id="next" onclick="ShowQuiz(window.q_number + 1)">NEXT</button>
        `)
  ShowQuiz(1)
}
function GameEnd() {
  document.title = `終了! | イントロクイズ`
  $('body').html(`
  <h2>終了！！</h2>
  <button class="uk-button uk-button-primary uk-button-large uk-width-1-1" id="start" onclick="window.location.reload()">
  はじめに戻る
  </button>
  `)
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

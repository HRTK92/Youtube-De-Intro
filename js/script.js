$('#volume').change(function (e) {
  e.preventDefault()
  $('#show_volume').text($('#volume').val())
})

function SaveSetting() {
  let YtUrls
  if ($('#YtUrls').val().trim().length > 0) {
    YtUrls = $('#YtUrls').val()
  } else {
    YtUrls = ''
  }
  const isRandom = $('#isRandom').prop('checked')
  const volume = $('#volume').val()

  console.log(YtUrls);

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
  if (setting.YtUrls.split('\n').length < q_number) {
    GameEnd()
    return
  }
  const YtUrl = setting.YtUrls.split('\n')[q_number - 1]
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
    player.stopVideo()
  })
}
function ShowAnswer(q_number) {
  $('#ShowAnswer').hide()
  $('#player, #next').show()
}
function GameStart() {
  const setting = LoadSetting()
  if (setting.YtUrls == '') {
    UIkit.notification({
      message:
        '再生する動画が指定されていません。設定からURLを貼り付けて保存をしてください。',
      status: 'danger',
    })
    return
  }
  let YtUrls = setting.YtUrls.split('\n')
  if (window.isRandom) {
    shuffle(YtUrls)
  }
  console.log(YtUrls);
  $('body').html(`
        <div id="player"></div>
        <div id="operation">
        <button class="uk-button uk-button-secondary" id="play"><span uk-icon="icon: play"></span>再生</button>
        <button class="uk-button uk-button-secondary" id="stop">停止</button>
        </div>
        <button class="uk-button uk-button-danger" id="ShowAnswer" onclick="ShowAnswer(window.q_number)">答え</button>
        <button class="uk-button uk-button-primary" id="next" onclick="ShowQuiz(window.q_number + 1)">NEXT</button>
        `)
  ShowQuiz(1)
}
function GameEnd() {
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

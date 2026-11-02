// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    btnColor: '#07c160',
    defaultBtnColor: '#07c160',
    showResult: true,
    resultText: '测测自己对时间的感知',
    startTime: 0,
    btnText: "按住挑战 3 秒",
    elapsed: 0,
    timeList: ['3S', '5S', '10S'],
    timeIndex: 0,
    challengeSeconds: 3,
  },
  methods: {
    onTimeChange(e) {
      const index = Number(e.detail.value);
      const challengeSeconds = parseInt(this.data.timeList[index], 10);
      this.setData({
        timeIndex: index,
        challengeSeconds: challengeSeconds,
        btnText: `按住挑战 ${challengeSeconds} 秒`,
      });
    },
    onTouchStart() {
      this.setData({
        btnColor: '#ff6b6b',
        startTime: Date.now(),
        showResult: true,
        resultText: `${this.data.challengeSeconds}秒 后松开`,
        btnText: "计时中...",
      });
    },
    onTouchEnd() {
      const endTime = Date.now();
      const elapsed = (endTime - this.data.startTime) / 1000;
      const resultText = elapsed.toFixed(3) + '秒';
      const defaultColor = this.data.defaultBtnColor || '#07c160';
      this.setData({
        elapsed: elapsed,
        showResult: true,
        resultText: resultText,
        btnColor: defaultColor,
        btnText: `按住挑战 ${this.data.challengeSeconds} 秒`,
      });
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage']
      });
    },
    onShareAppMessage() {
      const text = this.data.showResult ? `我测得${this.data.resultText},来测测你的` : '来测测你的反应时间';
      return {
        title: text,
        path: '/pages/index/index'
      };
    },
  },
})

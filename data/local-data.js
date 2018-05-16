var tab = [
  [{
    iconSrc: '/images/icon/explore.png',
    name: '发现',
    id: 0,
  },
  {
    iconSrc: '/images/icon/footprint.png',
    name: '足迹',
    id: 1,
  }],
  [{
    iconSrc: '/images/icon/settings.png',
    name: '设置',
    id: 2,
  },
  {
    iconSrc: '/images/icon/help.png',
    name: '帮助',
    id: 3,
  }]

];

var weatherList = [
  {
    name: '多云',
    src: '/images/icon/weather/weather-cloudy.png'
  },
  {
    name: '晴',
    src: '/images/icon/weather/weather-sunny.png'
  },
  {
    name: '雨',
    src: '/images/icon/weather/weather-rainy.png'
  },
  {
    name: '雪',
    src: '/images/icon/weather/weather-snowy.png'
  },
  {
    name: '大风',
    src: '/images/icon/weather/weather-windy.png'
  },
  {
    name: '雷',
    src: '/images/icon/weather/weather-lightning.png'
  },
]

module.exports = {
  tabData: tab,
  weatherList:weatherList,
}
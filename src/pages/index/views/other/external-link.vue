<template>
  <div>
    <div id="container" />
    <div id="result" class="result-item" />
    <div v-if="info" class="info-wrap" style="font-size: 16px;">
      <div>
        {{ info.address }}
      </div>
    </div>
  </div>
</template>

<script>
import remoteLoad from '@/utils/remote-load'
export default {
  name: 'ExternalLink',
  data() {
    return {
      map: null,
      dragStatus: false,
      searchKey: '',
      info: null
    }
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      // 未载入高德地图API，则先载入API再初始化
      this.initMap()
    } else {
      await remoteLoad('https://webapi.amap.com/maps?v=1.4.14&key=c3b7ff507e473471907fbcb6d6a1a5c2')
      await remoteLoad('//webapi.amap.com/ui/1.0/main.js?v=1.0.11')
      this.initMap()
    }
  },
  methods: {
    initMap() {
      /* eslint-disable */
      const _self = this
      this.map = new AMap.Map('container', {
        zoom: 16,
        resizeEnable: true
      })
      AMap.plugin('AMap.Geolocation', function() {
        const geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB',
          showMarker: false,
          showButton: true // 是否显示定位按钮
        })
        _self.map.addControl(geolocation)
        geolocation.getCurrentPosition()

        AMap.event.addListener(geolocation, 'complete', (res) => {
          if (res) {}
        })
        AMap.event.addListener(geolocation, 'error', (res) => {
        })
      })
      AMapUI.loadUI(['misc/PositionPicker', 'misc/PoiPicker'], function(PositionPicker, PoiPicker) {
        const positionPicker = new PositionPicker({
          mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: _self.map // 依赖地图对象
        })
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on('success', function(positionResult) {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!_self.dragStatus) {
            _self.dragStatus = true
          } else {
            _self.info = {
              address: positionResult.address,
              position: JSON.stringify(positionResult.position)
            }
          }
        })
        // 启动拖放
        positionPicker.start()
        _self.map.panBy(0, 1)

        const poiPicker = new PoiPicker()

        // 初始化poiPicker
        poiPickerReady(poiPicker)
        // 搜索框
        function poiPickerReady(poiPicker) {
          const marker = new AMap.Marker()
          const infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -20)
          })
          // 选取了某个POI
          poiPicker.on('poiPicked', function(poiResult) {
            const poi = poiResult.item
            infoWindow.setMap(_self.map)
            marker.setPosition(poi.location)
            _self.map.setCenter(marker.getPosition())
          })
        }
      })
    /* eslint-disable */
    }
  }
}
</script>

<style lang="less" scoped>
#container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/deep/.amap-logo,
/deep/.amap-copyright {
  display: none !important;
}
.info-wrap {
  position: absolute;
  bottom: 200px;
  width: 100%;

  &>div {
    width: 85%;
    margin: 0 auto;
    background: white;
    box-shadow: 0px 14px 30px 2px rgba(0, 0, 0, 0.35);
    border-radius: 10px;
    padding: 20px;
    line-height: 70px;
  }
}
</style>

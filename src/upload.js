export function uploadMessage(_this) {
  let xhr = new XMLHttpRequest()
  let uploadUrl = _this.url
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.open('POST', uploadUrl, true)
  xhr.send(JSON.stringify(_this.uploadMsg))
}

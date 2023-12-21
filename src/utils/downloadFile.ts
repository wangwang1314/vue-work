/**
 * 根据文件url获取文件名
 * @param url 文件url
 */
function getFileName(url: string) {
  const num = url.lastIndexOf('/') + 1
  let fileName = url.substring(num)
  //把参数和文件名分割开
  fileName = decodeURI(fileName.split('?')[0])
  return fileName
}

/**
 * 根据文件地址下载文件
 * @param {*} sUrl
 */
export function downloadByUrl({
  url,
  target = '_blank',
  fileName
}: {
  url: string
  target?: '_self' | '_blank'
  fileName?: string
}): Promise<boolean> {
  // 是否同源
  const isSameHost = new URL(url).host == location.host
  return new Promise<boolean>((resolve, reject) => {
    if (isSameHost) {
      const link = document.createElement('a')
      link.href = url
      link.target = target

      if (link.download !== undefined) {
        link.download = fileName || getFileName(url)
      }

      if (document.createEvent) {
        const e = document.createEvent('MouseEvents')
        e.initEvent('click', true, true)
        link.dispatchEvent(e)
        return resolve(true)
      }

      if (url.indexOf('?') === -1) {
        url += '?download'
      }

      window.open(url, target)
      return resolve(true)
    } else {
      const canvas = document.createElement('canvas')
      const img = document.createElement('img')
      img.setAttribute('crossOrigin', 'Anonymous')
      img.src = url
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        const context = canvas.getContext('2d')!
        context.drawImage(img, 0, 0, img.width, img.height)
        // window.navigator.msSaveBlob(canvas.msToBlob(),'image.jpg');
        // saveAs(imageDataUrl, '附件');
        canvas.toBlob((blob) => {
          const link = document.createElement('a')
          if (!blob) return
          link.href = window.URL.createObjectURL(blob)
          link.download = getFileName(url)
          link.click()
          URL.revokeObjectURL(link.href)
          resolve(true)
        }, 'image/jpeg')
      }
      img.onerror = (e) => reject(e)
    }
  })
}

export function downloadFile(obj: { name: string; url: string }) {
  const xhr = new XMLHttpRequest()
  xhr.open('get', obj.url)
  xhr.responseType = 'blob'
  // 关键部分
  xhr.onload = function (e) {
    // 如果请求执行成功
    if (this.status === 200) {
      const blob = this.response
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(blob)
      a.download = obj.name
      a.click()
      // 释放之前创建的URL对象
      window.URL.revokeObjectURL(blob)
    }
  }
  xhr.send()
}

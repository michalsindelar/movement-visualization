// @flow

const appendScript = (url: string): Promise =>
  new Promise((resolve, reject) => { // eslint-disable-line
    const t = document.getElementsByTagName("script")[0]
    let r = false
    const s = document.createElement("script")

    s.type = "text/javascript"
    s.src = url
    s.async = true
    s.onload = s.onreadystatechange = () => { // eslint-disable-line
      if (!r && (!this.readyState || this.readyState === "complete")) {
        r = true
        resolve(this)
      }
    }
    s.onerror = s.onabort = reject // eslint-disable-line
    t.parentNode.insertBefore(s, t)
  })

export default appendScript

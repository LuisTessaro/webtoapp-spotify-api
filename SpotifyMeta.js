module.exports = () => {
  const rules = {
    release_date: [({ htmlDom: $, url }) => $('meta[property="music:release_date"]').attr('content')],
    authorUrl: [({ htmlDom: $, url }) => $('meta[property="music:musician"]').attr('content')],
  }
  return rules
}
//组合url
const schema = 'http'

// const host = '192.168.1.57'
// const host = '192.168.0.123'

//TODO
const host = '192.168.2.60'

const port = '8088'

export const basePatch = '/api/v1'

export const imageBucket = ''
export const mediaBucket = ''

// //线上域名
const Domain = '//' + location.host + basePatch
//const Domain = 'http://test-01.server.s-cms-api.release.nanaj.cn/'+basePatch
// const Domain = ''

// export const mock = true
export const mock = false

//预发布域名
//  const Domain = 'http://server.s-cms-api.pre.nanaj.cn' + basePatch

// //域名
// const Domain = ''

//全局分页配置
export const PaginationConfig = {
    defaultCurrent: 1
    , hideOnSinglePage: true
    , defaultPageSize: 20
}

export const baseUrl = Domain ? Domain : schema + '://' + host + ':' + port
export const url = Domain ? Domain : schema + '://' + host + ':' + port + basePatch


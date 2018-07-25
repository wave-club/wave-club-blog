class Url {

    static urlSearchs() {
        let args = {}
        let query = location.search.substring(1)

        if (query === "") {
            let hash = location.hash;
            let queryString = /\?.+/.exec(hash)
            query = (queryString && queryString[0].substring(1)) || ''
        }


        let pairs = query.split("&")
        for (let i = 0; i < pairs.length; i++) {
            let pos = pairs[i].indexOf("=")
            if (pos == -1) {
                continue
            }
            let name = pairs[i].substring(0, pos)
            let value = pairs[i].substring(pos + 1)
            args[name] = value
        }
        return args
    }

}

export default Url
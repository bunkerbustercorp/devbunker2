
const configs = {
    production: {
        url: 'http://bunkerbustercorp.ipdisk.co.kr:4000',
        backendUrl: 'http://bunkerbustercorp.ipdisk.co.kr:4000'
    },
    development: {
        url: 'http://localhost:3000',
        backendUrl: 'http://localhost:4000'
    }
};

export default configs[process.env.NODE_ENV];
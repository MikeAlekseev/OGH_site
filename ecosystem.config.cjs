module.exports = {
    apps: [
        {
            name: 'ogh',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
}

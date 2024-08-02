export function run() {
    process.on('message', ({ path, params }) => {
        const addon = require(path);
        const res = addon.hello();

        process.send({ code: 0, res, params });
        process.exit(0);
    });
}

if (require.main === module) {
    run();
}
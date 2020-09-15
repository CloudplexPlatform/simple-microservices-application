const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    webpack: (config, {}) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.plugins.push(new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true,
        }))

        // Important: return the modified config
        return config
    },
}
const { alias } = require("react-app-rewire-alias")

module.exports = function override(config, env){
    alias({
        "@components" : "src/components",
        "@store" : "src/store",
        "@services" : "src/services",
        "@assets" : "src/assets",
        "@views" : "src/views",
    })(config)
    return config;
}
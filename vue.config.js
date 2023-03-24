module.exports={
    pages: {
        index:{
            entry:"src/main.js"
        }
    },
    lintOnSave:false,
    devServer:{
        port: 9876,
        proxy:{
            '/api':{
                target:'http://localhost:9090',
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '/api' : ''
                }
            }
        }
    }

}
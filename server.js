const express = require('express');
const app = express();
const path = require('path');  // path 모듈 사용

app.listen(8080, ()=>{
    console.log('server on');
})

app.use( '/', express.static( path.join(__dirname, './components') ));  
// 이 부분이 없으면 아래코드에서 index.html을 로드하지 못한다.
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './components/MenProduct.vue'));  
})
ITS

Team 3

Member : 
黃禎安 105590008 t105590008@ntut.org.tw
顏柏耀 105590019 t105590019@ntut.org.tw
李添熙 105590050 t105590050@ntut.org.tw
吳浩廷 105590049 t105590049@ntut.org.tw
孫琪茵 107AEA001 t107AEA001@ntut.org.tw


File structure:
```
- demVideo
  - Final_demo
- doc
  - 期末報告.pptx
  - 期中報告.pptx
  - PEP
  - SRS
  - SDD
  - STD
- Project
  - its
  - its-api
  - its-api-doc
README.md
```

前端測試環境
https://tingngs.github.io/its
後端測試環境
https://its-api.herokuapp.com/
API document
https://tingngs.github.io/its-api-docs/swagger-ui/#/


測試環境為免費伺服器，需要點喚醒時間，請先點後端測試環境喚請

前端預設測試帳號
Emain : test@mail.com
password : 1

its (前端 - ReactJs) 
1. npm install
2. npm run dev (連接後端測試環境) /  npm run local (連接本地後端伺服器)

its-api (後端 - Java Spring boot)
1.Open my SQL
2.Run its_init.sql
3.mvn spring-boot:run

its-doc (API 文件)
1.npm start
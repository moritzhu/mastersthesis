# mastersthesis
This repository contains examples on how to use certain framework native functionalities and libraries to reduce vulnerabilities.

Injection  
&nbsp;  SQL:  
 &nbsp;&nbsp;   mySQL   
 &nbsp;&nbsp;&nbsp; --> JS: Experess/01-Injection/mysql.js and Experess/01-Injection/sequelize.js  
 &nbsp;&nbsp;&nbsp; --> Java: SpringBoot/demo/src/main/java/main/demo/Injection.java  
&nbsp;  NoSQL:  
 &nbsp;&nbsp;   mongoDB  
 &nbsp;&nbsp;&nbsp; --> JS: Experess/01-Injection/mongoDB.js and Experess/01-Injection/mongoose.js  
 &nbsp;&nbsp;&nbsp; --> Java: SpringBoot/mongoDBRepository and SpringBoot/mongoDBTemplate
    
Broken Authentication  
&nbsp;  PW Hashing   
&nbsp;&nbsp;--> JS: GeneralJS/pwHashing.js  
&nbsp;&nbsp; --> Java: SpringBoot/demo/src/main/java/main/demo/WebSecurityConfig.java --> Contains PasswordEncoder declarations  

Sensitive Data Exposure  
&nbsp; Cryptography:  
&nbsp;&nbsp; --> JS: GeneralJS/cryptography.js  
&nbsp;&nbsp; --> Java: SpringBoot/demo/src/main/java/main/demo/WebSecurityConfig.java    

XML External Entities  
&nbsp; --> JS: GeneralJS/xxe.js  
&nbsp; --> Java: GeneralJava/04-XXE/main/src

XSS  
&nbsp; --> React: React/main/src/XSS.js  
&nbsp; --> Vue.js: Vue/main/src/components/HelloWorld.vue  
&nbsp; --> Angular: Angular/main/src/app  
&nbsp; --> Sanitization and escaping libraries: React/main/src/XSS.js 

Insecure Deserialization  
&nbsp; --> JS: Express/08-InsecureDeserialization/serialisation.js  
&nbsp; --> Java: GeneralJava/08-InsecureDeserialization/main/src/main  

Insufficient Logging and Monitoring  
&nbsp; --> JS: Express/10-InsufficientLoggingAndMonitoring  
&nbsp; --> Java: SpringBoot/demo/src/main/java/main/demo/Injection.java --> Uses logging  





             
             

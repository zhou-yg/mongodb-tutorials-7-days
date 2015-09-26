/**
 * Created by zyg on 15/9/26.
 */
fs = require('fs');
path = require('path');

projectDir = path.resolve(__dirname);
console.log(projectDir);

fs.readdir(projectDir,function(err,files){
    files.filter(function(name){
        var r1 = fs.statSync(path.resolve(projectDir,name)).isDirectory();
        var r2 = name.indexOf('.') === -1;
        return r1 && r2;
    }).forEach(function(dir){
        fs.readdir(path.resolve(projectDir,dir),function(err,files){
            files.forEach(function(filename){
                require(path.resolve(projectDir,dir,filename));
            });
        });
    });
});
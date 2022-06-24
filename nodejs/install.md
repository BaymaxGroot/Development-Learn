# npm、yarn

## npm

### npm install流程分析

    同一个项目团队应该保持npm版本一致性

1. 检查和获取npm配置文件(.npmrc)
2. 检查是否存在package-lock.json文件

    2.1 存在 - 检查 package-lock.json和package.json声明的依赖是否一致

        2.1.1 一致 - 直接使用package-lock.json中的信息，从网络或缓存中加载依赖

        2.1.2 不一致 - 根据npm版本的不同会有不同的处理
    
    2.2 不存在 - 根据package.json递归构建依赖树，然后根据构建好的依赖树下载完整的依赖资源，下载时会检查有无相关资源的缓存

        2.2.1 有缓存 - 直接解压到node_modules文件夹

        2.2.2 无缓存 - 从npm远端仓库下载，校验包的完整性，同时添加到缓存中，解压到node_modules文件夹

    最后生成package-lock.json文件 
## yarn

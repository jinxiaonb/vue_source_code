1. Object.defineProperty( obj, '属性名称', {
    configurable:true, //可配置
    writable:true, //可读写
    enumerable:true, //可枚举
    value:v, //值
    get:function() {},
    set:function() {},
    });

2. 数组拦截__pro__
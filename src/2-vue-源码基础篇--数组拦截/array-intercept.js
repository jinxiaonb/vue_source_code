/**
 * 数组拦截
*/

/**
 * 使用原型链的__proto__方式拦截
*/
function testArrayIntercept() {
    // 数组的变异方法
    const variationMethods = ['splice', 'sort', 'push', 'pop', 'reverse', 'shift', 'unshift'];
    // 缓存数组的原型对象
    const tmpArrayPrototype = Array.prototype;
    // console.log(tmpArrayPrototype);
    // middleLayer继续数组的原型对象，即middleLayer.__proto__ = Array.prototype
    const middleLayer = Object.create(Array.prototype);
    // console.log(Object.prototype);
    console.log(middleLayer);
    variationMethods.forEach(method => {
        // console.log(method);
        // console.log( middleLayer[method] );
        middleLayer[method] = function (...args) {
            // 实际执行的还是Array.prototype对象上的方法
            const result = tmpArrayPrototype[method].apply(this, args);
            //
            // console.log(args);
            // console.log(tmpArrayPrototype[method]);
            console.log(`拦截到了${method}方法的执行`);
            return result;
        }
    });

    // const arr = [];
    // arr.__proto__ = middleLayer;
    // arr.push('1');


    /**
     * 对于不支持__proto__的浏览器采用下面的方式
    */
    const arr = [];
    // Object.keys 获取对象自身可枚举的属性
    // Object.getOwnPropertyNames 获取对象自身的全部属性名称
    const arrayKeys = Object.getOwnPropertyNames(middleLayer);
    // console.log(arrayKeys);
    arrayKeys.forEach(method => {
        Object.defineProperty(arr, method, {
            enumerable: false,
            writable: true,
            configurable: true,
            value: middleLayer[method]
        });
    });
    // arr.push('1');
}

// testArrayIntercept();

function testArrayInterceptByProxy() {
    const variationMethods = [];
    let proxy = new Proxy(variationMethods, {
        get: function (target, key) {
            // console.log(target);
            console.log(key);
            return Reflect.get(target, key)
        },
        set: function (target, property, value) {
            // console.log(target);
            // console.log(property);
            // console.log(value);
            return Reflect.set(target, property, value);
        }
    });
    // const arr = [];
    // arr.push('1');
    // console.log(arr);
    proxy.push('1');

}

// testArrayInterceptByProxy();


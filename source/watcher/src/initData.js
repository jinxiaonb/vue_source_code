let ARRAY_METHOD = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];

let array_methods = Object.create(Array.prototype);

// 数组拦截
ARRAY_METHOD.forEach(method => {
    array_methods[method] = function () {
        //
        console.log('调用的是拦截的' + method + '方法');

        for (let i = 0; i < arguments.length; i++) {
            observe(arguments[i]);
        }

        let res = Array.prototype[method].apply(this, arguments);

        return res;
    }
});

function defineReactive(target, key, value, enumerable) {
    // console.log(target, key, value);
    if (typeof value === 'object' && value != null) {
        observe(value);
    }

    let dep = new Dep();

    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: !!enumerable,
        get() {
            // console.log('访问哪个属性:'+key);
            dep.depend();
            return value;
        },
        set(newVal) {
            if (value === newVal) return;
            if (typeof newVal === 'object' && newVal != null) {
                observe(newVal);
            }

            value = newVal;

            dep.notify();
        }
    });
    // console.log(target);
}

// 将对象obj变成响应式
function observe(obj) {
    // console.log(obj);
    // console.log(Array.isArray(obj));
    if (Array.isArray(obj)) {
        obj.__proto__ = array_methods;
        for (let i = 0; i < obj.length; i++) {
            observe(obj[i]);
        }
    } else {
        let keys = Object.keys(obj);
        // console.log(keys);
        for (let i = 0; i < keys.length; i++) {
            let prop = keys[i];
            defineReactive(obj, prop, obj[prop], true);
        }
    }
}

function proxy(target, prop, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            return target[prop][key];
        },
        set(newVal) {
            target[prop][key] = newVal;
        }
    })
}


JGVue.prototype.initData = function () {
    let keys = Object.keys(this._data);
    // console.log(keys);

    observe(this._data);

    for (let i = 0; i < keys.length; i++) {
        proxy(this, '_data', keys[i]);
    }
}
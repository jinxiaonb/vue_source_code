function defineReactive() {

}

function reactify(o, vm) { }

// 将对象转换为响应式
function observer(obj, propName, vm) {
    // 查看对象的成员，递归
    // 调用defineReactive
    if (Array.isArray(obj[propName])) {

    } else {

    }

    // defineReactive(obj, )
}

// 将某个对象的属性访问映射到对象的某个属性成员上
function proxy(target, prop, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            return target[prop][keys];
        },
        set(newVal) {
            target[prop][key] = newVal
        }
    });
}

function JGVue(options) {

    this._data = options.data;

}

JGVue.prototype.initData = function () {
    let keys = Object.keys(this._data);//获取对象的全部属性

    // 响应式处理
    for (let i = 0; i < keys.length; i++) {
        // observer(this._data, keys[i], this);
        reactify(this._data, this)
    }

    // 代理处理
    for (let i = 0; i < keys.length; i++) {
        proxy(this, '_data', keys[i]);
    }
}
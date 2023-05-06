


JGVue.prototype.mount = function () {
    this.render = this.createRenderFn();
    this.mountComponent();
}


JGVue.prototype.mountComponent = function () {
    let renderDOM = () => {
        this.update(this.render());
    }

    Dep.target = new Watcher(this, renderDOM);
}


JGVue.prototype.createRenderFn = function () {
    let ast = getVNode(this._template);
    // console.log(ast);

    return function render() {
        let _tmp = combine(ast, this._data);
        // console.log(_tmp);
        return _tmp;
    }
}

JGVue.prototype.update = function (vnode) {
    let realDOM = parseVNode(vnode);
    console.log(realDOM);
    this._parent.replaceChild(realDOM, document.querySelector('#root'));
    // this._parent.replaceChild(realDOM, this._template);
}
class Watcher {
    constructor(vm, expOrfn) {
        this.vm = vm;
        this.getter = expOrfn;

        this.deps = [];//
        this.depIds = {};//

        this.get();
    }

    addDep(dep) {
        this.deps.push(dep);
    }

    /**
     * 计算，触发getter
     */
    get() {

        pushTarget(this);
        this.getter.call(this.vm, this.vm);
        popTarget();
    }

    /**
     * 执行，并判断是懒加载，还是同步执行，还是异步执行
     * 
     */
    run() {
        this.get();
    }

    // 对外公开函数，用于在属性发生变化时触发的接口
    update() {
        this.run();
    }

    // 清空依赖队列
    cleanupDep() {

    }
}
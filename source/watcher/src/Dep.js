class Dep {
    constructor() {
        this.subs = [];
    }

    /**
     * 添加一个watcher
    */
    addSub(sub) {
        this.subs.push(sub);
    }

    /**
     * 移除
    */
    removeSub(sub) {
        for (let i = this.subs.length - 1; i >= 0; i--) {
            if (sub === this.subs[i]) {
                this.subs.splice(i, 1);
            }
        }
    }

    /**
     * 将当前Dep与当前的watcher关联
    */
    depend() {
        // 依赖收集就是将当前的dep和watcher互相关联
        if (Dep.target) {
            this.addSub(Dep.target);// 将当前的watcher关联到当前的dep上
            Dep.target.addDep(this);
        }
    }

    /**
     * 触发与之关联的watcher的update方法，起更新的作用
    */
    notify() {

        // Dep.target.update();
        // let deps = Dep.target.subs.slice();
        let deps = this.subs.slice();

        deps.forEach(watcher => {
            watcher.update();
        });
    }
}


Dep.target = null;//全局的watcher


let targetStack = [];

/**
 * 将当前操作的watcher存储到全局watcher中
*/
function pushTarget(target) {
    // targetStack.push(Dep.target);
    targetStack.unshift(Dep.target);
    Dep.target = target;
}

function popTarget() {
    Dep.target = targetStack.shift();
}
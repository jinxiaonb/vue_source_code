

// HTML -> VNode
function getVNode(node) {
    let nodeType = node.nodeType;
    let _vnode = null;
    // 元素节点
    if (nodeType === 1) {
        let nodeName = node.nodeName;
        let attrs = node.attributes;
        let _attrObj = {};
        for (let i = 0; i < attrs.length; i++) {
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
        }
        _vnode = new VNode(nodeName, _attrObj, undefined, nodeType);

        let childNodes = node.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            _vnode.appendChild(getVNode(childNodes[i]));
        }
    } else if (nodeType === 3) {
        _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType);
    }

    return _vnode;

}

// VNode -> HTML
function parseVNode(vnode) {
    let type = vnode.type;
    let _node = null;
    if (type === 3) {
        return document.createTextNode(vnode.value);
    } else if (type === 1) {
        _node = document.createElement(vnode.tag);

        let data = vnode.data;
        Object.keys(data).forEach((key) => {
            let attrName = key;
            let attrValue = data[key];

            _node.setAttribute(attrName, attrValue);
        });

        let children = vnode.children;

        children.forEach(subvnode => {
            _node.appendChild(parseVNode(subvnode));
        });

        return _node;
    }
}


let rkuohao = /\{\{(.+?)\}\}/g;
function getValueByPath(obj, path) {
    let paths = path.split('.');
    // console.log(obj, path, paths);
    let res = obj;
    let prop;
    while (prop = paths.shift()) {
        res = res[prop];
    }
    return res;
}


// vnode和数据结合
function combine(vnode, data) {
    let _type = vnode.type;
    let _data = vnode.data;
    let _value = vnode.value;
    let _tag = vnode.tag;
    let _children = vnode.children;

    let _vnode = null;
    if (_type === 3) {
        _value = _value.replace(rkuohao, function (_, g) {
            // console.log(g);
            return getValueByPath(data, g.trim());
        });

        _vnode = new VNode(_tag, _data, _value, _type);
    } else if (_type === 1) {
        _vnode = new VNode(_tag, _data, _value, _type);
        _children.forEach(_subvnode => _vnode.appendChild(combine(_subvnode, data)));
    }

    // console.log(_vnode);

    return _vnode;
}
/*由DOM->obj，之后的节点树生成在此基础上改造一下*/

function getVNode(node) { }
function parseVNode(obj) { }

/**
 * 将DOM->对象
*/
function generateDomToObj(node) {
    let _type = node.nodeType; // 元素类型：元素 1, 文本 3 和 注释。
    // let _typeName = node.nodeName;
    // console.log(node);
    // console.log(_type);
    let obj = {};
    if (_type === 1) {
        // 处理当前元素
        // 获取当前元素的属性和节点名称
        let _nodeName = node.nodeName,
            _attrs = node.attributes,
            _len = _attrs.length,
            _attrObj = {};
        // console.log(_attrs.length);
        // 伪数组转换为数组
        // console.log(..._attrs);// 扩展运算符
        // console.log([].slice.call(_attrs));
        // console.log(Array.prototype.slice.call(_attrs));
        // console.log(Array.from(_attrs)); // 属于浅拷贝 ，内层对象的修改会影响到原先的被拷贝的对象的值
        for (let i = 0; i < _len; i++) {
            // console.log(_attrs[i]);
            _attrObj[_attrs[i].nodeName] = _attrs[i].nodeValue;
        }
        // console.log(_attrObj);
        // _attrs.forEach(attr => {
        //     console.log(attr);
        // });

        obj['nodeType'] = _type;
        obj['nodeName'] = _nodeName.toLowerCase();
        obj['attr'] = _attrObj;
        obj['value'] = undefined;//node.nodeValue;
        obj['children'] = [];

        // 处理子元素
        let _childNode = node.childNodes;
        _childNode.forEach(element => {
            let _result = generateDomToObj(element);
            // console.log(_result);
            obj['children'].push(_result);

        });
    }
    else if (_type === 3) {
        // console.log(node.nodeValue);
        obj['nodeType'] = _type;
        obj['nodeName'] = undefined;
        obj['attr'] = undefined;
        obj['value'] = node.nodeValue;
    }
    return obj;
}


// 解析对象->DOM树
function parseObjToDom(obj) {
    let _attr = obj.attr,
        _children = obj.children,
        _nodeName = obj.nodeName,
        _nodeType = obj.nodeType,
        _value = obj.value;

    if (_nodeType === 1) {
        let _node = document.createElement(_nodeName);
        let _keys = Object.keys(_attr);
        _keys.forEach(key => {
            _node.setAttribute(key, _attr[key]);
        });

        if (_children.length > 0) {
            _children.forEach(item => {
                _node.appendChild(parseObjToDom(item));
            })
        }
        return _node;

    } else if (_nodeType === 3) {
        return document.createTextNode(_value);
    }
}

let root = document.querySelector("#root");
let parent = root.parentNode;
console.log(parent);
// console.log(root.parentElement);
// console.log(generateDomToObj(root));
let obj = generateDomToObj(root);
console.log(obj);

console.log(parseObjToDom(obj));
// console.log(document.querySelector("body").appendChild(parseObjToDom(obj)));

// let p = document.createElement('p');
// let t = document.createTextNode("text");
// insertAfter(p, root);

// 在目标元素后面插入元素
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {//目标元素是最后一个元素
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

//
function addLoadEvent(func) {
    var oldOnload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldOnload();
            func();
        }
    }
}
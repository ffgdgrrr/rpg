import { sys, UITransform } from 'cc';
import { _decorator, Component, Node, Prefab, resources, instantiate, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bag')
export class bag extends Component {

    lnventory: string[] = []
    start() {
        this.load()
    }

    update(deltaTime: number) {
        this.traverseChildren()
    }
    add(InResourcesName: string) {
        console.log(InResourcesName)
        resources.load('mezi/' + InResourcesName, Prefab, (err, res) => {
            console.log(err)
            let prefab = instantiate(res)
            prefab.setParent(this.node)
            console.log(prefab.name)
            if (this.node.children.length > 7) {
                this.node.getComponent(UITransform).width = this.node.children.length * 128 + 64
            }

        })
    }
    alignHorizontal() {
        this.node.children.forEach((element, index) => {
            element.setPosition(index * 128 + 64, 0, 0)
        })
    }
    checkHas(meziName: string, count: number = 1): boolean {
        let foundCount = 0; // 用于计数找到的物品数量
        this.lnventory.forEach(element => {
            if (meziName === element) {
                foundCount++; // 发现一个匹配的物品，计数加一
            }
        });
        return foundCount >= count; // 检查找到的数量是否满足最小数量要求
    }
    delete(childrenName: string, parentPath?: string, func?: Function) {
        for (let child of this.node.children) {
            if (child.name == childrenName) {
                if (parentPath) {
                    child.setParent(find(parentPath))
                    find(parentPath + '/' + childrenName).setPosition(0, 0, 0)
                } else {
                    child.destroy()
                }
                break
            }
        }
        console.log(this.node.children.length)
    }
    onDestroy() {

    }
    traverseChildren() {
        this.lnventory = []
        if (this.node.children.length != 0) {
            for (let i = 0; i < this.node.children.length; i++) {
                this.lnventory.push(this.node.children[i].name)
            }
        }
      
        sys.localStorage.setItem('lnventory', JSON.stringify(this.lnventory))
    }
    setDefultPos() {
        for (let children of this.node.children) {
            children.setParent(this.node.parent)
            children.setParent(this.node)
        }
    }
    load() {
        if (sys.localStorage.getItem('lnventory')) {
            let lnventory: string[] = Object.assign(new Array(), JSON.parse(sys.localStorage.getItem('lnventory')))
            console.log(lnventory)
            for (let i = 0; i < lnventory.length; i++) {
                this.add(lnventory[i])
            }
        }

    }
}



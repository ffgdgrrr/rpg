import { find } from 'cc';
import { resources, Prefab, instantiate } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { bag } from '../inventory/script/bag';
import { Button } from 'cc';
const { ccclass, property } = _decorator;
export let foodList:Map<string,string[][]>=new Map([
    ["土豆炒番茄",[["Tomato","Tomato","Potato","Potato"],["Tomato","Tomato","Tomato","Potato"],["Tomato","Potato","Potato","Potato"]]],
    ["番茄汤",[["Tomato","Tomato","Tomato","Tomato"]]],
    ["炸薯片",[["Potato","Potato","Potato","Potato"]]],
])
@ccclass('foodMake')
export class foodMake extends Component {
    @property(Node)
    烹饪队列:Node=null!
    @property(Node)
    windows:Node=null!
    start() {
      this.checkCanMakeFood()
    }
    checkCanMakeFood(){
      let foodArray:string[]=[];
        this.windows.children.forEach((element,i)=>{
          if(element.children[0]){
            foodArray.push(element.children[0].name)
          }
            
      })
      if(foodArray.length>=4){
        this.node.getComponent(Button).interactable=true
      }else{
        this.node.getComponent(Button).interactable=false
      }
    }
    makeFood(){
        function isArrayEqual(arr1: any[], arr2: any[]): boolean {
            if (arr1.length !== arr2.length) {
              return false;
            }
          
            const sortedArr1 = arr1.slice().sort();
            const sortedArr2 = arr2.slice().sort();
          
            for (let i = 0; i < arr1.length; i++) {
              if (sortedArr1[i] !== sortedArr2[i]) {
                return false;
              }
            }
          
            return true;
          }
        let foodArray:string[]=[];
        this.windows.children.forEach((element,i)=>{
            foodArray.push(element.children[0].name)
              let _name=element.children[0].name
              this.scheduleOnce(()=>{
                find('Canvas/Camera/bag/view/content').getComponent(bag).delete(_name)
              },0.1*i)
            
            console.log(element.children[0].name,'baggg')
            element.destroyAllChildren()
        })
        console.log(foodList,foodArray)
        foodList.forEach((value,key)=>{
          value.forEach(element2=>{
            if(isArrayEqual(foodArray,element2)==true){
              resources.load('mezi/'+key,Prefab,(err,res)=>{
                let prefab=instantiate(res)
                prefab.setParent(this.烹饪队列)
                console.log(prefab.name)
            })
            }
          })
            
        })
    }
    update(deltaTime: number) {
        
    }
}



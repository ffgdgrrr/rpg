import { director } from 'cc';
import { find } from 'cc';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { scoreBoard } from './scoreBoard';
const { ccclass, property } = _decorator;

@ccclass('wordLength')
export class wordLength extends Component {
    wordLength:number=0
    start() {

    }
    addWord(word:number){
        this.wordLength+=word
        this.node.getComponent(Label).string=this.wordLength+"字"
        if(this.wordLength>=800){
            director.loadScene('home_3floor_ghmRoom-停学_写完了')
            let array:{}={}
            find('Canvas/scoreBoard').children.forEach(element=>{
                array[element.name]=element.children[0].getComponent(Label).string
            })
            window.localStorage.setItem('做文章',JSON.stringify(array))
            console.log(JSON.parse(window.localStorage.getItem('做文章')))
        }
    }

    update(deltaTime: number) {
        
    }
}



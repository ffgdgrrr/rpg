import { instantiate } from 'cc';
import { Label } from 'cc';
import { Prefab } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { move } from './move';
import { UITransform } from 'cc';
import { color } from 'cc';
import { tangmian } from './tangmian';
import { find } from 'cc';
import { director } from 'cc';
import { CCString } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('wordContorl')
export class wordContorl extends Component {
    nowIndex:number=0
    once:boolean=true
    @property(Node)
    Player:Node=null!
    @property({type:CCString})
    texts:String[]=[]
    @property(Prefab)
    word:Prefab=null!
    wordArray:string[]=[]
    start() {
        
        this.generateWord()
        this.addEvent()
    }

    generateWord(){
        let wordArray:string[]=[]
        for(let j=0;j<this.nowIndex+1;j++){
        for(let i=0;i<this.texts[j].length;i++){
            if(this.texts[j][i]=='"'){
            }else{
                wordArray.push(this.texts[j][i])
            }
        }
    }
        wordArray.forEach(element=>{
            let word=instantiate(this.word)
            word.name=element
            word.getComponent(Label).string=element
            word.setParent(this.node)
            if(this.once==true){
                this.Player.getComponent(move).distance.x=word.getComponent(UITransform).contentSize.x
                this.Player.getComponent(move).distance.y=word.getComponent(UITransform).contentSize.y
                this.once=false
            }
            
        })
        this.wordArray=wordArray
    }
    addEvent(){
        let addEventFunc=(start:number,end:number,tag:string)=>{
            console.log(tag)
            let wordArray:string[]=[]
            wordArray=this.wordArray
        for(let i=0;i<wordArray.length;i++){
            if(i>=start&&i<end){
                this.node.children[i].getComponent(Label).color=color(255,0,0,255)
                let tangmianScript=this.node.children[i].getComponent(tangmian)
                tangmianScript.startPos=start
                tangmianScript.endPos=end
                tangmianScript.tag=tag
                switch(tag){
                    case "举报":
                        tangmianScript.caseFunc=()=>{
                            director.loadScene('ThrowQuestion_举报')
                        }
                        break
                    case "ｘｐ":
                        tangmianScript.caseFunc=()=>{
                            director.loadScene('ThrowQuestion_ｘｐ')
                        }
                        break
                }
            }
        }
        }
        let count = 0;
        let quotesPositions:number[][] = []; // 最终的数组，存储每对引号的位置
    let texts:string[]=[]
for (let i = 0; i < this.nowIndex + 1; i++) {
    texts=texts.concat(this.texts[i].split(''));
    console.log(texts)
}
console.log((texts+'texts'))
    let tempArray:number[] = []; // 临时数组，存储当前字符串中每对引号的位置
    texts.forEach((element, index) => {
        if (element == '"') {
            console.log('找到第' + (index - count) + '个位置的"');
            tempArray.push(index - count); // 记录引号的位置
            count++;
        }
        if (tempArray.length === 2) {
            let tag=''
            console.log(this.wordArray)
            this.wordArray.forEach((element,index)=>{
                if(index>=tempArray[0]&&index<tempArray[1]){
                    tag+=element
                }
            })
            quotesPositions.push(tempArray);
            addEventFunc(tempArray[0],tempArray[1],tag)
            tempArray.length=0
        }
    });
    // 检查临时数组中是否有两个位置，如果有则添加到最终数组中
    
console.log(quotesPositions,"位置")
        
        // while (true) {
        //     start = s.indexOf('"', start);
        //     if (start === -1) {
        //         break;
        //     }
        //     const end: number = s.indexOf('"', start + 1);
        //     if (end === -1) {
        //         break;
        //     }
        //     const content: string = s.substring(start + 1, end);
        //     console.log(`被""包裹的内容是：${content}，起始位置为：${start}，结束位置为：${end-2}`);
        //     addEventFunc(start,end-2,content)
        //     start = end + 1;
        // }

        
        // let moveScript=this.Player.getComponent(move)
        // moveScript.event.set(tag,[start,end])
    }
    update(deltaTime: number) {
        
    }
}



import { director } from 'cc';
import { Director } from 'cc';
import { find } from 'cc';
import { instantiate } from 'cc';
import { Prefab } from 'cc';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('time')
export class time extends Component {
    @property({ type:Prefab })
    timeLabel: Prefab = null; // 用于显示时间的 Label 组件

    private timeElapsed: number = 0; // 已经过的游戏时间
    private gameTimePerDay: number = 15 * 60; // 游戏中一天的时间（秒）
    timeLabelNode: Node;
    days:number=0
    start() {
        director.addPersistRootNode(this.node)
        this.schedule(this.updateTime, 1); // 每秒更新游戏时间
    }

    updateTime() {
        this.timeElapsed += 1; // 模拟游戏时间流逝
        if (this.timeElapsed >= this.gameTimePerDay) {
            this.timeElapsed = 0; // 一天结束，重置时间
            this.days++
        }
        this.updateTimeLabel(); // 更新显示时间的 Label
    }

    updateTimeLabel() {
        const minutes = Math.floor(this.timeElapsed / 60);
        const seconds = this.timeElapsed % 60;
        this.timeLabelNode.getComponent(Label).string = '第'+this.days+'天'+`${this.padZero(minutes)}:${this.padZero(seconds)}`; // 格式化时间为 MM:SS 的形式
    }
    currentScene(){
        this.timeLabelNode=instantiate(this.timeLabel)
        this.timeLabelNode.setParent(find('Canvas/Camera'))
        this.timeLabelNode.setPosition(-600,0,0)
    }
    protected onLoad(): void {
        let timeData:number[]= JSON.parse(sys.localStorage.getItem("time"))
        if(timeData){
            this.days=timeData[0]
            this.timeElapsed=timeData[1]
        }
        
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH,this.currentScene,this)
    }
    protected onDestroy(): void {
        sys.localStorage.setItem("time",JSON.stringify([this.days,this.timeElapsed]))
        director.off(Director.EVENT_AFTER_SCENE_LAUNCH,this.currentScene,this)
    }
    padZero(num: number): string {
        return num < 10 ? '0' + num : num.toString(); // 补零函数，确保时间格式为两位数
    }
}



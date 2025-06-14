import { _decorator, Component, Director, director, Enum, EventKeyboard, find, input, Input, instantiate, Node, Prefab, Sprite, sys } from 'cc';
import { Vec3 } from 'cc';
import { stateUI } from '../tools/状态栏/stateUI';
import { bag } from '../tools/inventory/script/bag';
const { ccclass, property } = _decorator;
export enum StateType{
    心情,
    睡眠,
    饱食,
    理智,
    金钱,
}


@ccclass('settingData')
export class settingData extends Component {
    @property(Prefab)
    SceneContorl:Prefab=null
    @property(Prefab)
    saveOrRead:Prefab=null!
    金钱:number=0
    心情:number=50
    睡眠:number=50
    饱食:number=50
    理智:number=100
    @property(Prefab)
    Loading:Prefab=null!
    @property(Prefab)
    StateUI:Prefab=null!
    @property(Prefab)
    bag:Prefab=null!
    NodeData:Map<string, [Vec3, boolean]> = new Map();

    saveScene() {
        
        this.instantiateLoading()
    }
    loadScene(sceneName: string) {
        console.log(sceneName);
        if (director.getScene().name === sceneName) {
            if (sys.localStorage.getItem(sceneName)) {
                console.log('loadScene', sceneName);
                let sceneData: Map<string, [Vec3, boolean]> = new Map(JSON.parse(sys.localStorage.getItem(sceneName)));
                sceneData.forEach((value, key: string) => {
                    let node = find(key);
                    if (node) {
                        if(node.getPathInHierarchy()!='Canvas/2.5d/Player/!'){
                            node.position = value[0];
                        node.active = value[1];
                        }
                        
                    }
                });
    
                // 检查删除的节点信息并同步操作
                this.syncDeletedNodes(sceneData);
            }
        }
    }
    syncDeletedNodes(sceneData: Map<string, [Vec3, boolean]>) {
        // 通过比较保存的节点信息和当前场景节点信息来检查删除的节点
        let currentSceneNodes = new Map();
        let root = find('Canvas');
        this.traverseNodeForSync(root, currentSceneNodes);
    
        // 检查在保存的场景中不存在，但在当前场景中存在的节点，并进行同步删除操作
        currentSceneNodes.forEach((value, key: string) => {
            if (!sceneData.has(key)) {
                // 节点在保存的场景中不存在，但在当前场景中存在，进行同步删除操作
                let nodeToDelete = find(key);
                if (nodeToDelete) {
                    nodeToDelete.active=false
                }
            }
        });
    }
    
    
    traverseNodeForSync(node: Node, nodeMap: Map<string, boolean>) {
        if (node) {
            nodeMap.set(node.getPathInHierarchy(), true);
            let children = node.children;
            for (let i = 0; i < children.length; i++) {
                this.traverseNodeForSync(children[i], nodeMap);
            }
        }
    }
    traverseNode(node: Node) {
        if (node) {
            this.NodeData.set(node.getPathInHierarchy(), [node.position, node.active]);
            let children = node.children;
            for (let i = 0; i < children.length; i++) {
                this.traverseNode(children[i]);
            }
        }
    }
    start() {
        
        if(sys.localStorage.getItem('金钱')){
            this.金钱=JSON.parse(sys.localStorage.getItem('金钱'))
        }else{
            sys.localStorage.setItem('金钱',JSON.stringify(this.金钱))
        }
        if(sys.localStorage.getItem('心情')){
            this.心情=JSON.parse(sys.localStorage.getItem('心情'))
            console.log(sys.localStorage.getItem('心情'))
        }else{
            sys.localStorage.setItem('心情',JSON.stringify(this.心情))
        }
        if(sys.localStorage.getItem('理智')){
            this.理智=JSON.parse(sys.localStorage.getItem('理智'))
        }else{
            sys.localStorage.setItem('理智',JSON.stringify(this.理智))
        }
        if(sys.localStorage.getItem('睡眠')){
            this.睡眠=JSON.parse(sys.localStorage.getItem('睡眠'))
        }else{
            sys.localStorage.setItem('睡眠',JSON.stringify(this.睡眠))
        }
        if(sys.localStorage.getItem('饱食')){
            this.饱食=JSON.parse(sys.localStorage.getItem('饱食'))
        }else{
            sys.localStorage.setItem('饱食',JSON.stringify(this.饱食))
        }
        
        this.schedule(()=>{
            this.changeStateValue(StateType.睡眠,-1)
            this.changeStateValue(StateType.饱食,-3)
            console.log(this.饱食,'dududu')
        },15)
        this.changeStateValue(StateType.心情,0)
        this.instantiateBag()
        this.instantiateStateUI()
        director.addPersistRootNode(this.node)
        this.currentScene()
    }
    onLoad () {
        director.on(Director.EVENT_BEFORE_SCENE_LOADING,this.saveScene,this)
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH,this.currentScene,this)
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    instantiateBag(){
        let saveOrRead=instantiate(this.saveOrRead)
        saveOrRead.setParent(find('Canvas'))
        let camera=find('Canvas/Camera')
        saveOrRead.setPosition(camera.position.x,camera.position.y)
        let bagNode=instantiate(this.bag)
        bagNode.setParent(find('Canvas/Camera'))
        bagNode.setPosition(0,256)
        bagNode.active=false
        let sceneContorl=instantiate(this.SceneContorl)
        sceneContorl.setParent(find('Canvas'))
        sceneContorl.setPosition(0,-450)

        
        //bagNode.getComponent(bag).add('foodCard')
    }
    instantiateLoading(){
        let loadingNode=instantiate(this.Loading)
        loadingNode.setParent(find('Canvas/Camera'))
        loadingNode.setPosition(0,0)
        //bagNode.getComponent(bag).add('foodCard')
    }
    instantiateStateUI(){
        let StateUINode=instantiate(this.StateUI)
        StateUINode.setParent(find('Canvas/Camera'))
        StateUINode.setPosition(-619,318)
    }
    changeStateValue(type:StateType,value:number){
        switch(type){
            case StateType.心情:
                if(this.心情>0&&this.心情<=100){
                    this.心情+=value
                }
                if(this.心情<=0){
                    this.心情=1
                }else if(this.心情>100){
                    this.心情=100
                }
                break
            case StateType.理智:
                if(this.理智>0&&this.理智<=100){
                    this.理智+=value
                }
                if(this.理智<=0){
                    this.理智=1
                }else if(this.理智>100){
                    this.理智=100
                }
                break
            case StateType.睡眠:
                if(this.睡眠>0&&this.睡眠<=100){
                    this.睡眠+=value
                }
                if(this.睡眠<=0){
                    this.睡眠=1
                }else if(this.睡眠>100){
                    this.睡眠=100
                }
                break
            case StateType.饱食:
                if(this.饱食>0&&this.饱食<=100){
                    this.饱食+=value
                }
                if(this.饱食<=0){
                    this.饱食=1
                }else if(this.饱食>100){
                    this.饱食=100
                }
                break
            case StateType.金钱:
                this.金钱+=value
                break
        }
        
        if(find('Canvas/Camera/状态UI')){
            let 状态UI=find('Canvas/Camera/状态UI').getComponent(stateUI)
        console.log(状态UI)
        状态UI.心情.progress=this.心情/100
        状态UI.理智.progress=this.理智/100
        状态UI.睡眠.progress=this.睡眠/100
        状态UI.饱食.progress=this.饱食/100
        状态UI.人民币.string='人民币：'+this.金钱+'元'
        }
        sys.localStorage.setItem('心情',JSON.stringify(this.心情))
        sys.localStorage.setItem('理智',JSON.stringify(this.理智))
        sys.localStorage.setItem('睡眠',JSON.stringify(this.睡眠))
        sys.localStorage.setItem('饱食',JSON.stringify(this.饱食))
        sys.localStorage.setItem('金钱',JSON.stringify(this.金钱))
        console.log(this.饱食)
       

    }
    currentScene(){
        // this.心情=JSON.parse(sys.localStorage.getItem('心情'))
        // this.理智=JSON.parse(sys.localStorage.getItem('理智'))
        // this.睡眠=JSON.parse(sys.localStorage.getItem('睡眠'))
        // this.饱食=JSON.parse(sys.localStorage.getItem('饱食'))
        this.scheduleOnce(()=>{
            this.changeStateValue(StateType.心情,0)
        },1)
        if (sys.localStorage.getItem('openState')) {
        const openState:boolean=JSON.parse(sys.localStorage.getItem('openState'))
        if(openState==true){
            this.instantiateStateUI()
        }
    }
        this.instantiateBag()
        const currentScene = director.getScene();
        const currentSceneName = currentScene?.name;
        if(currentSceneName!='End'&&currentSceneName!='setting'&&currentSceneName!='startMenu'){
            sys.localStorage.setItem('currentScene',currentSceneName)
            const autoSave:boolean=JSON.parse(sys.localStorage.getItem('autoSave'))
            if(autoSave==true){
                sys.localStorage.setItem('SaveScene',currentSceneName)
            }
        } 
        console.log(currentSceneName)
            console.log(this.node.name+sys.localStorage.getItem('currentScene'))
    }
    onDestroy () {
        director.off(Director.EVENT_BEFORE_SCENE_LOADING,this.saveScene,this)
        director.off(Director.EVENT_AFTER_SCENE_LAUNCH,this.currentScene,this)
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case parseInt(sys.localStorage.getItem('esc')):
                director.loadScene('setting')
                break
            case parseInt(sys.localStorage.getItem('save')):
               
                let sr=find('Canvas/readAndSaveNode')
                if(sr.active==true){
                    sr.active=false
                }else if(sr.active==false){
                    sr.active=true
                    let camera=find('Canvas/Camera')
                    sr.setPosition(camera.position.x,camera.position.y)
                }
                //sys.localStorage.setItem('SaveScene',director.getScene().name)
                break
            case parseInt(sys.localStorage.getItem('inventory')):
                if(find('Canvas/Camera/bag').active==false){
                    find('Canvas/Camera/bag').active=true
                }else if(find('Canvas/Camera/bag').active==true){
                    console.log('asd')
                    find('Canvas/Camera/bag').active=false
                    console.log(find('Canvas/Camera/bag'))
                }
                
                break
        }        
    }
    update(deltaTime: number) {
        
    }
}



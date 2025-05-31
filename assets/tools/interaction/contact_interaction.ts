import { Collider2D, Contact2DType } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { interaction, interactionEvent } from './interaction';
import { Enum } from 'cc';
import { dialogLocalData } from '../本地存储/dialogLocal';
const { ccclass, property } = _decorator;
enum contactType {
    onBeginContact,
    onEndContact,
}
Enum(contactType)
@ccclass('contact_interaction')
export class contact_interaction extends interaction {
    @property({ type: contactType })
    contactType: contactType = contactType.onBeginContact
    contact: boolean = false

    onLoad() {
        if (this.voidOnce == true && true == dialogLocalData.getSysLocalAboutDialogDOM(this.node.uuid)) {
            this.interactionEvent = interactionEvent.NONE
            console.log('NONE')
        }
    }
    start() {
        let collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this)
        }
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        if (otherCollider.node) {
            if (otherCollider.node?.name == 'Player') {
                this.Contact = true
            }
        }

    }
    interactionContactFunction(): void {
        super.interactionContactFunction()
    }
    set Contact(value: boolean) {
        if (this.contact != value) {
            this.contact = value
            if (value == true && this.contactType == contactType.onBeginContact) {
                this.interactionContactFunction()
            } else if (value == false && this.contactType == contactType.onEndContact) {
                this.interactionContactFunction()
            }
        }

    }
    get Contact() {
        return this.contact
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        if (otherCollider.node) {
            if (otherCollider.node?.name == 'Player') {
                this.Contact = false
            }
        }
    }
    update(deltaTime: number) {

    }
}



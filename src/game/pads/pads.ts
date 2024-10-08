import { BaseObject } from "../../utils/baseObject";
import { ThreeScene } from "../../utils/three/threeScene";
import { PadData } from "../gameface/gameLogic";
import { Pad } from "./pad";



export class Pads extends BaseObject
{
    public padHeight: number = 0.2;
    
    public get pads() { return this._pads; };
    public get numOfPads() { return this._pads.length; };

    private _pads: Pad[] = [];
    
    public addPad(x: number, y: number, z: number, padData: PadData)
    {
        const scene = ThreeScene.Instance;

        const box = scene.third.add.box({width: 0.1, height: 0.1, depth: 0.1});
        const object = ThreeScene.addPhaser3DObject(box);
        object.name = "Pad " + this._pads.length;
        box.position.set(x, y, z);

        const pad = new Pad(padData, object);
        this._pads.push(pad);

        return pad;
    }

    public getPad(index: number)
    {
        const pad = this._pads[index];

        if(pad == undefined)
        {
            console.error("Could not find pad " + index);
            return undefined;
        }

        return pad;
    }

    public update(delta: number)
    {
        for(const pad of this._pads)
        {
            pad.update(delta);
        }
    }

    public getPadDragging()
    {
        for(const pad of this._pads)
        {
            if(pad.draggingNote) return pad;
        }
        return undefined;
    }

    public isAnyPadDragging()
    {
        return this.getPadDragging() != undefined;
    }
}
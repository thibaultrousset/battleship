import {Boat} from "../classes/boat";
import{Map} from "../classes/map";


export class Player {
    id: number;
    map2= new Map(
        [
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        ]
    );
    map1=new Map(
        [
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        ]
    );
    

    fleat: Array<Boat> ;
    constructor(id: number, fleat: Array<Boat>) {
        this.id=id;
        this.fleat=fleat
    }

    boatPlacement(){
        for (let j = 0; j < this.fleat.length; j++) {// methode placement bateux
            
            for (let i = 0; i < this.fleat[j].length; i++) {
                if (this.fleat[j].orientation==="d") {
                    this.map1.map[this.fleat[j].Y][this.fleat[j].X]=1;
                    this.fleat[j].Y+=1; 
                } else if (this.fleat[j].orientation==="u") {
                    this.map1.map[this.fleat[j].Y][this.fleat[j].X]=1;
                    this.fleat[j].Y-=1; 
                } else if (this.fleat[j].orientation==="l") {
                    this.map1.map[this.fleat[j].Y][this.fleat[j].X]=1;
                    this.fleat[j].X-=1; 
                } else if (this.fleat[j].orientation==="r") {
                    this.map1.map[this.fleat[j].Y][this.fleat[j].X]=1;
                    this.fleat[j].X+=1; 
                }
               
            }
            
        
        }
    }
    
}

export class HumanPlayer extends Player {
    shoot(Player,Y,X){ 
        let message="";
        if (Player.map1.map[Y][X]===1) {
          Player.map1.map[Y][X]=8;
          this.map2.map[Y][X]=7;
          message="touch";
      }else{
          this.map2.map[Y][X]=3;
          message="plouf";
      }
      console.log(this.map2.map);
      console.log(message);
    }
}

export class AI extends Player {
    message="";
    X;
    Y;
    kye=false;//know your enemy
    nu=false;//not up
    nd=false;//not down
    nl=false;//not left
    inARow=false;//continue to shoot in this direction
    
    shoot(Player){ 
        if (this.nd==true) {
            this.X+=1;
            this.Y-=1
        } else if(this.nl==true){
            this.X+=1;
            this.Y+=1
        } else if(this.nu==true){
            this.Y+=1;
            this.X-=1
        } else if(this.kye==true) {
            this.Y-=1
        } else {
            this.Y=Math.floor(Math.random()*10);

            this.X=Math.floor(Math.random()*10); 
            
        }
        if (Player.map1.map[this.Y][this.X]===1) {
            Player.map1.map[this.Y][this.X]=8;
            this.map2.map[this.Y][this.X]=7;
            this.message="touch";
            this.kye=true;
            
        }else{
            this.map2.map[this.Y][this.X]=3;
            this.message="plouf";
            if (this.kye==true) {
                this.nu=true;
            }else if(this.nu==true){
                this.nl=true;
            }else if(this.nl==true){
                this.nd=true;
            }
          }
        console.log(this.message);
        console.log(this.map2.map);
    }
    
}

let croiseur=new Boat(0,1,4,"r");

let sousmarin2=new Boat(5,3,2,"u");

let porteavion=new Boat(4,5,5,"r");

let torpilleur=new Boat(8,4,3,"l");

let sousmarin1=new Boat(7,7,2,"d");

let croiseur2=new Boat(5,1,4,"r");

let sousmarin4=new Boat(4,3,2,"u");

let porteavion2=new Boat(2,5,5,"r");

let torpilleur2=new Boat(9,4,3,"l");

let sousmarin3=new Boat(6,7,2,"d");

let fleat=[croiseur, sousmarin2, porteavion, torpilleur, sousmarin1];
let fleat2=[croiseur2, sousmarin4, porteavion2, torpilleur2, sousmarin3];




export let player1 = new HumanPlayer(1,fleat);

export let player2 = new AI(2,fleat2);

player1.boatPlacement();

player2.boatPlacement();

 
/*
 * We need to create a readline interface.
 * The interface takes 2 streams.
 * The input field points to the readable input stream
 * and the output field to the writable output stream. 
 */


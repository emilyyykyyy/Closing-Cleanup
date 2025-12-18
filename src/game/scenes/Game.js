import { Scene } from 'phaser';

export class Game extends Scene
{

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x808080);

        this.add.image(512, 384, 'bg-cafe');
        
        this.add.rectangle(100, 500, 250, 250, 0xfffffff, 1.0);

        this.add.text(100, 500, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial', fontSize: 20, color: '#000000',
            align: 'left'
        }).setOrigin(0.5);
        
        /*
        const spill = this.add.sprite(150, 350, 'spill').setInteractive();

        spill.on('pointerdown', function (pointer) {
            this.setAlpha(0.0);
        });*/

        /*this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });*/
    }
}

import { Scene } from 'phaser';

export class BadEnd extends Scene
{
    constructor ()
    {
        super('BadEnd');
    }

    init(data) {
        this.completeTasks = data.completeTasks;
    }

    create ()
    {
        ///////// Create SFX /////////
        this.sound.add('completion-sound').play();

        this.input.enabled = false; // Initially let the scene transition before allowing user to move to next scene

        let tint = this.add.rectangle(512,384,1024,768,0xffffff, 0.4).setOrigin(0.5).setAlpha(0); // White tint over entire screen
        let finishText = this.add.text(512, 384, 'Finish!', {
            fontFamily: 'qtpi', fontSize: 120, fontStyle:'bold', color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setAlpha(0);
        let instructionText = this.add.text(512, 474, 'Click to continue', {
            fontFamily: 'qtpi', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center',
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: [tint, finishText, instructionText],
            alpha: {from: 0, to: 1},
            duration: 500,
            ease: 'Sine.easeIn',
            onComplete:  () => {
                this.input.enabled = true;
            }
        })

        this.input.once('pointerdown', () => {
            this.input.enabled = false;
            this.scene.stop('Game'); // Remove Game

            this.cameras.main.fadeOut(250);
            this.cameras.main.once('camerafadeincomplete', () => {
                if (this.completeTasks == true) {
                    this.scene.start('GoodEnd');
                }
                else {
                    this.scene.start('BadEnd');
                }
            });
        });
    }
}

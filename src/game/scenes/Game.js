import { Scene } from 'phaser';

export class Game extends Scene
{

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // Create background
        this.cameras.main.setBackgroundColor(0x808080);
        this.add.image(512, 384, 'bg-cafe');



        // Create SFX
        let floorSFX = this.sound.add('floor-sweep');
        let tableSFX = this.sound.add('table-wipe');
        let dishSFX = this.sound.add('dish-clink');
        let windowSFX = this.sound.add('window-wipe');



        // Create todo board
        this.add.image(53, 554, 'todo-box').setOrigin(0.15, 0.5);

        this.add.text(70, 365, 'TODO:', {
            fontFamily: 'qtpi', fontSize: 60, fontStyle:'bold', color: '#000000',
            letterSpacing: 5,
            align: 'center'
        });

        let todoStyle = {
            fontFamily: 'qtpi', fontSize: 30, color: '#000000',
            lineSpacing: 0.7,
            align: 'left'
        };
        let floorTodo = this.add.text(50, 420, 'Clean up floor\nspills', todoStyle);
        let tableTodo = this.add.text(50, 490, 'Tidy up table\nspills', todoStyle);
        let dishesTodo = this.add.text(50, 560, 'Pick up dirty\ndishes', todoStyle);

        let taskStyle = {
            fontFamily: 'qtpi', fontSize: 25, color: '#ff0000',
            lineSpacing: 0.7,
            align: 'left'
        };

        let floorTextCount = this.add.text(110, 451, '(0/4)', taskStyle);
        let tableTextCount = this.add.text(110, 521, '(0/3)', taskStyle);
        let dishTextCount = this.add.text(125, 593, '(0/3)', taskStyle);




        // Create obstacles
        //// Load images
        let counterspill1 = this.add.sprite(659, 412, 'counterspill1').setInteractive();
        let counterdirtyplate1 = this.add.sprite(685, 427, 'counterdirtyplate1').setInteractive();
        let tablespill1 = this.add.sprite(565, 506, 'tablespill1').setInteractive();
        let tablespill2 = this.add.sprite(377, 414, 'tablespill2').setInteractive();
        let dirtyplate1 = this.add.sprite(744, 528, 'dirtyplate1').setInteractive();
        let dirtyplate2 = this.add.sprite(451, 382, 'dirtyplate2').setInteractive();
        let foodspill1 = this.add.sprite(824, 482, 'foodspill1').setInteractive();
        let foodspill2 = this.add.sprite(489, 551, 'foodspill2').setInteractive();
        let wetspill1 = this.add.sprite(619, 629, 'wetspill1').setInteractive();
        let wetspill2 = this.add.sprite(586, 465, 'wetspill2').setInteractive();

        //// Set click counters and effects for each group
        let floorElementCount = 0;
        let tableElementCount = 0;
        let dishElementCount = 0; 

        //// Set style for completed tasks

        ////// Floor
        const clickFloorElement = function() {
            this.setAlpha(this.alpha - 0.33);
            floorSFX.play();

            if (this.alpha < 0.1) {
                floorElementCount++;
                this.destroy();
                floorTextCount.setText('(' + floorElementCount + '/4)');
            }
        }

        foodspill1.on('pointerdown', clickFloorElement);
        foodspill2.on('pointerdown', clickFloorElement);
        wetspill1.on('pointerdown', clickFloorElement);
        wetspill2.on('pointerdown', clickFloorElement);
        
        ////// Table
        const clickTableElement = function() {
            this.setAlpha(this.alpha - 0.5);
            tableSFX.play();

            if (this.alpha <= 0.0) {
                tableElementCount++;
                this.destroy();
                tableTextCount.setText('(' + tableElementCount + '/3)');
            }
        }
        tablespill1.on('pointerdown', clickTableElement);
        tablespill2.on('pointerdown', clickTableElement);
        counterspill1.on('pointerdown', clickTableElement);

        ////// Dishes
        const clickDishElement = function() {
            dishSFX.play();
            dishElementCount++;
            this.destroy();
            dishTextCount.setText('(' + dishElementCount + '/3)');
        }
        dirtyplate1.on('pointerdown', clickDishElement);
        dirtyplate2.on('pointerdown', clickDishElement);
        counterdirtyplate1.on('pointerdown', clickDishElement);
    }
}

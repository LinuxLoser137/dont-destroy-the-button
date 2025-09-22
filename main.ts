/**
 * To Do List (Intermediate/ Advanced Game)
 * 
 * Step 1)Create Button *Make sure when it moves it stays in the screen*
 * 
 * Step 2)Create Variables *Add Levels, How long do the levels last?, How fast do the lasers go?, How close do the lasers respawn?, What about live counters?
 * 
 * Step 3)Create Background *What do you want your background to look like?*
 * 
 * Step 4)Create the Laser....Create the actual laser and additional Laser Logic *In a logic block add what you want the lasers to do based on the level the player is on*
 * 
 * Step 5)
 */
/**
 * <----------This chunk of code controls:
 * 
 * Step 1
 * 
 * <---------
 */
/**
 * <----- This chunk of code controls what the laser does based on the level for:
 * 
 * Step 5
 * 
 * >>>>These are used in If statements because they only happen if something else happens. 
 * 
 * <----Note that if you want A text bubble to announce a level, you need to add that to your if statement.
 */
/**
 * <--- This chunk of code controls:
 * 
 * Step 6
 * 
 * <-----
 */
// Generate laser image based on level
function getLaserImage (lvl: number) {
    color = 2
    if (lvl == 1) {
        color = 2
    } else if (lvl == 2) {
        color = 4
    } else if (lvl == 3) {
        color = 7
    } else {
        color = 9
    }
    laserHeight = 20 + lvl * 5
    laserWidth = 3 + Math.min(lvl, 5)
    laserImg = image.create(laserWidth, laserHeight)
    for (let x = 0; x <= laserWidth - 1; x++) {
        for (let y = 0; y <= laserHeight - 1; y++) {
            laserImg.setPixel(x, y, color)
        }
    }
    return laserImg
}
// Collision with lasers
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 200)
    info.changeLifeBy(-1)
    if (info.life() <= 0) {
        game.over(false, effects.melt)
    }
})
/**
 * <--- This chunk of code controls chunk of code for:
 * 
 * Step 2
 * 
 * <-------
 */
/**
 * <----- This code piece controls your background for 
 * 
 * Step 3
 */
let laser: Sprite = null
let nextLaserTime = 0
let laserImg: Image = null
let laserWidth = 0
let laserHeight = 0
let color = 0
let level = 0
// Create player button
let Button = sprites.create(assets.image`button`, SpriteKind.Player)
Button.setScale(0.5, ScaleAnchor.Middle)
Button.setStayInScreen(true)
controller.moveSprite(Button)
// Start first level
let levelStartTime = game.runtime()
game.showLongText("Level " + level + "!", DialogLayout.Center)
level = 1
let laserSpeed = 80
let laserSpawnInterval = 2000
// 30 seconds per level
let levelDuration = 30000
// Setup lives and score
info.setLife(3)
// Start score as level 1
info.setScore(level)
// Track game start time
let gameStartTime = game.runtime()
scene.setBackgroundImage(assets.image`background`)
// Main update loop
game.onUpdate(function () {
    // Spawn lasers based on timer
    if (game.runtime() >= nextLaserTime && Math.percentChance(80)) {
        laser = sprites.create(getLaserImage(level), SpriteKind.Enemy)
        laser.setPosition(randint(20, 140), 0)
        laser.vy = laserSpeed
        nextLaserTime = game.runtime() + laserSpawnInterval
    }
    // Level-up every 30 seconds
    if (game.runtime() - levelStartTime >= levelDuration) {
        level += 1
        // Update score to reflect current level
        info.setScore(level)
        laserSpeed += 15
        if (laserSpawnInterval > 800) {
            laserSpawnInterval += 0 - 150
        }
        levelStartTime = game.runtime()
        game.showLongText("Level " + level + "!", DialogLayout.Center)
    }
})

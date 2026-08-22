export type Game = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  tags: string[];
  source: string;
};

export type AppItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
};

// Games served from the seraph GitHub repo via jsDelivr CDN
const SERAPH_CDN = 'https://cdn.jsdelivr.net/gh/a456pur/seraph@main/games';

export const GAMES: Game[] = [
  // Action
  { id: '1v1lol', title: '1v1.LOL', description: 'Build and shoot in this 1v1 battle royale.', url: `${SERAPH_CDN}/1v1lol/index.html`, icon: 'Crosshair', category: 'Action', tags: ['shooter', 'building', 'multiplayer'], source: 'seraph' },
  { id: '10minutestilldawn', title: '10 Minutes Till Dawn', description: 'Survive waves of enemies in this roguelite shooter.', url: `${SERAPH_CDN}/10minutestilldawn/index.html`, icon: 'Skull', category: 'Action', tags: ['survival', 'shooter', 'roguelite'], source: 'seraph' },
  { id: 'ageofwar', title: 'Age of War', description: 'Defend your base through the ages of warfare.', url: `${SERAPH_CDN}/ageofwar/index.html`, icon: 'Swords', category: 'Action', tags: ['strategy', 'defense', 'war'], source: 'seraph' },
  { id: 'ageofwar2', title: 'Age of War 2', description: 'The sequel to the classic Age of War.', url: `${SERAPH_CDN}/ageofwar2/index.html`, icon: 'Swords', category: 'Action', tags: ['strategy', 'defense', 'war'], source: 'seraph' },
  { id: 'amazingropepolice', title: 'Amazing Rope Police', description: 'Swing through the city as a rope police officer.', url: `${SERAPH_CDN}/amazingropepolice/index.html`, icon: 'Shield', category: 'Action', tags: ['open-world', 'action'], source: 'seraph' },
  { id: 'amongus', title: 'Among Us', description: 'Find the impostor among your crew.', url: `${SERAPH_CDN}/amongus/index.html`, icon: 'Users', category: 'Action', tags: ['multiplayer', 'social', 'mystery'], source: 'seraph' },
  { id: 'ballisticchickens', title: 'Ballistic Chickens', description: 'Launch chickens and cause chaos.', url: `${SERAPH_CDN}/ballisticchickens/index.html`, icon: 'Bird', category: 'Action', tags: ['arcade', 'casual'], source: 'seraph' },
  { id: 'battlebeavers', title: 'Battle Beavers', description: 'Fight as beavers in this action game.', url: `${SERAPH_CDN}/battlebeavers/index.html`, icon: 'Swords', category: 'Action', tags: ['action', 'fighting'], source: 'seraph' },
  { id: 'burritobison', title: 'Burrito Bison', description: 'Launch and bounce your way to freedom.', url: `${SERAPH_CDN}/burritobison/index.html`, icon: 'Zap', category: 'Action', tags: ['launch', 'arcade'], source: 'seraph' },
  { id: 'chibiknight', title: 'Chibi Knight', description: 'A tiny knight on a big adventure.', url: `${SERAPH_CDN}/chibiknight/index.html`, icon: 'Sword', category: 'Action', tags: ['rpg', 'adventure'], source: 'seraph' },
  { id: 'clusterrush', title: 'Cluster Rush', description: 'Jump between moving trucks in this fast-paced game.', url: `${SERAPH_CDN}/clusterrush/index.html`, icon: 'Truck', category: 'Action', tags: ['platformer', 'fast-paced'], source: 'seraph' },
  { id: 'crossy', title: 'Crossy Road', description: 'Cross the road without getting hit.', url: `${SERAPH_CDN}/crossy/index.html`, icon: 'Footprints', category: 'Action', tags: ['arcade', 'casual'], source: 'seraph' },
  { id: 'dadish', title: 'Dadish', description: 'A radish dad on a platforming adventure.', url: `${SERAPH_CDN}/dadish/index.html`, icon: 'Sprout', category: 'Action', tags: ['platformer', 'cute'], source: 'seraph' },

  // Arcade
  { id: '2048', title: '2048', description: 'Slide and combine tiles to reach 2048.', url: `${SERAPH_CDN}/2048/index.html`, icon: 'Grid3x3', category: 'Puzzle', tags: ['puzzle', 'logic', 'classic'], source: 'seraph' },
  { id: '3line', title: '3 Line', description: 'Connect lines in this puzzle game.', url: `${SERAPH_CDN}/3line/index.html`, icon: 'Minus', category: 'Puzzle', tags: ['puzzle', 'casual'], source: 'seraph' },
  { id: 'achievementunlocked', title: 'Achievement Unlocked', description: 'Unlock all achievements in this meta game.', url: `${SERAPH_CDN}/achievementunlocked/index.html`, icon: 'Trophy', category: 'Arcade', tags: ['puzzle', 'meta', 'comedy'], source: 'seraph' },
  { id: 'achievementunlocked2', title: 'Achievement Unlocked 2', description: 'More achievements to unlock.', url: `${SERAPH_CDN}/achievementunlocked2/index.html`, icon: 'Trophy', category: 'Arcade', tags: ['puzzle', 'meta', 'comedy'], source: 'seraph' },
  { id: 'achievementunlocked3', title: 'Achievement Unlocked 3', description: 'Even more achievements to unlock.', url: `${SERAPH_CDN}/achievementunlocked3/index.html`, icon: 'Trophy', category: 'Arcade', tags: ['puzzle', 'meta', 'comedy'], source: 'seraph' },
  { id: 'backrooms2d', title: 'Backrooms 2D', description: 'Navigate the eerie backrooms.', url: `${SERAPH_CDN}/backrooms2d/index.html`, icon: 'DoorOpen', category: 'Arcade', tags: ['horror', 'maze'], source: 'seraph' },
  { id: 'balloonrun', title: 'Balloon Run', description: 'Run and float through obstacles.', url: `${SERAPH_CDN}/balloonrun/index.html`, icon: 'Circle', category: 'Arcade', tags: ['runner', 'casual'], source: 'seraph' },
  { id: 'basketbrosio', title: 'BasketBros.io', description: 'Basketball action with friends.', url: `${SERAPH_CDN}/basketbrosio/index.html`, icon: 'Circle', category: 'Arcade', tags: ['sports', 'multiplayer', 'basketball'], source: 'seraph' },
  { id: 'basketrandom', title: 'Basket Random', description: 'Random physics basketball fun.', url: `${SERAPH_CDN}/basketrandom/index.html`, icon: 'Circle', category: 'Arcade', tags: ['sports', 'physics', 'casual'], source: 'seraph' },
  { id: 'bigredbutton', title: 'Big Red Button', description: 'Press the button and see what happens.', url: `${SERAPH_CDN}/bigredbutton/index.html`, icon: 'Circle', category: 'Arcade', tags: ['casual', 'comedy'], source: 'seraph' },
  { id: 'boxingphysics2', title: 'Boxing Physics 2', description: 'Wobbly physics boxing.', url: `${SERAPH_CDN}/boxingphysics2/index.html`, icon: 'Hand', category: 'Arcade', tags: ['physics', 'fighting', 'casual'], source: 'seraph' },
  { id: 'boxingrandom', title: 'Boxing Random', description: 'Random physics boxing matches.', url: `${SERAPH_CDN}/boxingrandom/index.html`, icon: 'Hand', category: 'Arcade', tags: ['physics', 'fighting', 'casual'], source: 'seraph' },
  { id: 'colorswitch', title: 'Color Switch', description: 'Match colors to pass through obstacles.', url: `${SERAPH_CDN}/colorswitch/index.html`, icon: 'Palette', category: 'Arcade', tags: ['arcade', 'casual', 'color'], source: 'seraph' },
  { id: 'cubefield', title: 'Cubefield', description: 'Dodge cubes in a 3D field.', url: `${SERAPH_CDN}/cubefield/index.html`, icon: 'Box', category: 'Arcade', tags: ['3d', 'dodge', 'arcade'], source: 'seraph' },
  { id: 'crazytunnel3d', title: 'Crazy Tunnel 3D', description: 'Speed through a 3D tunnel.', url: `${SERAPH_CDN}/crazytunnel3d/index.html`, icon: 'Circle', category: 'Arcade', tags: ['3d', 'racing', 'tunnel'], source: 'seraph' },

  // Puzzle
  { id: 'battleships', title: 'Battleships', description: 'Sink the enemy fleet.', url: `${SERAPH_CDN}/battleships/index.html`, icon: 'Ship', category: 'Puzzle', tags: ['strategy', 'classic'], source: 'seraph' },
  { id: 'bloxors', title: 'Bloxorz', description: 'Roll the block to the exit.', url: `${SERAPH_CDN}/bloxors/index.html`, icon: 'Box', category: 'Puzzle', tags: ['puzzle', 'logic'], source: 'seraph' },
  { id: 'bubblespinner', title: 'Bubble Spinner', description: 'Match and pop spinning bubbles.', url: `${SERAPH_CDN}/bubblespinner/index.html`, icon: 'Circle', category: 'Puzzle', tags: ['bubble', 'match', 'casual'], source: 'seraph' },
  { id: 'bubbletanks2', title: 'Bubble Tanks 2', description: 'Upgrade your tank in bubble worlds.', url: `${SERAPH_CDN}/bubbletanks2/index.html`, icon: 'Circle', category: 'Puzzle', tags: ['strategy', 'upgrade'], source: 'seraph' },
  { id: 'cellmachine', title: 'Cell Machine', description: 'Arrange cells to solve puzzles.', url: `${SERAPH_CDN}/cellmachine/index.html`, icon: 'Grid2x2', category: 'Puzzle', tags: ['puzzle', 'logic', 'cells'], source: 'seraph' },
  { id: 'chess', title: 'Chess', description: 'The timeless strategy game.', url: `${SERAPH_CDN}/chess/index.html`, icon: 'Crown', category: 'Strategy', tags: ['strategy', 'classic', 'board'], source: 'seraph' },
  { id: 'connect4', title: 'Connect 4', description: 'Get four in a row.', url: `${SERAPH_CDN}/connect4/index.html`, icon: 'Circle', category: 'Strategy', tags: ['strategy', 'classic', 'board'], source: 'seraph' },
  { id: 'cuttherope', title: 'Cut the Rope', description: 'Feed the candy to the creature.', url: `${SERAPH_CDN}/cuttherope/index.html`, icon: 'Scissors', category: 'Puzzle', tags: ['physics', 'puzzle', 'casual'], source: 'seraph' },

  // Strategy
  { id: 'advancewars', title: 'Advance Wars', description: 'Turn-based military strategy.', url: `${SERAPH_CDN}/advancewars/index.html`, icon: 'Swords', category: 'Strategy', tags: ['strategy', 'turn-based', 'military'], source: 'seraph' },
  { id: 'advancewars2', title: 'Advance Wars 2', description: 'Black Hole Rising - more turn-based strategy.', url: `${SERAPH_CDN}/advancewars2/index.html`, icon: 'Swords', category: 'Strategy', tags: ['strategy', 'turn-based', 'military'], source: 'seraph' },
  { id: 'btd', title: 'Bloons Tower Defense', description: 'Pop balloons with monkey towers.', url: `${SERAPH_CDN}/btd/index.html`, icon: 'Shield', category: 'Strategy', tags: ['tower-defense', 'strategy', 'monkeys'], source: 'seraph' },
  { id: 'controlcraft2', title: 'Control Craft 2', description: 'Command troops to capture bases.', url: `${SERAPH_CDN}/controlcraft2/index.html`, icon: 'Swords', category: 'Strategy', tags: ['strategy', 'rts'], source: 'seraph' },
  { id: 'corporationinc', title: 'Corporation Inc', description: 'Build and manage your corporation.', url: `${SERAPH_CDN}/corporationinc/index.html`, icon: 'Building2', category: 'Strategy', tags: ['management', 'tycoon'], source: 'seraph' },
  { id: 'crushthecastle', title: 'Crush the Castle', description: 'Destroy castles with your trebuchet.', url: `${SERAPH_CDN}/crushthecastle/index.html`, icon: 'Castle', category: 'Strategy', tags: ['physics', 'siege'], source: 'seraph' },
  { id: 'crushthecastle2', title: 'Crush the Castle 2', description: 'More castles to crush.', url: `${SERAPH_CDN}/crushthecastle2/index.html`, icon: 'Castle', category: 'Strategy', tags: ['physics', 'siege'], source: 'seraph' },

  // Idle / Clicker
  { id: 'adventurecapitalist', title: 'Adventure Capitalist', description: 'Build your business empire from nothing.', url: `${SERAPH_CDN}/adventurecapitalist/index.html`, icon: 'DollarSign', category: 'Idle', tags: ['idle', 'clicker', 'tycoon'], source: 'seraph' },
  { id: 'clickerheroes', title: 'Clicker Heroes', description: 'Click to defeat monsters and level up heroes.', url: `${SERAPH_CDN}/clickerheroes/index.html`, icon: 'MousePointerClick', category: 'Idle', tags: ['idle', 'clicker', 'rpg'], source: 'seraph' },
  { id: 'cookieclicker', title: 'Cookie Clicker', description: 'The original addictive cookie clicker.', url: `${SERAPH_CDN}/cookieclicker/index.html`, icon: 'Cookie', category: 'Idle', tags: ['idle', 'clicker', 'classic'], source: 'seraph' },
  { id: 'csgoclicker', title: 'CS:GO Clicker', description: 'Click and collect skins.', url: `${SERAPH_CDN}/csgoclicker/index.html`, icon: 'MousePointerClick', category: 'Idle', tags: ['idle', 'clicker'], source: 'seraph' },

  // Adventure / RPG
  { id: 'adofai', title: 'A Dance of Fire and Ice', description: 'Rhythm-based platformer.', url: `${SERAPH_CDN}/adofai/index.html`, icon: 'Music', category: 'Adventure', tags: ['rhythm', 'music', 'platformer'], source: 'seraph' },
  { id: 'adventuretime', title: 'Adventure Time', description: 'Finn and Jake adventures.', url: `${SERAPH_CDN}/adventuretime/index.html`, icon: 'Compass', category: 'Adventure', tags: ['adventure', 'cartoon'], source: 'seraph' },
  { id: 'celeste', title: 'Celeste', description: 'A challenging mountain climbing platformer.', url: `${SERAPH_CDN}/celeste/index.html`, icon: 'Mountain', category: 'Adventure', tags: ['platformer', 'pixel', 'challenging'], source: 'seraph' },
  { id: 'championisland', title: 'Champion Island', description: 'Google Doodle Olympics adventure.', url: `${SERAPH_CDN}/championisland/index.html`, icon: 'Trophy', category: 'Adventure', tags: ['adventure', 'sports', 'rpg'], source: 'seraph' },
  { id: 'crimsonfantasia', title: 'Crimson Fantasia', description: 'A fantasy RPG adventure.', url: `${SERAPH_CDN}/crimsonfantasia/index.html`, icon: 'Sword', category: 'Adventure', tags: ['rpg', 'fantasy'], source: 'seraph' },

  // Sports
  { id: '1on1soccer', title: '1 on 1 Soccer', description: 'Classic 1v1 soccer match.', url: `${SERAPH_CDN}/1on1soccer/index.html`, icon: 'Circle', category: 'Sports', tags: ['sports', 'soccer', 'multiplayer'], source: 'seraph' },
  { id: 'bikechamp', title: 'Bike Champ', description: 'Ride your bike through obstacle courses.', url: `${SERAPH_CDN}/bikechamp/index.html`, icon: 'Bike', category: 'Sports', tags: ['bike', 'physics', 'trials'], source: 'seraph' },
  { id: 'bikechamp2', title: 'Bike Champ 2', description: 'More bike obstacle courses.', url: `${SERAPH_CDN}/bikechamp2/index.html`, icon: 'Bike', category: 'Sports', tags: ['bike', 'physics', 'trials'], source: 'seraph' },
  { id: 'aquaparkslides', title: 'Aquapark Slides', description: 'Race down water park slides.', url: `${SERAPH_CDN}/aquaparkslides/index.html`, icon: 'Waves', category: 'Sports', tags: ['racing', 'water', 'casual'], source: 'seraph' },

  // Retro / Emulated
  { id: 'banjokazooie', title: 'Banjo-Kazooie', description: 'N64 classic adventure platformer.', url: `${SERAPH_CDN}/banjokazooie/index.html`, icon: 'Gamepad2', category: 'Retro', tags: ['n64', 'platformer', 'classic'], source: 'seraph' },
  { id: 'banjotooie', title: 'Banjo-Tooie', description: 'The sequel to Banjo-Kazooie.', url: `${SERAPH_CDN}/banjotooie/index.html`, icon: 'Gamepad2', category: 'Retro', tags: ['n64', 'platformer', 'classic'], source: 'seraph' },
  { id: 'banjopilot', title: 'Banjo Pilot', description: 'Banjo-Kazooie racing game.', url: `${SERAPH_CDN}/banjopilot/index.html`, icon: 'Gamepad2', category: 'Retro', tags: ['gba', 'racing', 'classic'], source: 'seraph' },
  { id: 'bowsersinsidestory', title: 'Bowser\'s Inside Story', description: 'Mario & Luigi RPG adventure.', url: `${SERAPH_CDN}/bowsersinsidestory/index.html`, icon: 'Gamepad2', category: 'Retro', tags: ['nds', 'rpg', 'mario'], source: 'seraph' },
  { id: 'castlevania', title: 'Castlevania', description: 'Classic vampire hunting adventure.', url: `${SERAPH_CDN}/castlevania/index.html`, icon: 'Gamepad2', category: 'Retro', tags: ['nes', 'classic', 'vampire'], source: 'seraph' },
  { id: 'castlevaniaiii', title: 'Castlevania III', description: 'Dracula\'s Curse.', url: `${SERAPH_CDN}/castlevaniaiii/index.html`, icon: 'Gamepad2', category: 'Retro', tags: ['nes', 'classic', 'vampire'], source: 'seraph' },
  { id: 'comixzone', title: 'Comix Zone', description: 'Fight through comic book pages.', url: `${SERAPH_CDN}/comixzone/index.html`, icon: 'BookOpen', category: 'Retro', tags: ['genesis', 'fighting', 'comic'], source: 'seraph' },
  { id: 'contra', title: 'Contra', description: 'Classic run-and-gun action.', url: `${SERAPH_CDN}/contra/index.html`, icon: 'Gamepad2', category: 'Retro', tags: ['nes', 'classic', 'shooter'], source: 'seraph' },
  { id: 'contraiii', title: 'Contra III', description: 'The alien wars.', url: `${SERAPH_CDN}/contraiii/index.html`, icon: 'Gamepad2', category: 'Retro', tags: ['snes', 'classic', 'shooter'], source: 'seraph' },
  { id: 'chronotrigger', title: 'Chrono Trigger', description: 'Time-traveling RPG masterpiece.', url: `${SERAPH_CDN}/chronotrigger/index.html`, icon: 'Clock', category: 'Retro', tags: ['snes', 'rpg', 'classic'], source: 'seraph' },
  { id: 'alteredbeast', title: 'Altered Beast', description: 'Rise from your grave and fight.', url: `${SERAPH_CDN}/alteredbeast/index.html`, icon: 'Gamepad2', category: 'Retro', tags: ['genesis', 'classic', 'action'], source: 'seraph' },
  { id: 'battletoads', title: 'Battletoads', description: 'Classic beat-em-up action.', url: `${SERAPH_CDN}/battletoads/index.html`, icon: 'Gamepad2', category: 'Retro', tags: ['nes', 'classic', 'beat-em-up'], source: 'seraph' },
  { id: 'animalcrossingwildworld', title: 'Animal Crossing: Wild World', description: 'Life simulation classic on DS.', url: `${SERAPH_CDN}/animalcrossingwildworld/index.html`, icon: 'Leaf', category: 'Retro', tags: ['nds', 'simulation', 'classic'], source: 'seraph' },
  { id: 'cookingmama', title: 'Cooking Mama', description: 'Cook meals in this DS classic.', url: `${SERAPH_CDN}/cookingmama/index.html`, icon: 'ChefHat', category: 'Retro', tags: ['nds', 'cooking', 'casual'], source: 'seraph' },
  { id: 'cars2', title: 'Cars 2', description: 'Racing game based on the movie.', url: `${SERAPH_CDN}/cars2/index.html`, icon: 'Car', category: 'Retro', tags: ['racing', 'movie', 'classic'], source: 'seraph' },

  // Nitrome Games
  { id: 'canopy', title: 'Canopy', description: 'Nitrome\'s rope-swinging adventure.', url: `${SERAPH_CDN}/canopy/index.html`, icon: 'Link', category: 'Arcade', tags: ['nitrome', 'arcade', 'platformer'], source: 'seraph' },
  { id: 'cavechaos', title: 'Cave Chaos', description: 'Nitrome cave exploration.', url: `${SERAPH_CDN}/cavechaos/index.html`, icon: 'Mountain', category: 'Arcade', tags: ['nitrome', 'arcade'], source: 'seraph' },
  { id: 'cheesedreams', title: 'Cheese Dreams', description: 'Nitrome cheese-rolling fun.', url: `${SERAPH_CDN}/cheesedreams/index.html`, icon: 'Moon', category: 'Arcade', tags: ['nitrome', 'arcade'], source: 'seraph' },
  { id: 'chisel', title: 'Chisel', description: 'Dig through planets with Nitrome.', url: `${SERAPH_CDN}/chisel/index.html`, icon: 'Drill', category: 'Arcade', tags: ['nitrome', 'arcade'], source: 'seraph' },
  { id: 'chisel2', title: 'Chisel 2', description: 'More planet-drilling Nitrome action.', url: `${SERAPH_CDN}/chisel2/index.html`, icon: 'Drill', category: 'Arcade', tags: ['nitrome', 'arcade'], source: 'seraph' },
  { id: 'changetype', title: 'ChangeType()', description: 'Nitrome puzzle game.', url: `${SERAPH_CDN}/changetype/index.html`, icon: 'Shuffle', category: 'Puzzle', tags: ['nitrome', 'puzzle'], source: 'seraph' },

  // Flipline Games
  { id: 'cactusmccoy', title: 'Cactus McCoy', description: 'A cactus cowboy adventure.', url: `${SERAPH_CDN}/cactusmccoy/index.html`, icon: 'Swords', category: 'Action', tags: ['flipline', 'action', 'western'], source: 'seraph' },
  { id: 'cactusmccoy2', title: 'Cactus McCoy 2', description: 'More cactus cowboy action.', url: `${SERAPH_CDN}/cactusmccoy2/index.html`, icon: 'Swords', category: 'Action', tags: ['flipline', 'action', 'western'], source: 'seraph' },

  // Flash Games
  { id: 'breakingthebank', title: 'Breaking the Bank', description: 'Henry Stickmin classic.', url: `${SERAPH_CDN}/breakingthebank/index.html`, icon: 'Landmark', category: 'Adventure', tags: ['flash', 'classic', 'comedy'], source: 'seraph' },
  { id: 'bobtherobber2', title: 'Bob the Robber 2', description: 'Sneak and steal in this stealth game.', url: `${SERAPH_CDN}/bobtherobber2/index.html`, icon: 'User', category: 'Adventure', tags: ['flash', 'stealth', 'puzzle'], source: 'seraph' },
  { id: 'badicecream', title: 'Bad Ice Cream', description: 'Collect fruit as an ice cream cone.', url: `${SERAPH_CDN}/badicecream/index.html`, icon: 'IceCream', category: 'Arcade', tags: ['flash', 'puzzle', 'multiplayer'], source: 'seraph' },
  { id: 'badicecream2', title: 'Bad Ice Cream 2', description: 'More ice cream puzzle action.', url: `${SERAPH_CDN}/badicecream2/index.html`, icon: 'IceCream', category: 'Arcade', tags: ['flash', 'puzzle', 'multiplayer'], source: 'seraph' },
  { id: 'badicecream3', title: 'Bad Ice Cream 3', description: 'The third installment of ice cream fun.', url: `${SERAPH_CDN}/badicecream3/index.html`, icon: 'IceCream', category: 'Arcade', tags: ['flash', 'puzzle', 'multiplayer'], source: 'seraph' },
  { id: 'badpiggies', title: 'Bad Piggies', description: 'Build vehicles for the green pigs.', url: `${SERAPH_CDN}/badpiggies/index.html`, icon: 'PiggyBank', category: 'Puzzle', tags: ['physics', 'puzzle', 'angry-birds'], source: 'seraph' },
  { id: 'badtimesimulator', title: 'Bad Time Simulator', description: 'Undertale-style boss fight.', url: `${SERAPH_CDN}/badtimesimulator/index.html`, icon: 'Skull', category: 'Action', tags: ['undertale', 'bullet-hell'], source: 'seraph' },
  { id: 'baldisbasics', title: 'Baldi\'s Basics', description: 'Educational horror game.', url: `${SERAPH_CDN}/baldisbasics/index.html`, icon: 'GraduationCap', category: 'Horror', tags: ['horror', 'school', 'creepy'], source: 'seraph' },
  { id: 'bitlife', title: 'BitLife', description: 'Life simulation text game.', url: `${SERAPH_CDN}/bitlife/index.html`, icon: 'Heart', category: 'Simulation', tags: ['simulation', 'life', 'text'], source: 'seraph' },
  { id: 'bomberman', title: 'Bomberman', description: 'Classic bomb-laying action.', url: `${SERAPH_CDN}/bomberman/index.html`, icon: 'Bomb', category: 'Arcade', tags: ['classic', 'arcade', 'multiplayer'], source: 'seraph' },
  { id: 'burgerandfrights', title: 'Burger and Frights', description: 'A creepy burger-themed horror.', url: `${SERAPH_CDN}/burgerandfrights/index.html`, icon: 'Sandwich', category: 'Horror', tags: ['horror', 'creepy'], source: 'seraph' },
  { id: 'chooseyourweapon', title: 'Choose Your Weapon', description: 'Pick your weapon and fight.', url: `${SERAPH_CDN}/chooseyourweapon/index.html`, icon: 'Sword', category: 'Action', tags: ['flash', 'fighting'], source: 'seraph' },
  { id: 'chooseyourweapon2', title: 'Choose Your Weapon 2', description: 'More weapon choices.', url: `${SERAPH_CDN}/chooseyourweapon2/index.html`, icon: 'Sword', category: 'Action', tags: ['flash', 'fighting'], source: 'seraph' },
  { id: 'chooseyourweapon3', title: 'Choose Your Weapon 3', description: 'Even more weapons.', url: `${SERAPH_CDN}/chooseyourweapon3/index.html`, icon: 'Sword', category: 'Action', tags: ['flash', 'fighting'], source: 'seraph' },
  { id: 'aceattorney', title: 'Ace Attorney', description: 'Phoenix Wright courtroom drama.', url: `${SERAPH_CDN}/aceattorney/index.html`, icon: 'Gavel', category: 'Adventure', tags: ['visual-novel', 'court', 'mystery'], source: 'seraph' },
  { id: 'abudathealien', title: 'Abuda the Alien', description: 'Help Abuda navigate Earth.', url: `${SERAPH_CDN}/abudathealien/index.html`, icon: 'Rocket', category: 'Adventure', tags: ['adventure', 'alien'], source: 'seraph' },
  { id: 'amorphous', title: 'Amorphous', description: 'Fight gooey creatures.', url: `${SERAPH_CDN}/amorphous/index.html`, icon: 'Circle', category: 'Action', tags: ['flash', 'action'], source: 'seraph' },
];

export const APPS: AppItem[] = [
  // Productivity
  { id: 'gdocs', title: 'Google Docs', description: 'Online document editor', url: 'https://docs.google.com/document', icon: 'FileText', category: 'Productivity' },
  { id: 'gsheets', title: 'Google Sheets', description: 'Online spreadsheet editor', url: 'https://sheets.google.com', icon: 'Table', category: 'Productivity' },
  { id: 'gslides', title: 'Google Slides', description: 'Online presentation maker', url: 'https://slides.google.com', icon: 'Presentation', category: 'Productivity' },
  { id: 'gforms', title: 'Google Forms', description: 'Create surveys and forms', url: 'https://forms.google.com', icon: 'ClipboardList', category: 'Productivity' },
  { id: 'gkeep', title: 'Google Keep', description: 'Notes and lists', url: 'https://keep.google.com', icon: 'StickyNote', category: 'Productivity' },
  { id: 'gcalendar', title: 'Google Calendar', description: 'Schedule and manage events', url: 'https://calendar.google.com', icon: 'Calendar', category: 'Productivity' },
  { id: 'notion', title: 'Notion', description: 'All-in-one workspace for notes and docs', url: 'https://www.notion.so', icon: ' NotebookPen', category: 'Productivity' },
  { id: 'evernote', title: 'Evernote', description: 'Note-taking and organization', url: 'https://www.evernote.com', icon: 'FileText', category: 'Productivity' },
  { id: 'trello', title: 'Trello', description: 'Visual project management boards', url: 'https://trello.com', icon: 'Columns', category: 'Productivity' },
  { id: 'todoist', title: 'Todoist', description: 'Task manager and to-do list', url: 'https://todoist.com', icon: 'CheckSquare', category: 'Productivity' },
  { id: 'onedrive', title: 'OneDrive', description: 'Microsoft cloud storage', url: 'https://onedrive.live.com', icon: 'Cloud', category: 'Productivity' },
  { id: 'office', title: 'Office Online', description: 'Word, Excel, PowerPoint in browser', url: 'https://www.office.com', icon: 'FileSpreadsheet', category: 'Productivity' },

  // Media & Entertainment
  { id: 'youtube', title: 'YouTube', description: 'Watch and share videos', url: 'https://www.youtube.com', icon: 'Youtube', category: 'Media' },
  { id: 'ytmusic', title: 'YouTube Music', description: 'Stream music ad-free', url: 'https://music.youtube.com', icon: 'Music', category: 'Media' },
  { id: 'spotify', title: 'Spotify', description: 'Stream music and podcasts', url: 'https://open.spotify.com', icon: 'Music', category: 'Media' },
  { id: 'soundcloud', title: 'SoundCloud', description: 'Discover and share audio', url: 'https://soundcloud.com', icon: 'Cloud', category: 'Media' },
  { id: 'twitch', title: 'Twitch', description: 'Live streaming platform', url: 'https://www.twitch.tv', icon: 'Tv', category: 'Media' },
  { id: 'netflix', title: 'Netflix', description: 'Stream movies and TV shows', url: 'https://www.netflix.com', icon: 'Film', category: 'Media' },
  { id: 'hulu', title: 'Hulu', description: 'Stream TV and movies', url: 'https://www.hulu.com', icon: 'Film', category: 'Media' },
  { id: 'disney', title: 'Disney+', description: 'Disney, Pixar, Marvel and more', url: 'https://www.disneyplus.com', icon: 'Film', category: 'Media' },
  { id: 'pandora', title: 'Pandora', description: 'Personalized music radio', url: 'https://www.pandora.com', icon: 'Radio', category: 'Media' },
  { id: 'vimeo', title: 'Vimeo', description: 'High-quality video hosting', url: 'https://vimeo.com', icon: 'Video', category: 'Media' },
  { id: 'dailymotion', title: 'Dailymotion', description: 'Video sharing platform', url: 'https://www.dailymotion.com', icon: 'Video', category: 'Media' },

  // Social
  { id: 'discord', title: 'Discord', description: 'Chat and community platform', url: 'https://discord.com/app', icon: 'MessageCircle', category: 'Social' },
  { id: 'reddit', title: 'Reddit', description: 'Social news and discussion', url: 'https://www.reddit.com', icon: 'MessageSquare', category: 'Social' },
  { id: 'twitter', title: 'X (Twitter)', description: 'Social media microblogging', url: 'https://x.com', icon: 'Twitter', category: 'Social' },
  { id: 'instagram', title: 'Instagram', description: 'Photo and video sharing', url: 'https://www.instagram.com', icon: 'Instagram', category: 'Social' },
  { id: 'tiktok', title: 'TikTok', description: 'Short-form video platform', url: 'https://www.tiktok.com', icon: 'Music', category: 'Social' },
  { id: 'facebook', title: 'Facebook', description: 'Social networking site', url: 'https://www.facebook.com', icon: 'Facebook', category: 'Social' },
  { id: 'messenger', title: 'Messenger', description: 'Facebook messaging app', url: 'https://www.messenger.com', icon: 'MessageCircle', category: 'Social' },
  { id: 'whatsapp', title: 'WhatsApp Web', description: 'Messaging in your browser', url: 'https://web.whatsapp.com', icon: 'MessageCircle', category: 'Social' },
  { id: 'telegram', title: 'Telegram Web', description: 'Cloud messaging app', url: 'https://web.telegram.org', icon: 'Send', category: 'Social' },
  { id: 'snapchat', title: 'Snapchat', description: 'Photo messaging app', url: 'https://web.snapchat.com', icon: 'Camera', category: 'Social' },
  { id: 'pinterest', title: 'Pinterest', description: 'Visual discovery and ideas', url: 'https://www.pinterest.com', icon: 'Image', category: 'Social' },
  { id: 'linkedin', title: 'LinkedIn', description: 'Professional networking', url: 'https://www.linkedin.com', icon: 'Linkedin', category: 'Social' },

  // Reference & Education
  { id: 'wikipedia', title: 'Wikipedia', description: 'Free online encyclopedia', url: 'https://www.wikipedia.org', icon: 'BookOpen', category: 'Reference' },
  { id: 'translate', title: 'Google Translate', description: 'Translate between languages', url: 'https://translate.google.com', icon: 'Languages', category: 'Reference' },
  { id: 'khan', title: 'Khan Academy', description: 'Free online courses', url: 'https://www.khanacademy.org', icon: 'GraduationCap', category: 'Reference' },
  { id: 'duolingo', title: 'Duolingo', description: 'Learn languages for free', url: 'https://www.duolingo.com', icon: 'Languages', category: 'Reference' },
  { id: 'quizlet', title: 'Quizlet', description: 'Flashcards and study tools', url: 'https://quizlet.com', icon: 'Layers', category: 'Reference' },
  { id: 'wolfram', title: 'Wolfram Alpha', description: 'Computational knowledge engine', url: 'https://www.wolframalpha.com', icon: 'Calculator', category: 'Reference' },
  { id: 'desmos', title: 'Desmos', description: 'Online graphing calculator', url: 'https://www.desmos.com/calculator', icon: 'Calculator', category: 'Reference' },
  { id: 'geogebra', title: 'GeoGebra', description: 'Math tools and graphing', url: 'https://www.geogebra.org', icon: 'Compass', category: 'Reference' },
  { id: 'grammarly', title: 'Grammarly', description: 'Writing assistant and grammar checker', url: 'https://app.grammarly.com', icon: 'PenLine', category: 'Reference' },
  { id: 'thesaurus', title: 'Thesaurus.com', description: 'Synonyms and antonyms', url: 'https://www.thesaurus.com', icon: 'BookOpen', category: 'Reference' },

  // Tools & Utilities
  { id: 'gmaps', title: 'Google Maps', description: 'Maps and directions', url: 'https://www.google.com/maps', icon: 'Map', category: 'Utility' },
  { id: 'gearth', title: 'Google Earth', description: 'Explore the globe in 3D', url: 'https://earth.google.com', icon: 'Globe', category: 'Utility' },
  { id: 'gmail', title: 'Gmail', description: 'Google email service', url: 'https://mail.google.com', icon: 'Mail', category: 'Utility' },
  { id: 'outlook', title: 'Outlook', description: 'Microsoft email and calendar', url: 'https://outlook.live.com', icon: 'Mail', category: 'Utility' },
  { id: 'protonmail', title: 'Proton Mail', description: 'Encrypted email service', url: 'https://mail.proton.me', icon: 'Mail', category: 'Utility' },
  { id: 'weather', title: 'Weather', description: 'Local weather forecasts', url: 'https://weather.com', icon: 'CloudSun', category: 'Utility' },
  { id: 'speedtest', title: 'Speed Test', description: 'Internet speed test', url: 'https://www.speedtest.net', icon: 'Gauge', category: 'Utility' },
  { id: 'timezone', title: 'Time.is', description: 'Exact time and time zones', url: 'https://time.is', icon: 'Clock', category: 'Utility' },
  { id: 'qr', title: 'QR Code Generator', description: 'Create QR codes', url: 'https://www.qr-code-generator.com', icon: 'QrCode', category: 'Utility' },
  { id: 'tinyurl', title: 'TinyURL', description: 'URL shortener', url: 'https://tinyurl.com', icon: 'Link', category: 'Utility' },
  { id: 'regex', title: 'Regex101', description: 'Regex tester and debugger', url: 'https://regex101.com', icon: 'Code', category: 'Utility' },
  { id: 'json', title: 'JSON Formatter', description: 'Format and validate JSON', url: 'https://jsonformatter.org', icon: 'Braces', category: 'Utility' },

  // Design & Creative
  { id: 'figma', title: 'Figma', description: 'Collaborative design tool', url: 'https://www.figma.com', icon: 'Figma', category: 'Design' },
  { id: 'canva', title: 'Canva', description: 'Graphic design platform', url: 'https://www.canva.com', icon: 'Palette', category: 'Design' },
  { id: 'photopea', title: 'Photopea', description: 'Online photo editor (Photoshop alternative)', url: 'https://www.photopea.com', icon: 'Image', category: 'Design' },
  { id: 'pixlr', title: 'Pixlr', description: 'Online photo editing', url: 'https://pixlr.com', icon: 'Image', category: 'Design' },
  { id: 'removebg', title: 'Remove.bg', description: 'Remove image backgrounds', url: 'https://www.remove.bg', icon: 'Eraser', category: 'Design' },
  { id: 'unsplash', title: 'Unsplash', description: 'Free stock photos', url: 'https://unsplash.com', icon: 'Camera', category: 'Design' },
  { id: 'dribbble', title: 'Dribbble', description: 'Design inspiration community', url: 'https://dribbble.com', icon: 'Dribbble', category: 'Design' },
  { id: 'behance', title: 'Behance', description: 'Creative portfolio platform', url: 'https://www.behance.net', icon: 'Palette', category: 'Design' },

  // Development
  { id: 'github', title: 'GitHub', description: 'Code hosting and collaboration', url: 'https://www.github.com', icon: 'Github', category: 'Development' },
  { id: 'gitlab', title: 'GitLab', description: 'DevOps and code hosting', url: 'https://gitlab.com', icon: 'GitBranch', category: 'Development' },
  { id: 'stackoverflow', title: 'Stack Overflow', description: 'Programming Q&A community', url: 'https://stackoverflow.com', icon: 'MessageSquareCode', category: 'Development' },
  { id: 'codepen', title: 'CodePen', description: 'Online code editor and playground', url: 'https://codepen.io', icon: 'Code', category: 'Development' },
  { id: 'codesandbox', title: 'CodeSandbox', description: 'Online IDE for web apps', url: 'https://codesandbox.io', icon: 'Code', category: 'Development' },
  { id: 'replit', title: 'Replit', description: 'Online coding environment', url: 'https://replit.com', icon: 'Terminal', category: 'Development' },
  { id: 'vercel', title: 'Vercel', description: 'Deploy and host web apps', url: 'https://vercel.com', icon: 'Triangle', category: 'Development' },
  { id: 'netlify', title: 'Netlify', description: 'Deploy modern web apps', url: 'https://app.netlify.com', icon: 'Server', category: 'Development' },
  { id: 'mdn', title: 'MDN Web Docs', description: 'Web development documentation', url: 'https://developer.mozilla.org', icon: 'BookOpen', category: 'Development' },
  { id: 'devdocs', title: 'DevDocs', description: 'Combined API documentation', url: 'https://devdocs.io', icon: 'BookOpen', category: 'Development' },

  // Shopping
  { id: 'amazon', title: 'Amazon', description: 'Online shopping', url: 'https://www.amazon.com', icon: 'ShoppingCart', category: 'Shopping' },
  { id: 'ebay', title: 'eBay', description: 'Online auction and shopping', url: 'https://www.ebay.com', icon: 'ShoppingCart', category: 'Shopping' },
  { id: 'aliexpress', title: 'AliExpress', description: 'Global online retail', url: 'https://www.aliexpress.com', icon: 'ShoppingBag', category: 'Shopping' },
  { id: 'etsy', title: 'Etsy', description: 'Handmade and vintage items', url: 'https://www.etsy.com', icon: 'ShoppingBag', category: 'Shopping' },
];

export const GAME_CATEGORIES = ['All', 'Action', 'Arcade', 'Puzzle', 'Strategy', 'Sports', 'Adventure', 'Idle', 'Retro', 'Horror', 'Simulation'];
export const APP_CATEGORIES = ['All', 'Productivity', 'Media', 'Social', 'Reference', 'Utility', 'Design', 'Development', 'Shopping'];

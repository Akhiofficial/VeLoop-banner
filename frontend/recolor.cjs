const fs = require('fs');
let svg = fs.readFileSync('src/assets/refer-a-friend-animate.svg', 'utf8');

// Replace the main blue/purple with our brand purple
svg = svg.replace(/rgb\(58,\s*68,\s*157\)/g, '#7c6af7');

// Make the floor almost transparent (it was white, which looks bad on dark background)
svg = svg.replace(/id="freepik--floor--inject-1" d="[^"]+" style="fill:\s*rgb\(250,\s*250,\s*250\)/g, 'id="freepik--floor--inject-1" style="fill: rgba(255, 255, 255, 0.03)');

// Make shadows dark instead of light gray
svg = svg.replace(/rgb\(224,\s*224,\s*224\)/g, 'rgba(0,0,0,0.3)');

// Also make skin/white elements slightly softer if necessary (optional)
// Let's leave them for now, but let's change rgb(55, 71, 79) to #1e2135 to match dark theme better
svg = svg.replace(/rgb\(55,\s*71,\s*79\)/g, '#1e2135');

fs.writeFileSync('src/assets/refer-a-friend-animate.svg', svg);

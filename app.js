"use strict";
/* Leonida Sirens — hub site catalog + storefront logic.
   Prices are base USD; sizes are [label, surcharge over base]. */
var STORE_URL = "https://leonidasirens-shop.fourthwall.com/";

function A(step){return [["S",0],["M",0],["L",0],["XL",step],["2XL",step*2]];}
function ONE(){return [["One Size",0]];}
function PHONE(){return [["iPhone",0],["Samsung",0],["Pixel",2]];}
function POSTER(step){return [["12×18 in",0],["18×24 in",step],["24×36 in",step*2]];}
function DIGITAL(){return [["Digital download",0]];}

var COLLS = { core:"Winter Drop 01", transition:"The Handover", gold:"Old Gold — Legacy", digital:"Digital" };

/* worn = image that shows a model wearing this product.
   Products without one use their real product/artwork image only. */
var PRODUCTS = [
  /* ===== Winter Drop 01 — Core (15) ===== */
  {id:"hoodie-sirens",coll:"core",cat:"hoodies",name:"Sirens Sunset — Pullover Hoodie",base:44.95,tier:"Core range",img:"assets/hoodie-sirens.webp",worn:"assets/model-hoodie-sirens.webp",alt:"Sirens Sunset design on a black pullover hoodie",desc:"Neon twin palms over a Leonida sunset on black heavyweight fleece. Kangaroo pocket, double-lined drawstring hood, ribbed cuffs and hem, brushed inside for cold launch nights.",sizes:A(2)},
  {id:"tee-sirens",coll:"core",cat:"tees",name:"Sirens Sunset — Classic Tee",base:27.95,tier:"Core range",img:"assets/tees.webp",pos:"18% center",alt:"Sirens Sunset design on a black tee",desc:"The signature sunset on a soft, lightweight tee — the design from the badge on every clip, printed front and centre.",sizes:A(2)},
  {id:"tee-causeway",coll:"core",cat:"tees",name:"Causeway Run — Classic Tee",base:27.95,tier:"Core range",img:"assets/tees.webp",pos:"62% center",alt:"Causeway Run design on a white tee",desc:"Teal-and-tangerine coastal highway at golden hour, on white. One car, no traffic, no mercy.",sizes:A(2)},
  {id:"crew-deco",coll:"core",cat:"sweatshirts",name:"Deco Towers — Crewneck Sweatshirt",base:39.95,tier:"Core range",img:"assets/deco-crew-tee.webp",pos:"22% center",worn:"assets/model-deco-crew.webp",alt:"Deco Towers design on a sand crewneck sweatshirt",desc:"Gold-and-teal art deco beachfront towers on sand fleece. The clean layer — no hood, all winter, ribbed cuffs and hem.",sizes:A(2)},
  {id:"tee-deco",coll:"core",cat:"tees",name:"Deco Towers — Classic Tee",base:27.95,tier:"Core range",img:"assets/deco-crew-tee.webp",pos:"82% center",worn:"assets/model-deco-tee.webp",alt:"Deco Towers design on a white tee",desc:"The deco tower in gold and teal on white — Ocean Drive energy, Leonida postcode.",sizes:A(2)},
  {id:"hoodie-causeway",coll:"core",cat:"hoodies",name:"Causeway Run — Pullover Hoodie",base:44.95,tier:"Core range",img:"assets/fabric-closeup.webp",alt:"Printed fleece fabric showing the Causeway sunset print",desc:"The golden-hour highway print on the same heavyweight brushed fleece as the Sirens hoodie — the fabric close-up is in the gallery so you can judge the print before you buy.",sizes:A(2)},
  {id:"hoodie-deco",coll:"core",cat:"hoodies",name:"Deco Towers — Pullover Hoodie",base:47.95,tier:"Core range",img:"assets/deco-crew-tee.webp",pos:"22% center",alt:"Deco Towers design on a hooded fleece in sand",desc:"The deco towers on the heavyweight hooded fleece — same gold-and-teal artwork, warmer build, kangaroo pocket and double-lined hood.",sizes:A(2)},
  {id:"crew-sirens",coll:"core",cat:"sweatshirts",name:"Sirens Sunset — Crewneck Sweatshirt",base:41.95,tier:"Core range",img:"assets/hoodie-sirens.webp",alt:"Sirens Sunset artwork on a crewneck fleece",desc:"The signature sunset without the hood — a clean crewneck in the same brushed fleece, for people who layer it under a jacket.",sizes:A(2)},
  {id:"cap-mark",coll:"core",cat:"caps",name:"Siren Beacon — Embroidered Cap",base:24.95,tier:"Core range",img:"assets/cap-beacon.webp",alt:"Black cap with the siren beacon mark embroidered in gold",desc:"The embroidery mark — a siren beacon in gold line-art — stitched, not printed, on a structured six-panel cap with an adjustable back strap.",sizes:ONE()},
  {id:"beanie-mark",coll:"core",cat:"caps",name:"Siren Beacon — Cuffed Beanie",base:24.95,tier:"Core range",img:"assets/beanie-beacon.webp",alt:"Black cuffed knit beanie with the siren beacon mark embroidered in gold on the cuff",desc:"The embroidery mark stitched in gold on the cuff of a warm, ribbed knit beanie — the winter piece of the headwear set.",sizes:ONE()},
  {id:"case-sirens",coll:"core",cat:"accessories",name:"Sirens Sunset — Phone Case",base:19.95,tier:"Entry range",img:"assets/case-sirens.webp",alt:"Phone case with the Sirens Sunset neon palms design printed across the back",desc:"The signature sunset wrapped across a hard-shell case. Pick your phone family here; pick the exact model at Fourthwall checkout.",sizes:PHONE()},
  {id:"sleeve-sirens",coll:"core",cat:"accessories",name:"Sirens Sunset — Laptop Sleeve",base:29.95,tier:"Core range",img:"assets/tees.webp",pos:"40% center",alt:"The launch artwork set, including the Sirens Sunset design used on the laptop sleeve",desc:"Padded sleeve carrying the Sirens Sunset artwork — zip closure, soft inner lining, sized for the laptop you actually own.",sizes:[["13 in",0],["15 in",3],["17 in",6]]},
  {id:"mug-sirens",coll:"core",cat:"accessories",name:"Leonida Nights — Mug",base:16.95,tier:"Entry range",img:"assets/wallpapers.webp",alt:"Leonida Nights artwork set used on the mug — pink beach sunset, teal night skyline, orange causeway",desc:"The Leonida Nights artwork wrapped around a ceramic mug — launch-week desk fuel, dishwasher and microwave safe.",sizes:[["11 oz",0],["15 oz",3]]},
  {id:"poster-nights",coll:"core",cat:"accessories",name:"Leonida Nights — Poster",base:14.95,tier:"Entry range",img:"assets/hero.webp",alt:"Leonida Nights key art — neon sunset over the Leonida coast",desc:"The brand key art as a wall poster: neon sunset, deco towers, palms and the marina. Matte finish, ships rolled.",sizes:POSTER(6)},
  {id:"sticker-pack",coll:"core",cat:"accessories",name:"Sirens — Sticker & Decal Pack",base:14.95,tier:"Entry range",img:"assets/case-sirens.webp",alt:"Sirens Sunset artwork, the lead design in the sticker pack",desc:"All three launch designs as weatherproof vinyl stickers and decals — laptops, bottles, boards, bumpers. The XL pack doubles every design.",sizes:[["Standard pack",0],["XL pack",5]]},
  /* ===== The Handover — Transition (6) ===== */
  {id:"hoodie-handover",coll:"transition",cat:"hoodies",name:"The Handover — Split-Era Hoodie",base:47.95,tier:"Core range · Transition",img:"assets/handover-hoodie.webp",worn:"assets/model-hoodie-handover.webp",alt:"The Handover hoodie — faded vintage sunset on the left half, neon sunrise on the right half",desc:"The transition piece, literally split down the middle: a faded, cracked vintage sunset for the era that is ending, and a full neon sunrise for the one that starts on launch day. Heavyweight fleece, all-over print.",sizes:A(2)},
  {id:"tee-handover",coll:"transition",cat:"tees",name:"The Handover — First Sunrise Tee",base:29.95,tier:"Core range · Transition",img:"assets/handover-hoodie.webp",pos:"78% center",alt:"The neon sunrise half of The Handover artwork",desc:"The new-era half of the Handover artwork on its own: neon sun rising over the grid. For everyone who is only looking forward.",sizes:A(2)},
  {id:"crew-handover",coll:"transition",cat:"sweatshirts",name:"Last Sunset — Crewneck Sweatshirt",base:42.95,tier:"Core range · Transition",img:"assets/handover-hoodie.webp",pos:"22% center",alt:"The faded vintage sunset half of The Handover artwork",desc:"The old-era half of the Handover artwork: a faded, weathered sunset over the hills — a farewell you can wear. Brushed fleece crewneck.",sizes:A(2)},
  {id:"cap-handover",coll:"transition",cat:"caps",name:"The Handover — Embroidered Cap",base:24.95,tier:"Core range · Transition",img:"assets/cap-beacon.webp",alt:"Black cap with the beacon mark embroidered in gold",desc:"Half-and-half embroidery: the beacon mark split between faded thread and neon-bright thread. Structured six-panel, adjustable strap.",sizes:ONE()},
  {id:"case-handover",coll:"transition",cat:"accessories",name:"The Handover — Phone Case",base:19.95,tier:"Entry range · Transition",img:"assets/case-sirens.webp",alt:"Phone case with the Sirens artwork, Handover edition",desc:"The split-era artwork wrapped across a hard-shell case — old sunset on one edge, new sunrise on the other. Pick your phone family here, exact model at checkout.",sizes:PHONE()},
  {id:"poster-handover",coll:"transition",cat:"accessories",name:"One Era Ends — Handover Poster",base:17.95,tier:"Entry range · Transition",img:"assets/hero.webp",alt:"Leonida Nights key art, Handover poster edition",desc:"The key art split for the transition: dusk on the left, dawn on the right, one coastline. Matte poster, ships rolled — a launch-week keepsake.",sizes:POSTER(6)},
  /* ===== Old Gold — Legacy / Premium (7) ===== */
  {id:"jacket-gold",coll:"gold",cat:"hoodies",name:"Old Gold — Legacy Varsity Jacket",base:129.95,tier:"Premium · Old Gold",img:"assets/gold-jacket.webp",worn:"assets/model-jacket-gold.webp",alt:"Old Gold varsity jacket in black with gold-embroidered twin palms, gold trim and leather-look sleeves",desc:"The flagship of the legacy collection: black varsity body, leather-look sleeves, gold ribbed trim, and the twin palms embroidered in metallic gold thread. Built heavy, made to be kept — a thirteen-year era in one jacket.",sizes:A(5)},
  {id:"hoodie-gold",coll:"gold",cat:"hoodies",name:"Old Gold — Heavyweight Hoodie",base:99.95,tier:"Premium · Old Gold",img:"assets/hoodie-sirens.webp",alt:"The heavyweight black hoodie carrying the Old Gold legacy print",desc:"The heaviest fleece in the store with the legacy palms printed in gold-foil style. Thicker blank, double-lined hood, ribbed everything — the premium hoodie of the gold run.",sizes:A(5)},
  {id:"crew-gold",coll:"gold",cat:"sweatshirts",name:"Old Gold — Legacy Crewneck",base:89.95,tier:"Premium · Old Gold",img:"assets/deco-crew-tee.webp",pos:"22% center",alt:"Crewneck fleece carrying the Old Gold legacy artwork",desc:"Deco towers reworked in gold on heavyweight crewneck fleece — the classy legacy piece, embroidered chest mark with the full gold print on the back.",sizes:A(5)},
  {id:"tee-gold",coll:"gold",cat:"tees",name:"Old Gold — Legacy Tee",base:54.95,tier:"Old Gold",img:"assets/tees.webp",pos:"40% center",alt:"The launch tee set, including the Old Gold legacy tee artwork",desc:"The legacy palms in gold-foil-style print on a heavier tee blank than the core range — the entry point into the gold collection.",sizes:A(3)},
  {id:"cap-gold",coll:"gold",cat:"caps",name:"Old Gold — Embroidered Cap",base:39.95,tier:"Old Gold",img:"assets/cap-beacon.webp",alt:"Black cap with the legacy mark embroidered in gold thread",desc:"The beacon mark stitched entirely in metallic gold thread on a structured six-panel cap — the legacy headwear piece.",sizes:ONE()},
  {id:"case-gold",coll:"gold",cat:"accessories",name:"Old Gold — Legacy Phone Case",base:34.95,tier:"Old Gold",img:"assets/case-sirens.webp",alt:"Phone case carrying the Old Gold legacy artwork",desc:"Gold palms on deep black, wrapped across a hard-shell case with a matte finish. Pick your phone family here, exact model at checkout.",sizes:PHONE()},
  {id:"poster-gold",coll:"gold",cat:"accessories",name:"Old Gold — Foil-Style Poster",base:19.95,tier:"Entry range · Old Gold",img:"assets/wallpapers.webp",alt:"The Leonida artwork set, including the gold legacy poster design",desc:"The legacy palms and deco towers in gold-foil style on a matte black poster — the wall piece of the gold run. Ships rolled.",sizes:POSTER(8)},
  /* ===== Digital (3) ===== */
  {id:"digital-wallpapers",coll:"digital",cat:"digital",name:"Leonida Nights — Neon Coast Wallpaper Pack",base:4.99,tier:"Digital",img:"assets/digital-wallpaper-1.jpg",gallery:["assets/digital-wallpaper-1.jpg","assets/digital-wallpaper-2.jpg","assets/digital-wallpaper-3.jpg"],alt:"Sunset Boulevard — palm-lined coast road under a neon sky (phone wallpaper)",desc:"Seven original synthwave wallpapers in the Leonida Sirens house style: 5 phone (1440×3200) + 2 desktop (2560×1440), JPG, delivered as one ZIP. No text, no logos — just the coast at night. Personal use on your own devices.",sizes:DIGITAL()},
  {id:"digital-tracker",coll:"digital",cat:"digital",name:"Launch Week Tracker — Completion Tracker",base:6.99,tier:"Digital",img:null,alt:"",desc:"A clean, spoiler-free completion tracker for your first run through a big open-world game: spreadsheet (XLSX + CSV) with Story Missions, Collectibles, Side Activities, Achievements and a 100% Checklist, plus a printable one-page A4 PDF. Every row is blank and generic — it can never spoil anything, and it works for any game.",sizes:DIGITAL()},
  {id:"digital-themes",coll:"digital",cat:"digital",name:"Leonida Device Themes — All-Device Bundle",base:9.99,tier:"Digital",img:"assets/digital-wallpaper-2.jpg",gallery:["assets/digital-wallpaper-2.jpg","assets/digital-wallpaper-1.jpg","assets/digital-wallpaper-3.jpg"],alt:"Skyline Panorama — the whole neon coast, wide (desktop wallpaper)",desc:"The complete device set: all five neon coastal-city families for phone, tablet, laptop, desktop and ultrawide (61 JPG files), plus high-resolution laptop-skin print art and an install guide. Personal use only. Digital download — nothing is shipped.",sizes:DIGITAL()}
];

var CATEGORIES = [
  {key:"all",label:"All Products"},
  {key:"tees",label:"Tees"},
  {key:"hoodies",label:"Hoodies"},
  {key:"sweatshirts",label:"Crewnecks & Sweats"},
  {key:"capsacc",label:"Caps & Accessories"},
  {key:"digital",label:"Digital Products"},
  {key:"watch",label:"Watch"}
];

var SHORTS = [
  {id:"9r6HBXHFmTI",title:"Countdown",note:"The launch countdown Short that opened the channel."},
  {id:"y6puNF8-hZY",title:"Trailer 2 — The Story",note:"The second trailer's story, cut for Shorts."},
  {id:"6HGdDjVSxe4",title:"Kalshi",note:"The market's odds on launch week, in under a minute."},
  {id:"pBqPFmq0XJQ",title:"Confirmed",note:"What was actually confirmed — no rumours."}
];

function inCategory(p, key){
  if(key==="all") return true;
  if(key==="capsacc") return p.cat==="caps" || p.cat==="accessories";
  return p.cat===key;
}
function money(n){ return "$" + n.toFixed(2); }
function galleryFor(p){
  var g = [];
  if(p.worn) g.push({src:p.worn, alt:p.alt + " — worn by a model"});
  if(p.gallery){ p.gallery.forEach(function(s){ if(g.map(function(x){return x.src;}).indexOf(s)===-1) g.push({src:s, alt:p.alt}); }); }
  else if(p.img){ g.push({src:p.img, alt:p.alt}); }
  if(p.cat!=="digital" && p.img!=="assets/fabric-closeup.webp" && g.length<3) g.push({src:"assets/fabric-closeup.webp", alt:"Fabric and print close-up"});
  return g;
}

var grid = document.getElementById("grid");
var countEl = document.getElementById("resultCount");
var menuEl = document.getElementById("sideMenu");
var shopView = document.getElementById("shopView");
var watchView = document.getElementById("watchView");
var detailView = document.getElementById("detailView");
var currentCat = "all";

CATEGORIES.forEach(function(c){
  var n = c.key==="watch" ? SHORTS.length : PRODUCTS.filter(function(p){return inCategory(p,c.key);}).length;
  var b = document.createElement("button");
  b.className = "menu-item" + (c.key==="all" ? " on" : "");
  b.dataset.cat = c.key;
  b.setAttribute("aria-pressed", c.key==="all" ? "true" : "false");
  b.innerHTML = "<span>" + c.label + "</span><span class='menu-count'>" + n + "</span>";
  b.addEventListener("click", function(){ selectCategory(c.key); });
  menuEl.appendChild(b);
});

function selectCategory(key){
  currentCat = key;
  Array.prototype.forEach.call(menuEl.children, function(b){
    var on = b.dataset.cat===key;
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  detailView.hidden = true;
  if(key==="watch"){
    shopView.hidden = true; watchView.hidden = false;
    watchView.scrollIntoView({block:"start"});
    return;
  }
  watchView.hidden = true; shopView.hidden = false;
  renderGrid();
}

function renderGrid(){
  grid.innerHTML = "";
  var items = PRODUCTS.filter(function(p){ return inCategory(p, currentCat); });
  countEl.textContent = items.length + (items.length===1 ? " product" : " products");
  items.forEach(function(p){
    var card = document.createElement("article");
    card.className = "card";
    var thumb = p.worn || p.img;
    var media;
    if(thumb){
      media = "<div class='card-media'><img src='" + thumb + "' alt='" + p.alt + "' loading='lazy'" +
        (p.worn || !p.pos ? "" : " style='object-position:" + p.pos + "'") + ">" +
        (p.worn ? "<span class='badge'>★ Worn by model</span>" : "") + "</div>";
    } else {
      media = "<div class='card-media placeholder' role='img' aria-label='No photo yet for " + p.name + "'><span class='placeholder-mark'>LEONIDA SIRENS</span><span class='placeholder-note'>Digital product — no photo</span></div>";
    }
    card.innerHTML = media +
      "<div class='card-body'><p class='card-coll'>" + COLLS[p.coll] + "</p><h3>" + p.name + "</h3>" +
      "<button class='view-btn' type='button'>View product</button></div>";
    card.querySelector(".view-btn").addEventListener("click", function(){ openDetail(p.id); });
    card.querySelector(".card-media").addEventListener("click", function(){ openDetail(p.id); });
    grid.appendChild(card);
  });
}

var currentProduct = null, currentSize = 0;
function openDetail(id){
  currentProduct = PRODUCTS.filter(function(p){ return p.id===id; })[0];
  currentSize = 0;
  var p = currentProduct;
  document.getElementById("dColl").textContent = COLLS[p.coll] + " · " + p.tier;
  document.getElementById("dName").textContent = p.name;
  document.getElementById("dDesc").textContent = p.desc;
  var gal = galleryFor(p);
  var main = document.getElementById("dMain");
  var strip = document.getElementById("dStrip");
  strip.innerHTML = "";
  if(gal.length){
    main.innerHTML = "<img id='dMainImg' src='" + gal[0].src + "' alt='" + gal[0].alt + "'>" + (p.worn ? "<span class='badge'>★ Worn by model</span>" : "");
    gal.forEach(function(g, i){
      var t = document.createElement("button");
      t.className = "thumb" + (i===0 ? " on" : "");
      t.innerHTML = "<img src='" + g.src + "' alt='" + g.alt + "'>";
      t.addEventListener("click", function(){
        document.getElementById("dMainImg").src = g.src;
        document.getElementById("dMainImg").alt = g.alt;
        Array.prototype.forEach.call(strip.children, function(x){ x.classList.remove("on"); });
        t.classList.add("on");
      });
      strip.appendChild(t);
    });
    strip.hidden = gal.length < 2;
  } else {
    main.innerHTML = "<div class='placeholder detail-placeholder' role='img' aria-label='No photo yet for " + p.name + "'><span class='placeholder-mark'>LEONIDA SIRENS</span><span class='placeholder-note'>Digital product — no photo</span></div>";
    strip.hidden = true;
  }
  var sizeWrap = document.getElementById("dSizes");
  sizeWrap.innerHTML = "";
  p.sizes.forEach(function(s, i){
    var b = document.createElement("button");
    b.className = "size-btn" + (i===0 ? " on" : "");
    b.textContent = s[0] + " — " + money(p.base + s[1]);
    b.addEventListener("click", function(){
      currentSize = i;
      Array.prototype.forEach.call(sizeWrap.children, function(x){ x.classList.remove("on"); });
      b.classList.add("on");
      updatePrice();
    });
    sizeWrap.appendChild(b);
  });
  updatePrice();
  shopView.hidden = true; watchView.hidden = true; detailView.hidden = false;
  detailView.scrollIntoView({block:"start"});
}
function updatePrice(){
  var p = currentProduct;
  document.getElementById("dPrice").textContent = money(p.base + p.sizes[currentSize][1]);
  document.getElementById("dSizeLabel").textContent = p.sizes[currentSize][0];
}
document.getElementById("backBtn").addEventListener("click", function(){
  detailView.hidden = true;
  if(currentCat==="watch"){ watchView.hidden = false; } else { shopView.hidden = false; }
});
document.getElementById("dBuy").setAttribute("href", STORE_URL);

/* Watch section */
var watchGrid = document.getElementById("watchGrid");
SHORTS.forEach(function(s){
  var card = document.createElement("article");
  card.className = "watch-card";
  card.innerHTML =
    "<div class='watch-embed'><iframe src='https://www.youtube-nocookie.com/embed/" + s.id +
    "' title='" + s.title + " — Leonida Sirens Short' loading='lazy' allow='accelerometer; encrypted-media; picture-in-picture' allowfullscreen></iframe></div>" +
    "<div class='card-body'><h3>" + s.title + "</h3><p>" + s.note + "</p>" +
    "<a class='view-btn link-btn' href='https://youtube.com/shorts/" + s.id + "' target='_blank' rel='noopener'>Open on YouTube</a></div>";
  watchGrid.appendChild(card);
});

renderGrid();

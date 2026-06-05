// ── BIN SYMBOL IMAGES ──────────────────────────────────────────────────────

const BIN_SYMBOLS = {
  food: 'assets/01_matavfall.png',
  paperPkg: 'assets/04_pappersforpackningar.png',
  plastic: 'assets/03_plastforpackningar.png',
  paper: 'assets/05_tidningar_och_papper.png',
  metal: 'assets/08_metallforpackningar.png'
};

// ── BIN DEFINITIONS ────────────────────────────────────────────────────────

const BINS = [
  { key: 'food',     labelEn: 'Food Waste',  labelSv: 'Matavfall',      color: '#04a94f', iconSrc: BIN_SYMBOLS.food },
  { key: 'paperPkg', labelEn: 'Paper Pkg',   labelSv: 'Pappers​förp.', color: '#c7a465', iconSrc: BIN_SYMBOLS.paperPkg },
  { key: 'plastic',  labelEn: 'Plastic Pkg', labelSv: 'Plast​förp.',   color: '#9b2b91', iconSrc: BIN_SYMBOLS.plastic },
  { key: 'paper',    labelEn: 'Newspaper',   labelSv: 'Tidningar',      color: '#0788bd', iconSrc: BIN_SYMBOLS.paper },
  { key: 'metal',    labelEn: 'Metal',       labelSv: 'Metall​förp.',  color: '#66777e', iconSrc: BIN_SYMBOLS.metal }
];

// ── QUESTION BANK ──────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    itemEn: 'Plastic water bottle',
    itemSv: 'Plastvattenflaska',
    emoji: 'assets\\water_bottle.jpg',
    correctBin: 'plastic',
    hintEn: 'Clean plastic containers go to Plastic Packaging (Plastförpackningar).',
    hintSv: 'Rena plastbehållare går till Plastförpackningar.'
  },
  {
    itemEn: 'Banana peel',
    itemSv: 'Bananskal',
    emoji: 'assets\\banana.jpg',
    correctBin: 'food',
    hintEn: 'Food scraps become biogas and biofertilizer — they power buses!',
    hintSv: 'Matrester blir biogas och biogödsel — de driver bussar!'
  },
  {
    itemEn: 'Aluminium soda can',
    itemSv: 'Aluminiumburk',
    emoji: 'assets\\can.jpg',
    correctBin: 'metal',
    hintEn: 'Metal packaging is infinitely recyclable and extremely valuable.',
    hintSv: 'Metallförpackningar är oändligt återvinningsbara och extremt värdefulla.'
  },
  {
    itemEn: 'Newspaper',
    itemSv: 'Tidning',
    emoji: 'assets\\news_paper.jpg',
    correctBin: 'paper',
    hintEn: 'Newspapers and magazines go to Newspaper & Paper (Tidningar & papper).',
    hintSv: 'Tidningar och tidskrifter går till Tidningar & papper.'
  },
  {
    itemEn: 'Milk carton',
    itemSv: 'Mjölkförpackning',
    emoji: 'assets\\milk.jpg',
    correctBin: 'paperPkg',
    hintEn: 'Liquid food cartons go to Paper Packaging (Pappers­förpackningar).',
    hintSv: 'Flütande matförpackningar går till Pappersförpackningar.'
  },
  {
    itemEn: 'Apple core',
    itemSv: 'Äppelskrutt',
    emoji: 'assets\\apple.jpg',
    correctBin: 'food',
    hintEn: 'All food leftovers, including fruit cores, go to Food Waste (Matavfall).',
    hintSv: 'Alla matrester, inklusive fruktskrott, går till Matavfall.'
  },
  {
    itemEn: 'Cardboard egg carton',
    itemSv: 'Papperäggkartong',
    emoji: 'assets\\Egg.jpg',
    correctBin: 'paperPkg',
    hintEn: 'Cardboard packaging like egg cartons goes to Paper Packaging.',
    hintSv: 'Pappersförpackningar som äggkartonger går till Pappersförpackningar.'
  },
  {
    itemEn: 'Ketchup bottle (plastic)',
    itemSv: 'Ketchupflaska (plast)',
    emoji: 'assets\\ketchup.jpg',
    correctBin: 'plastic',
    hintEn: 'Rinse it and sort it into Plastic Packaging.',
    hintSv: 'Skölj den och sortera den i Plastförpackningar.'
  },
  {
    itemEn: 'Tin soup can',
    itemSv: 'Konservburk',
    emoji: 'assets\\tin.jpg',
    correctBin: 'metal',
    hintEn: 'Steel and tin cans go to Metal Packaging (Metallförpackningar).',
    hintSv: 'Stål- och plåtburkar går till Metallförpackningar.'
  },
  {
    itemEn: 'Office paper / printing paper',
    itemSv: 'Kontorspapper',
    emoji: 'assets\\office_paper.jpg',
    correctBin: 'paper',
    hintEn: 'Loose paper and magazines go to Newspaper & Paper.',
    hintSv: 'Löst papper och tidskrifter går till Tidningar & papper.'
  }
];

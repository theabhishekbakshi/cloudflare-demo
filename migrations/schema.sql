-- player_reviews table
CREATE TABLE IF NOT EXISTS PLAYER_REVIEWS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  playerName TEXT ,
  pos TEXT ,
  imageReview TEXT,
  urlSlugCopy TEXT,
  eventName TEXT ,
  wf_1 TEXT,
  sm1 TEXT,
  st1 TEXT,
  alt1 TEXT,
  alt2 TEXT,
  alt3 TEXT,
  pros TEXT ,
  cons TEXT ,
  verdict TEXT ,
  rating FLOAT ,
  stats1 INTEGER ,
  stats2 INTEGER ,
  stats3 INTEGER ,
  stats4 INTEGER ,
  stats5 INTEGER ,
  stats6 INTEGER ,
  skill1 TEXT,
  skill2 TEXT,
  skill3 TEXT,
  skill4 TEXT,
  skill5 TEXT,
  skill6 TEXT,
  skillImage1 TEXT,
  skillImage2 TEXT,
  skillImage3 TEXT,
  skillImage4 TEXT,
  skillImage5 TEXT,
  skillImage6 TEXT,
  st_type1 TEXT ,
  st_type2 TEXT ,
  st_type3 TEXT ,
  st_type4 TEXT ,
  st_type5 TEXT ,
  st_type6 TEXT ,
  playerReviews_item TEXT
);

-- icon_renders table
CREATE TABLE IF NOT EXISTS ICON_RENDERS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  playerRenders TEXT ,
  nation TEXT ,
  playerImage TEXT 
);


-- player_renders table
CREATE TABLE IF NOT EXISTS PLAYER_RENDERS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  playerRenders TEXT ,
  playerName TEXT ,
  club TEXT ,
  nationality TEXT 
);



--nominees table
CREATE TABLE IF NOT EXISTS NOMINEES (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,

  pos TEXT,
  slug TEXT,

  Nm1 TEXT,
  Nm1_name TEXT,

  Nm2 TEXT,
  Nm2_name TEXT,

  Nm3 TEXT,
  Nm3_name TEXT,

  Nm4 TEXT,
  Nm4_name TEXT,

  Nm5 TEXT,
  Nm5_name TEXT,

  Nm6 TEXT,
  Nm6_name TEXT,

  Nm7 TEXT,
  Nm7_name TEXT,

  Nm8 TEXT,
  Nm8_name TEXT,

  Nm9 TEXT,
  Nm9_name TEXT,

  Nm10 TEXT,
  Nm10_name TEXT,

  Nm11 TEXT,
  Nm11_name TEXT,

  Nm12 TEXT,
  Nm12_name TEXT,

  Nm13 TEXT,
  Nm13_name TEXT,

  Nm14 TEXT,
  Nm14_name TEXT,

  Nm15 TEXT,
  Nm15_name TEXT,

  Nm16 TEXT,
  Nm16_name TEXT,

  Nm17 TEXT,
  Nm17_name TEXT,

  Nm18 TEXT,
  Nm18_name TEXT,

  Nm19 TEXT,
  Nm19_name TEXT,

  Nm20 TEXT,
  Nm20_name TEXT,

  Community_Power_Rankings TEXT,
  Intro TEXT
);


-- club table
CREATE TABLE IF NOT EXISTS CLUB (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  club_image TEXT NOT NULL,
  club TEXT NOT NULL
);





-- nation table
CREATE TABLE IF NOT EXISTS NATION (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  nation_image TEXT NOT NULL,
  nation TEXT NOT NULL
);



-- league table
CREATE TABLE IF NOT EXISTS LEAGUE (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  league_image TEXT NOT NULL,
  league TEXT NOT NULL
);




-- redeem_codes table
CREATE TABLE IF NOT EXISTS REDEEM_CODES (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  code TEXT NOT NULL,
  reward TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1))
);





-- concept_cards table
CREATE TABLE IF NOT EXISTS CONCEPT_CARDS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,

  title TEXT ,

  image_url TEXT,               -- image path or URL
  card_type TEXT ,      -- e.g. 'Icon', 'Regular'

  ovr_color TEXT  DEFAULT '#FFFFFF',
  pos_color TEXT  DEFAULT '#FFFFFF',
  name_color TEXT DEFAULT '#FFFFFF'

);





 -- official_cards table
CREATE TABLE IF NOT EXISTS OFFICIAL_CARDS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,

  title TEXT,

  image_url TEXT,   
  animated_card TEXT,            -- image path or URL
  card_type TEXT,      -- e.g. 'Icon', 'Regular'

  ovr_color TEXT DEFAULT '#FFFFFF',
  pos_color TEXT  DEFAULT '#FFFFFF',
  name_color TEXT  DEFAULT '#FFFFFF',
  has_animated INTEGER DEFAULT 1 CHECK (has_animated IN (0,1))
);





--other_version_cards
CREATE TABLE IF NOT EXISTS OTHER_VERSION_CARDS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,

  title TEXT,

  image_url TEXT,              -- image path or URL
  card_type TEXT ,      -- e.g. 'Icon', 'Regular'

  ovr_color TEXT DEFAULT '#FFFFFF',
  pos_color TEXT DEFAULT '#FFFFFF',
  name_color TEXT DEFAULT '#FFFFFF',
  cards_applicable INTEGER DEFAULT 1 CHECK (cards_applicable IN (0,1))
);




--TOP 10 CARDS table
CREATE TABLE IF NOT EXISTS TOP_10_CARDS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,

  title TEXT,
  
  img_1 TEXT,            --image player
  name_1 TEXT,
  rlink1 TEXT,
  mv1 TEXT,
  wf1 TEXT,              --image
  sm1 TEXT,              --image
  st1 TEXT,              --image

  img_2 TEXT,            --image player
  name_2 TEXT,
  rlink2 TEXT,
  mv2 TEXT,
  wf2 TEXT,              --image
  sm2 TEXT,              --image
  st2 TEXT,              --image

  img_3 TEXT,            --image player
  name_3 TEXT,
  rlink3 TEXT,
  mv3 TEXT,
  wf3 TEXT,              --image
  sm3 TEXT,              --image
  st3 TEXT,              --image

  img_4 TEXT,            --image player
  name_4 TEXT,
  rlink4 TEXT,
  mv4 TEXT,
  wf4 TEXT,              --image
  sm4 TEXT,              --image
  st4 TEXT,              --image

  img_5 TEXT,            --image player
  name_5 TEXT,
  rlink5 TEXT,
  mv5 TEXT,
  wf5 TEXT,              --image
  sm5 TEXT,              --image
  st5 TEXT,              --image

  img_6 TEXT,            --image player
  name_6 TEXT,
  rlink6 TEXT,
  mv6 TEXT,
  wf6 TEXT,              --image
  sm6 TEXT,              --image
  st6 TEXT,              --image

  img_7 TEXT,            --image player
  name_7 TEXT,
  rlink7 TEXT,
  mv7 TEXT,
  wf7 TEXT,              --image
  sm7 TEXT,              --image
  st7 TEXT,              --image

  img_8 TEXT,            --image player
  name_8 TEXT,
  rlink8 TEXT,
  mv8 TEXT,
  wf8 TEXT,              --image
  sm8 TEXT,              --image
  st8 TEXT,              --image

  img_9 TEXT,            --image player
  name_9 TEXT,
  rlink9 TEXT,
  mv9 TEXT,
  wf9 TEXT,              --image
  sm9 TEXT,              --image
  st9 TEXT,              --image

  img_10 TEXT,           --image player
  name_10 TEXT,
  rlink10 TEXT,
  mv10 TEXT,
  wf10 TEXT,             --image
  sm10 TEXT,             --image
  st10 TEXT              --image
); 

--Top 5 Mid-Budget table

CREATE TABLE IF NOT EXISTS TOP_5_MID_CARDS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,

  title TEXT,
  
  img_1 TEXT,            --image player
  name_1 TEXT,
  mv1 TEXT,
  wf1 TEXT,              --image
  sm1 TEXT,              --image
  st1 TEXT,              --image

  img_2 TEXT,            --image player
  name_2 TEXT,
  mv2 TEXT,
  wf2 TEXT,              --image
  sm2 TEXT,              --image
  st2 TEXT,              --image

  img_3 TEXT,            --image player
  name_3 TEXT,
  mv3 TEXT,
  wf3 TEXT,              --image
  sm3 TEXT,              --image
  st3 TEXT,              --image

  img_4 TEXT,            --image player
  name_4 TEXT,
  mv4 TEXT,
  wf4 TEXT,              --image
  sm4 TEXT,              --image
  st4 TEXT,              --image

  img_5 TEXT,            --image player
  name_5 TEXT,
  mv5 TEXT,
  wf5 TEXT,              --image
  sm5 TEXT,              --image
  st5 TEXT,              --image

  pos TEXT
);

--Top 5 Low-Budget table
CREATE TABLE IF NOT EXISTS TOP_5_LOW_CARDS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,

  title TEXT,
  
  img_1 TEXT,            --image player
  name_1 TEXT,
  mv1 TEXT,
  wf1 TEXT,              --image
  sm1 TEXT,              --image
  st1 TEXT,              --image

  img_2 TEXT,            --image player
  name_2 TEXT,
  mv2 TEXT,
  wf2 TEXT,              --image
  sm2 TEXT,              --image
  st2 TEXT,              --image

  img_3 TEXT,            --image player
  name_3 TEXT,
  mv3 TEXT,
  wf3 TEXT,              --image
  sm3 TEXT,              --image
  st3 TEXT,              --image

  img_4 TEXT,            --image player
  name_4 TEXT,
  mv4 TEXT,
  wf4 TEXT,              --image
  sm4 TEXT,              --image
  st4 TEXT,              --image

  img_5 TEXT,            --image player
  name_5 TEXT,
  mv5 TEXT,
  wf5 TEXT,              --image
  sm5 TEXT,              --image
  st5 TEXT,              --image

  pos TEXT
);
-- player_reviews table
CREATE TABLE IF NOT EXISTS PLAYER_REVIEWS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  playerName TEXT NOT NULL,
  pos TEXT NOT NULL,
  imageReview TEXT,
  urlSlugCopy TEXT,
  eventName TEXT NOT NULL,
  wf_1 TEXT,
  sm1 TEXT,
  st1 TEXT,
  alt1 TEXT,
  alt2 TEXT,
  alt3 TEXT,
  pros TEXT NOT NULL,
  cons TEXT NOT NULL,
  verdict TEXT NOT NULL,
  rating FLOAT NOT NULL,
  stats1 INTEGER NOT NULL,
  stats2 INTEGER NOT NULL,
  stats3 INTEGER NOT NULL,
  stats4 INTEGER NOT NULL,
  stats5 INTEGER NOT NULL,
  stats6 INTEGER NOT NULL,
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
  st_type1 TEXT NOT NULL,
  st_type2 TEXT NOT NULL,
  st_type3 TEXT NOT NULL,
  st_type4 TEXT NOT NULL,
  st_type5 TEXT NOT NULL,
  st_type6 TEXT NOT NULL,
  playerReviews_item TEXT
);

-- icon_renders table
CREATE TABLE IF NOT EXISTS ICON_RENDERS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  playerRenders TEXT NOT NULL,
  nation TEXT NOT NULL,
  playerImage TEXT NOT NULL
);


-- player_renders table
CREATE TABLE IF NOT EXISTS PLAYER_RENDERS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  playerRenders TEXT NOT NULL,
  playerName TEXT NOT NULL,
  club TEXT NOT NULL,
  nationality TEXT NOT NULL
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




import React, { useMemo, useState } from "react";

const styleMeta = {
  pilsner: {
    label: "ピルスナー",
    category: "ラガー系",
    desc: "透き通る黄金色とキレのある苦味。軽快で飲みやすく、最もスタンダードなビール。"
  },
  helles: {
    label: "ヘレス",
    category: "ラガー系",
    desc: "モルトの甘みが感じられるまろやかな味わい。苦味は控えめで優しい飲み口。"
  },
  kolsch: {
    label: "ケルシュ",
    category: "エール系",
    desc: "すっきりとした飲み口とほのかなフルーティさ。ラガーのような軽やかさも併せ持つ。"
  },
  paleAle: {
    label: "ペールエール",
    category: "エール系",
    desc: "バランスの良い苦味と香り。ホップとモルトの調和が楽しめる王道スタイル。"
  },
  sessionIPA: {
    label: "セッションIPA",
    category: "IPA",
    desc: "軽やかな飲み口と爽やかなホップ香。アルコール控えめで何杯でも飲めるIPA。"
  },
  westCoastIPA: {
    label: "ウェストコーストIPA",
    category: "IPA",
    desc: "シャープな苦味と柑橘系の香り。透明感のあるクリアな仕上がりが特徴。"
  },
  hazyIPA: {
    label: "ヘイジーIPA",
    category: "IPA",
    desc: "濁った見た目とトロピカルな香り。苦味は控えめでジューシーな味わい。"
  },
  saison: {
    label: "セゾン",
    category: "ベルジャン",
    desc: "ドライでスパイシーな風味。軽やかで爽快感のある伝統的な農家ビール。"
  },
  belgianWhite: {
    label: "ベルジャンホワイト",
    category: "ベルジャン",
    desc: "白く濁った見た目と柑橘の香り。やわらかく爽やかな口当たり。"
  },
  sourAle: {
    label: "サワーエール",
    category: "サワー",
    desc: "爽やかな酸味が特徴。フルーティで軽快な味わいが楽しめる。"
  },
  gose: {
    label: "ゴーゼ",
    category: "サワー",
    desc: "ほんのり塩味と酸味が特徴のユニークなスタイル。軽やかで飲みやすい。"
  },
  fruitBeer: {
    label: "フルーツビール",
    category: "フルーツ",
    desc: "果実の甘みと香りが際立つ華やかなビール。ジュース感覚で楽しめる。"
  },
  stout: {
    label: "スタウト",
    category: "ダーク",
    desc: "ローストした麦の香ばしさとコーヒーのような苦味。重厚で深い味わい。"
  },
  porter: {
    label: "ポーター",
    category: "ダーク",
    desc: "チョコレートやカラメルのような風味。スタウトよりやや軽やか。"
  },
  imperialStout: {
    label: "インペリアルスタウト",
    category: "ダーク",
    desc: "非常に濃厚でアルコール感の強いスタウト。デザートのような重厚さ。"
  },
  barleyWine: {
    label: "バーレイワイン",
    category: "ストロング",
    desc: "ワインのように濃厚で甘みのあるビール。ゆっくり楽しむ大人の一杯。"
  },
  barrelAged: {
    label: "バレルエイジド",
    category: "熟成",
    desc: "樽熟成によるバニラやウイスキーの風味。奥深く特別感のある味わい。"
  }
};

const jobMeta = {
  tank: {
    label: "タンク",
    sub: "Guardian / Knight",
    icon: "🛡️",
    colorA: "#f6c04a",
    colorB: "#d97706",
    description: "行きつけの酒場に通い、安定した一杯とコミュニティを大切にする冒険者。",
  },
  mage: {
    label: "魔法使い",
    sub: "Mage",
    icon: "✨",
    colorA: "#d946ef",
    colorB: "#7c3aed",
    description: "限定・イベント・変わり種に心が動く、刺激を追う冒険者。",
  },
  fighter: {
    label: "剣士",
    sub: "Warrior / Fighter",
    icon: "⚔️",
    colorA: "#fb7185",
    colorB: "#dc2626",
    description: "まずは王道の一杯から。人気どころをしっかり押さえる冒険者。",
  },
  ranger: {
    label: "レンジャー",
    sub: "Ranger / Explorer",
    icon: "🌿",
    colorA: "#34d399",
    colorB: "#16a34a",
    description: "新しい酒場や土地ごとの個性を楽しみながら探索する冒険者。",
  },
  alchemist: {
    label: "錬金術師",
    sub: "Alchemist",
    icon: "⚗️",
    colorA: "#60a5fa",
    colorB: "#4f46e5",
    description: "熟成・希少・収集に惹かれる、価値ある一杯を集める冒険者。",
  },
};

const guildMasterPortrait = "https://o-sesame.co.jp/beerverse/images/guild-master.png";
const beerStyleImageBase = "https://o-sesame.co.jp/beerverse/images/beer-style/";
const jobImageBase = "https://o-sesame.co.jp/beerverse/images/job/";

const styleImages = {
  pilsner: `${beerStyleImageBase}01_pilsner.jpg`,
  helles: `${beerStyleImageBase}02_helles.jpg`,
  kolsch: `${beerStyleImageBase}03_kolsch.jpg`,
  paleAle: `${beerStyleImageBase}04_pale_ale.jpg`,
  sessionIPA: `${beerStyleImageBase}05_session_ipa.jpg`,
  westCoastIPA: `${beerStyleImageBase}06_west_coast_ipa.jpg`,
  hazyIPA: `${beerStyleImageBase}07_hazy_ipa.jpg`,
  saison: `${beerStyleImageBase}08_saison.jpg`,
  belgianWhite: `${beerStyleImageBase}09_belgian_white.jpg`,
  sourAle: `${beerStyleImageBase}10_sour_ale.jpg`,
  gose: `${beerStyleImageBase}11_gose.jpg`,
  fruitBeer: `${beerStyleImageBase}12_fruit_beer.jpg`,
  stout: `${beerStyleImageBase}13_stout.jpg`,
  porter: `${beerStyleImageBase}14_porter.jpg`,
  imperialStout: `${beerStyleImageBase}15_imperial_stout.jpg`,
  barleyWine: `${beerStyleImageBase}16_barley_wine.jpg`,
  barrelAged: `${beerStyleImageBase}17_barrel_aged.jpg`,
};

const jobImages = {
  tank: `${jobImageBase}guardian.jpg`,
  mage: `${jobImageBase}mage.jpg`,
  fighter: `${jobImageBase}fighter.jpg`,
  ranger: `${jobImageBase}ranger.jpg`,
  alchemist: `${jobImageBase}alchemist.jpg`,
};

const igarashiLines = {
  intro: {
    body: "ギルド長のイガラシだ。新しい冒険志願者だな。まずは君の適性を調べるから、いくつか質問に答えてくれ。",
    cta: "診断をはじめる",
  },
  q1: "まずは気軽に答えてくれ。最初の一杯に求めるものから見ていこう。",
  q2: "つまみの好みは重要だ。相性の良いスタイルを絞り込める。",
  q2c: "個性派が好きなら、どの方向に惹かれるかが鍵になる。",
  q3: "飲み方の好みには、その人らしさが出る。直感で選んでくれ。",
  q4: "軽快さか満足感かで候補が変わる。",
  q5: "最後の確認だ。見た目で惹かれる一杯を選んでくれ。",
  result: "診断結果が出た。次に狙うべきスタイルと、君の冒険者タイプだ。",
};

const questions = {
  q1: {
    id: "q1",
    step: 1,
    prompt: "今の気分にいちばん近いものを選んでください。",
    title: "最初の一杯、どう楽しみたい？",
    options: [
      {
        id: "q1a",
        label: "スッキリしてゴクゴク飲みたい",
        next: "q2",
        scores: {
          styles: { pilsner: 3, helles: 2, kolsch: 2, paleAle: 1 },
          jobs: { tank: 2, fighter: 1 },
        },
      },
      {
        id: "q1b",
        label: "香りや苦味をしっかり楽しみたい",
        next: "q2",
        scores: {
          styles: { paleAle: 2, sessionIPA: 2, westCoastIPA: 3, hazyIPA: 1 },
          jobs: { fighter: 3, ranger: 1 },
        },
      },
      {
        id: "q1c",
        label: "ちょっと変わった味に出会いたい",
        next: "q2c",
        scores: {
          styles: { sourAle: 2, gose: 2, fruitBeer: 2, saison: 1, belgianWhite: 1 },
          jobs: { mage: 3, ranger: 1 },
        },
      },
    ],
  },
  q2: {
    id: "q2",
    step: 2,
    prompt: "好きなおつまみから、相性の良さを探ります。",
    title: "どのおつまみに惹かれる？",
    options: [
      {
        id: "q2a",
        label: "焼き鳥・枝豆",
        next: "q3",
        scores: {
          styles: { pilsner: 2, helles: 2, kolsch: 2 },
          jobs: { tank: 2, fighter: 1 },
        },
      },
      {
        id: "q2b",
        label: "ハンバーガー・ステーキ",
        next: "q3",
        scores: {
          styles: { westCoastIPA: 2, paleAle: 2, stout: 2, porter: 1 },
          jobs: { fighter: 2, alchemist: 1 },
        },
      },
      {
        id: "q2c_opt",
        label: "チーズ・フルーツ・デザート",
        next: "q3",
        scores: {
          styles: { belgianWhite: 2, fruitBeer: 2, sourAle: 2, barleyWine: 1 },
          jobs: { mage: 2, alchemist: 1 },
        },
      },
    ],
  },
  q2c: {
    id: "q2c",
    step: 2,
    prompt: "変わった味の中でも、どの方向に惹かれるかを見ます。",
    title: "どんな個性にワクワクする？",
    options: [
      {
        id: "q2c_a",
        label: "酸っぱさ・爽やかさ",
        next: "q3",
        scores: {
          styles: { sourAle: 3, gose: 3, belgianWhite: 1 },
          jobs: { mage: 2, ranger: 1 },
        },
      },
      {
        id: "q2c_b",
        label: "スパイス感・香りの複雑さ",
        next: "q3",
        scores: {
          styles: { saison: 3, belgianWhite: 2, barrelAged: 1 },
          jobs: { mage: 2, ranger: 2 },
        },
      },
      {
        id: "q2c_c",
        label: "果実感・甘やかな飲み口",
        next: "q3",
        scores: {
          styles: { fruitBeer: 3, hazyIPA: 2, barleyWine: 1 },
          jobs: { mage: 2, alchemist: 1 },
        },
      },
    ],
  },
  q3: {
    id: "q3",
    step: 3,
    prompt: "ビールの楽しみ方そのものを選んでください。",
    title: "クラフトビールで一番ワクワクするのは？",
    options: [
      {
        id: "q3a",
        label: "行きつけの店で安心して飲む",
        next: "q4",
        scores: {
          styles: { pilsner: 2, helles: 2, kolsch: 2 },
          jobs: { tank: 3 },
        },
      },
      {
        id: "q3b",
        label: "人気の一杯をまず試す",
        next: "q4",
        scores: {
          styles: { paleAle: 2, sessionIPA: 2, westCoastIPA: 2 },
          jobs: { fighter: 3 },
        },
      },
      {
        id: "q3c",
        label: "見たことないビールを試す",
        next: "q4",
        scores: {
          styles: { saison: 2, sourAle: 2, fruitBeer: 2, barrelAged: 1 },
          jobs: { mage: 2, ranger: 2, alchemist: 1 },
        },
      },
    ],
  },
  q4: {
    id: "q4",
    step: 4,
    prompt: "好みの飲みごたえを探ります。",
    title: "飲みごたえはどれくらいが理想？",
    options: [
      {
        id: "q4a",
        label: "軽くて何杯でもいける",
        next: "q5",
        scores: {
          styles: { pilsner: 3, helles: 2, sessionIPA: 1, kolsch: 2 },
          jobs: { tank: 2 },
        },
      },
      {
        id: "q4b",
        label: "ほどよく飲みごたえがほしい",
        next: "q5",
        scores: {
          styles: { paleAle: 2, westCoastIPA: 2, hazyIPA: 2, saison: 1 },
          jobs: { fighter: 2, ranger: 1 },
        },
      },
      {
        id: "q4c",
        label: "1杯で満足できる濃さがいい",
        next: "q5",
        scores: {
          styles: { stout: 2, imperialStout: 3, barleyWine: 2, barrelAged: 2 },
          jobs: { alchemist: 3 },
        },
      },
    ],
  },
  q5: {
    id: "q5",
    step: 5,
    prompt: "直感的な好みを最後に確認します。",
    title: "見た目で選ぶならどれ？",
    options: [
      {
        id: "q5a",
        label: "透き通った黄金色",
        next: "result",
        scores: {
          styles: { pilsner: 3, helles: 2, kolsch: 1 },
          jobs: { tank: 1, fighter: 1 },
        },
      },
      {
        id: "q5b",
        label: "にごったオレンジ・白",
        next: "result",
        scores: {
          styles: { hazyIPA: 3, belgianWhite: 2, fruitBeer: 1 },
          jobs: { mage: 1, fighter: 1, ranger: 1 },
        },
      },
      {
        id: "q5c",
        label: "黒くて重厚",
        next: "result",
        scores: {
          styles: { stout: 3, porter: 2, imperialStout: 2 },
          jobs: { alchemist: 2, tank: 1 },
        },
      },
    ],
  },
};

const initialScores = { styles: {}, jobs: {} };

function addScores(base, incoming) {
  const next = {
    styles: { ...base.styles },
    jobs: { ...base.jobs },
  };

  Object.entries(incoming.styles || {}).forEach(([key, value]) => {
    next.styles[key] = (next.styles[key] || 0) + value;
  });

  Object.entries(incoming.jobs || {}).forEach(([key, value]) => {
    next.jobs[key] = (next.jobs[key] || 0) + value;
  });

  return next;
}

function sortScoreMap(map) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([key, score]) => ({ key, score }));
}

function getReasonText(styleKeys, jobKey) {
  const hasLager = styleKeys.some((key) => ["pilsner", "helles", "kolsch"].includes(key));
  const hasIPA = styleKeys.some((key) => ["paleAle", "sessionIPA", "westCoastIPA", "hazyIPA"].includes(key));
  const hasExperimental = styleKeys.some((key) => ["sourAle", "gose", "fruitBeer", "saison", "belgianWhite"].includes(key));
  const hasRich = styleKeys.some((key) => ["stout", "porter", "imperialStout", "barleyWine", "barrelAged"].includes(key));

  const lines = [];
  if (hasLager) lines.push("軽快さと飲みやすさを重視する選択が多く、日常的に楽しめる一杯との相性が高めです。");
  if (hasIPA) lines.push("香りや苦味を前向きに選んでおり、王道のクラフトビール体験に強く惹かれています。");
  if (hasExperimental) lines.push("変化や個性にワクワクしやすく、限定や個性派スタイルに向いています。");
  if (hasRich) lines.push("濃厚さや特別感に魅力を感じており、重厚なスタイルや熟成系とも相性があります。");

  if (jobKey === "tank") lines.push("安定したお気に入りを見つけて深く楽しむタイプです。");
  if (jobKey === "fighter") lines.push("まずは王道を押さえたい、まっすぐな冒険者タイプです。");
  if (jobKey === "mage") lines.push("驚きや発見を求める、刺激志向の冒険者タイプです。");
  if (jobKey === "ranger") lines.push("新しい酒場や地域性を探しに行く探索型です。");
  if (jobKey === "alchemist") lines.push("希少性や濃密な体験に価値を見いだす収集型です。");

  return lines.slice(0, 3);
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, rgba(250, 204, 21, 0.18), transparent 24%), linear-gradient(180deg, #081427 0%, #09182f 45%, #050b14 100%)",
    padding: "24px 12px",
    color: "#ffffff",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    boxSizing: "border-box",
  },
  appWrap: {
    width: "100%",
    maxWidth: 720,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  topbar: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
    padding: "0 4px",
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "rgba(253,230,138,0.85)",
  },
  topTitle: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: 700,
    color: "#ffffff",
  },
  pill: {
    padding: "6px 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.08)",
    fontSize: 12,
    color: "#ffffff",
    whiteSpace: "nowrap",
  },
  screenBody: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    flex: 1,
  },
  heroWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    textAlign: "center",
  },
  heroBadge: {
    padding: "6px 14px",
    borderRadius: 999,
    background: "rgba(251,191,36,0.18)",
    border: "1px solid rgba(251,191,36,0.24)",
    color: "#fde68a",
    fontSize: 12,
    fontWeight: 600,
  },
  heroTitle: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.25,
    fontWeight: 800,
    letterSpacing: "0.01em",
  },
  heroText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.68)",
  },
  card: {
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
    boxShadow: "0 18px 40px rgba(0,0,0,0.20)",
    overflow: "hidden",
    backdropFilter: "blur(12px)",
  },
  igarashiLarge: {
    display: "grid",
    gridTemplateColumns: "132px 1fr",
    minHeight: 196,
  },
  igarashiCompact: {
    display: "grid",
    gridTemplateColumns: "96px 1fr",
    minHeight: 142,
  },
  portraitWrap: {
    position: "relative",
    background: "rgba(0,0,0,0.22)",
  },
  portrait: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  portraitGlow: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0) 18%, rgba(6,10,18,0.42) 100%)",
  },
  igarashiBodyLarge: {
    padding: 18,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  igarashiBodyCompact: {
    padding: 14,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  igarashiName: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: 800,
    color: "#ffffff",
  },
  igarashiNameSmall: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: 800,
    color: "#ffffff",
  },
  speech: {
    marginTop: 12,
    borderRadius: 18,
    padding: "14px 14px",
    background: "linear-gradient(180deg, rgba(251,191,36,0.14), rgba(251,191,36,0.08))",
    border: "1px solid rgba(253,186,116,0.18)",
    color: "rgba(255,255,255,0.84)",
    fontSize: 14,
    lineHeight: 1.8,
  },
  statsGrid: {
    display: "grid",
    gap: 12,
  },
  statCard: {
    padding: 16,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.05)",
  },
  statTitle: {
    fontSize: 14,
    fontWeight: 800,
    marginBottom: 8,
    color: "#fde68a",
  },
  statText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.72)",
  },
  primaryButton: {
    width: "100%",
    height: 56,
    borderRadius: 18,
    border: "1px solid rgba(251,191,36,0.35)",
    background: "linear-gradient(180deg, #f9c739 0%, #f2b11a 100%)",
    color: "#111827",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 14px 30px rgba(242,177,26,0.22)",
  },
  secondaryButton: {
    width: "100%",
    height: 48,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  progressWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  progressTrack: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    background: "rgba(255,255,255,0.10)",
    overflow: "hidden",
  },
  progressBar: (value) => ({
    width: `${value}%`,
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg, #fbbf24 0%, #f97316 100%)",
    transition: "width 0.25s ease",
  }),
  questionCard: {
    padding: 20,
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
    boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
  },
  questionPrompt: {
    fontSize: 14,
    color: "#fde68a",
    marginBottom: 12,
  },
  questionTitle: {
    margin: 0,
    marginBottom: 16,
    fontSize: 30,
    lineHeight: 1.2,
    fontWeight: 800,
  },
  optionButton: {
    width: "100%",
    padding: 16,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.04))",
    textAlign: "left",
    color: "#ffffff",
    cursor: "pointer",
    marginBottom: 12,
    transition: "transform 0.12s ease",
  },
  optionInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  optionLeft: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  },
  optionIndex: {
    width: 30,
    height: 30,
    borderRadius: 999,
    background: "rgba(250,204,21,0.18)",
    border: "1px solid rgba(250,204,21,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 800,
    color: "#fde68a",
    flexShrink: 0,
  },
  optionText: {
    fontSize: 14,
    lineHeight: 1.7,
    fontWeight: 700,
  },
  optionArrow: {
    fontSize: 18,
    color: "rgba(255,255,255,0.46)",
  },
  sectionCard: {
    padding: 20,
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
    boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
  },
  sectionTitle: {
    margin: 0,
    marginBottom: 16,
    fontSize: 22,
    fontWeight: 800,
  },
  rank: {
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#fde68a",
  },
  styleName: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: 800,
  },
  styleCategory: {
    marginTop: 4,
    fontSize: 13,
    color: "rgba(255,255,255,0.62)",
  },
  pointBadge: {
    padding: "6px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: 12,
    whiteSpace: "nowrap",
  },
  resultHeroCard: {
    padding: 16,
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
    boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
    overflow: "hidden",
  },
  resultHeroImageWrap: {
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.20)",
    marginBottom: 14,
  },
  resultHeroImage: {
    width: "100%",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    display: "block",
  },
  resultHeroMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
  },
  resultHeroName: {
    fontSize: 24,
    fontWeight: 800,
    lineHeight: 1.2,
    margin: 0,
  },
  resultHeroCategory: {
    margin: 0,
    fontSize: 13,
    color: "rgba(255,255,255,0.62)",
  },
  thumbRow: {
    display: "grid",
    gridTemplateColumns: "72px 1fr auto",
    gap: 12,
    alignItems: "center",
    padding: 12,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.20)",
    marginBottom: 12,
  },
  thumbImage: {
    width: 72,
    height: 72,
    borderRadius: 14,
    objectFit: "cover",
    display: "block",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  
  jobBorder: (a, b) => ({
    borderRadius: 24,
    padding: 1,
    background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
  }),
  jobInner: {
    borderRadius: 23,
    padding: 20,
    background: "rgba(5,10,18,0.92)",
  },
  jobHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 16,
  },
  jobIcon: (a, b) => ({
    width: 52,
    height: 52,
    borderRadius: 18,
    background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    boxShadow: "0 12px 24px rgba(0,0,0,0.22)",
    flexShrink: 0,
  }),
  jobImageInline: {
    width: 280,
    borderRadius: 16,
    objectFit: "cover",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  reasonItem: {
    padding: "12px 14px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.20)",
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.82)",
  },
  answerItem: {
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.20)",
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.76)",
  },
};

function IgarashiPanel({ message, compact = false }) {
  return (
    <div style={styles.card}>
      <div style={compact ? styles.igarashiCompact : styles.igarashiLarge}>
        <div style={styles.portraitWrap}>
          <img src={guildMasterPortrait} alt="ギルド長イガラシ" style={styles.portrait} />
          <div style={styles.portraitGlow} />
        </div>
        <div style={compact ? styles.igarashiBodyCompact : styles.igarashiBodyLarge}>
          <div style={styles.eyebrow}>Guild Master Igarashi</div>
          <div style={compact ? styles.igarashiNameSmall : styles.igarashiName}>イガラシ</div>
          <div style={styles.speech}>「{message}」</div>
        </div>
      </div>
    </div>
  );
}

function ChoiceButton({ label, onClick, index }) {
  return (
    <button type="button" style={styles.optionButton} onClick={onClick}>
      <div style={styles.optionInner}>
        <div style={styles.optionLeft}>
          <div style={styles.optionIndex}>{index}</div>
          <div style={styles.optionText}>{label}</div>
        </div>
        <div style={styles.optionArrow}>›</div>
      </div>
    </button>
  );
}

function IntroScreen({ onStart }) {
  return (
    <div style={styles.screenBody}>
      <div style={styles.heroWrap}>
        <div style={styles.heroBadge}>Guild Beer Diagnosis</div>
        <h1 style={styles.heroTitle}>ビールスタイル診断</h1>
        <p style={styles.heroText}>ギルドに足を踏み入れた新米冒険者として、まずは適性を確かめます。</p>
      </div>

      <IgarashiPanel message={igarashiLines.intro.body} />

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statTitle}>味覚</div>
          <p style={styles.statText}>苦味、軽快さ、個性派などの方向性を見ます。</p>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statTitle, color: "#86efac" }}>体験</div>
          <p style={styles.statText}>通いたい派か、新規開拓派かなどの行動傾向を見ます。</p>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statTitle, color: "#f0abfc" }}>ジョブ</div>
          <p style={styles.statText}>結果はジョブにも変換され、冒険者タイプとして表示されます。</p>
        </div>
      </div>

      <button type="button" style={styles.primaryButton} onClick={onStart}>✨ {igarashiLines.intro.cta}</button>
    </div>
  );
}

function QuestionScreen({ question, onChoose, progress }) {
  const igarashiMessage = igarashiLines[question.id] || "気負わずに、いま惹かれるものを選んでくれ。";

  return (
    <div style={styles.screenBody}>
      <div style={styles.progressWrap}>
        <div style={styles.progressTop}>
          <div style={styles.pill}>Question {question.step} / 5</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.52)" }}>分岐あり</div>
        </div>
        <div style={styles.progressTrack}>
          <div style={styles.progressBar(progress)} />
        </div>
      </div>

      <IgarashiPanel message={igarashiMessage} compact />

      <div style={styles.questionCard}>
        <div style={styles.questionPrompt}>{question.prompt}</div>
        <h2 style={styles.questionTitle}>{question.title}</h2>
        {question.options.map((option, idx) => (
          <ChoiceButton key={option.id} label={option.label} index={idx + 1} onClick={() => onChoose(option)} />
        ))}
      </div>
    </div>
  );
}

function ResultScreen({ scores, answers, onRestart }) {
  const rankedStyles = useMemo(() => sortScoreMap(scores.styles), [scores.styles]);
  const rankedJobs = useMemo(() => sortScoreMap(scores.jobs), [scores.jobs]);

  const topStyles = rankedStyles.slice(0, 3);
  const mainStyle = topStyles[0]?.key || "paleAle";
  const mainJob = rankedJobs[0]?.key || "fighter";
  const subJob = rankedJobs[1]?.key || null;
  const job = jobMeta[mainJob];
  const reasons = getReasonText(topStyles.map((item) => item.key), mainJob);

  return (
    <div style={styles.screenBody}>
      <div style={styles.heroWrap}>
        <div style={{ ...styles.heroBadge, background: "rgba(52,211,153,0.18)", border: "1px solid rgba(52,211,153,0.24)", color: "#86efac" }}>Diagnosis Complete</div>
        <h2 style={{ ...styles.heroTitle, fontSize: 30 }}>おすすめスタイルが見つかりました</h2>
        <p style={styles.heroText}>回答内容から、相性の良いスタイルとジョブを算出しました。</p>
      </div>

      <IgarashiPanel message={igarashiLines.result} compact />

      <div style={styles.resultHeroCard}>
        <div style={styles.resultHeroImageWrap}>
          <img src={styleImages[mainStyle]} alt={styleMeta[mainStyle]?.label} style={styles.resultHeroImage} />
        </div>
        <div style={styles.resultHeroMeta}>
          <div>
            <div style={styles.rank}>Top Style</div>
            <h3 style={styles.resultHeroName}>{styleMeta[mainStyle]?.label}</h3>
            <p style={styles.resultHeroCategory}>{styleMeta[mainStyle]?.category}</p>
          </div>
          <div style={styles.pointBadge}>{topStyles[0]?.score || 0} pt</div>
        </div>
        <p style={styles.bodyText}>{styleMeta[mainStyle]?.desc}</p>
      </div>

      <div style={styles.sectionCard}>
        <h3 style={styles.sectionTitle}>おすすめのビールスタイル</h3>
        {topStyles.map((item, index) => (
          <div key={item.key} style={styles.thumbRow}>
            <img src={styleImages[item.key]} alt={styleMeta[item.key]?.label} style={styles.thumbImage} />
            <div>
              <div style={styles.rank}>Rank {index + 1}</div>
              <div style={styles.styleName}>{styleMeta[item.key]?.label}</div>
              <div style={styles.styleCategory}>{styleMeta[item.key]?.category}</div>
            </div>
            <div style={styles.pointBadge}>{item.score} pt</div>
          </div>
        ))}
      </div>

      <div style={styles.sectionCard}>
        <div style={styles.jobBorder(job.colorA, job.colorB)}>
          <div style={styles.jobInner}>

            <div style={styles.jobHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={styles.jobIcon(job.colorA, job.colorB)}>{job.icon}</div>
                <div>
                  <div style={{ ...styles.rank, color: "rgba(255,255,255,0.52)" }}>Main Job</div>
                  <div style={{ fontSize: 28, fontWeight: 800 }}>{job.label}</div>
                  <div style={styles.styleCategory}>{job.sub}</div>
                </div>
              </div>

              <img
                src={jobImages[mainJob]}
                alt={job.label}
                style={styles.jobImageInline}
              />
            </div>

            {subJob && subJob !== mainJob && (
              <p style={{ ...styles.bodyText, marginBottom: 12 }}>
                副属性: <strong style={{ color: "#ffffff" }}>{jobMeta[subJob]?.label}</strong>
              </p>
            )}

            <p style={styles.bodyText}>{job.description}</p>

          </div>
        </div>
      </div>

      <div style={styles.sectionCard}>
        <h3 style={styles.sectionTitle}>診断の理由</h3>
        {reasons.map((reason, idx) => (
          <div key={idx} style={styles.reasonItem}>{reason}</div>
        ))}
      </div>

      <div style={styles.sectionCard}>
        <h3 style={styles.sectionTitle}>今回の回答ログ</h3>
        {answers.map((entry, idx) => (
          <div key={`${entry.questionId}-${idx}`} style={styles.answerItem}>
            <span style={{ color: "rgba(255,255,255,0.42)", marginRight: 8 }}>Q{idx + 1}</span>
            {entry.label}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button type="button" style={styles.secondaryButton}>近くの酒場を探す</button>
        <button type="button" style={styles.secondaryButton}>このスタイルのクエストを見る</button>
        <button type="button" style={styles.primaryButton} onClick={onRestart}>↻ もう一度診断する</button>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [currentQuestionId, setCurrentQuestionId] = useState("q1");
  const [scores, setScores] = useState(initialScores);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentQuestionId];
  const progress = currentQuestion ? (currentQuestion.step / 5) * 100 : 100;

  const handleStart = () => {
    setScreen("question");
    setCurrentQuestionId("q1");
    setScores(initialScores);
    setAnswers([]);
  };

  const handleChoose = (option) => {
    const nextScores = addScores(scores, option.scores);
    const nextAnswers = [...answers, { questionId: currentQuestionId, label: option.label, optionId: option.id }];

    setScores(nextScores);
    setAnswers(nextAnswers);

    if (option.next === "result") {
      setScreen("result");
      return;
    }

    setCurrentQuestionId(option.next);
  };

  const handleRestart = () => {
    setScreen("intro");
    setCurrentQuestionId("q1");
    setScores(initialScores);
    setAnswers([]);
  };

  return (
    <div style={styles.page}>
      <div style={styles.appWrap}>
        <div style={styles.topbar}>
          <div>
            <div style={styles.eyebrow}>Craft Beer Guild</div>
            <div style={styles.topTitle}>ビールスタイル診断</div>
          </div>
          <div style={styles.pill}>Preview</div>
        </div>

        {screen === "intro" && <IntroScreen onStart={handleStart} />}
        {screen === "question" && currentQuestion && <QuestionScreen question={currentQuestion} onChoose={handleChoose} progress={progress} />}
        {screen === "result" && <ResultScreen scores={scores} answers={answers} onRestart={handleRestart} />}
      </div>
    </div>
  );
}

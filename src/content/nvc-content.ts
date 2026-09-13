import type { Tone } from '@/constants/theme';

export const LOCALES = ['tr', 'it', 'ee', 'pt', 'de', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const LANGUAGES: { locale: Locale; code: string; name: string }[] = [
  { locale: 'tr', code: 'TR', name: 'Türkçe' },
  { locale: 'it', code: 'IT', name: 'Italiano' },
  { locale: 'ee', code: 'EE', name: 'Eesti' },
  { locale: 'pt', code: 'PT', name: 'Português' },
  { locale: 'de', code: 'DE', name: 'Deutsch' },
  { locale: 'en', code: 'EN', name: 'English' },
];

export const AGES = [12, 13, 14, 15] as const;
export type Age = (typeof AGES)[number];

/** Content comes in two densities; 12–13 read the short set, 14–15 the long one. */
export type Density = 12 | 15;

export function densityForAge(age: Age): Density {
  return age <= 13 ? 12 : 15;
}

type CommonCopy = {
  next: string;
  start: string;
  games: string;
  hello: string;
  streakless: string;
  langTitle: string;
  langSub: string;
  ageTitle: string;
  ageSub: string;
  ageNote: string;
  ageHints: Record<Age, string>;
  unlockNote: string;
  moduleLabel: string;
  rule: string;
  quote: string;
  quoteAuthor: string;
  briefRounds: string;
  briefMinutes: string;
  briefNoTimer: string;
  ctx: string;
  matched: string;
  zoneCoyote: string;
  zoneGiraffe: string;
  mascotGiraffe: string;
  zoneJudgment: string;
  zoneCamera: string;
  matchHint: string;
  matchHintLast: string;
  matchMiss: string;
  sortHint: string;
  sortMiss: string;
  replay: string;
  backToModule: string;
  summary: string;
  selfTitle: string;
  lastTime: string;
  today: string;
  noLeaderboard: string;
  trapTitle: string;
  emptyTitle: string;
  emptySub: string;
  emptyCta: string;
  lockedToast: string;
  tabs: { games: string; practice: string; badges: string; me: string };
};

type DensityCopy = {
  matchTitle: string;
  matchSub: string;
  sortTitle: string;
  fbTitle: string;
  fbSub: string;
  why: string;
  badgeTitle: string;
  badgeSub: string;
  /** Pair A and pair B: the same event told as a judgment and as a camera record. */
  judge: string;
  camera: string;
  judge2: string;
  camera2: string;
  /** `{n}` first-try rounds out of `{total}`. */
  firstTry: string;
  /** Words highlighted inside the judgment sentence on the feedback screen. */
  trap: string[];
  /** Chips listing this round's trap vocabulary. */
  traps: string[];
  modDesc: string[];
};

const tr: CommonCopy = {
  next: 'Devam',
  start: 'Başla',
  games: 'Oyunlar',
  hello: 'Merhaba, Ada',
  streakless: 'İstediğin hızda ilerle',
  langTitle: 'Dilini seç',
  langSub: 'Uygulamayı hangi dilde kullanmak istersin?',
  ageTitle: 'Kaç yaşındasın?',
  ageSub: 'İçeriği yaşına göre ayarlıyoruz.',
  ageNote:
    'Doğru ya da yanlış cevap yok — sadece senin için uygun senaryoları seçiyoruz. Sonradan değiştirebilirsin.',
  ageHints: {
    12: 'daha kısa, somut senaryolar',
    13: 'somut senaryolar',
    14: 'daha nüanslı durumlar',
    15: 'çok katmanlı çatışmalar',
  },
  unlockNote: 'Sırayla açılır',
  moduleLabel: 'Modül',
  rule: 'Kamera ne kaydedebilir? Sadece onu gördün say.',
  quote: 'Değerlendirmeden gözlemlemek, insan zekâsının en yüksek biçimidir.',
  quoteAuthor: 'J. Krishnamurti',
  briefRounds: 'tur',
  briefMinutes: 'dakika',
  briefNoTimer: 'süre baskısı yok',
  ctx: 'Ödev teslimi — Öğretmen & Öğrenci',
  matched: 'Eşleşti',
  zoneCoyote: 'Çakal Dili',
  zoneGiraffe: 'Zürafa Dili',
  mascotGiraffe: 'Zürafa',
  zoneJudgment: 'Yargı',
  zoneCamera: 'Kamera',
  matchHint:
    'İki cümleye sırayla dokun. Yanlışta tekrar dene; sadece ilk denemede bilip bilmediğin sayılır.',
  matchHintLast: 'Bir eşleşme kaldı.',
  matchMiss: 'Bu ikisi aynı olayı anlatmıyor. Tekrar dene.',
  sortHint:
    'Karta dokunup tarafa dokun ya da sürükle. Yanlışta kart geri döner; sadece ilk denemede bilip bilmediğin sayılır.',
  sortMiss: 'Bu cümle o tarafa ait değil. Tekrar dene.',
  replay: 'Tekrar oyna',
  backToModule: 'Modüle dön',
  summary: 'Bu turun özeti',
  selfTitle: 'Sadece kendinle',
  lastTime: 'Geçen sefer',
  today: 'Bugün',
  noLeaderboard: 'Sıralama yok. Karşılaştırma sadece önceki seninle.',
  trapTitle: 'Bu turun tuzak kelimeleri',
  emptyTitle: 'Henüz rozetin yok',
  emptySub: 'İlk rozetini Modül 02 Seeing Clearly turunun sonunda kazanacaksın.',
  emptyCta: 'Oyunlara git',
  /** `{n}` is the number of the module that is currently open. */
  lockedToast: 'Sırada Modül {n} var, önce onu bitir',
  tabs: { games: 'Oyunlar', practice: 'Pratik', badges: 'Rozetler', me: 'Ben' },
};

const trDensity: Record<Density, DensityCopy> = {
  12: {
    matchTitle: 'Aynı olayı anlatan ikiliyi bul',
    matchSub: 'İki cümle de aynı anı anlatıyor. Birini kamera çekebilir, diğerini çekemez.',
    sortTitle: 'Şimdi her cümleyi doğru tarafa taşı',
    fbTitle: 'Doğru!',
    fbSub: 'Kamera dilini yakaladın',
    why: '“Sürekli” bir sayı değil, bir yorum. Kamera “bu hafta üç ödevden ikisi”ni görür; “ihmalkâr”ı göremez.',
    badgeTitle: 'Observer rozeti senin!',
    badgeSub: 'Gözlemi yorumdan ayırmayı öğrendin.',
    firstTry: '{total} turun {n} tanesini ilk denemede bildin.',
    judge: 'Ödevini yine yapmamışsın, sürekli ihmalkârsın.',
    camera: 'Bu hafta üç ödevden ikisini teslim etmedin.',
    judge2: 'Bu sınıf hiç saygılı değil.',
    camera2: 'Ben konuşurken dört kişi aynı anda konuştu.',
    trap: ['yine', 'sürekli'],
    traps: ['her zaman', 'asla', 'sürekli', 'tembel', 'yine'],
    modDesc: [
      "NVC'nin dört adımı: gözlem, duygu, ihtiyaç, rica",
      'Yargı mı, kamera mı? Gördüğünü ayır.',
      'Başkasının yerinden bakmayı dene',
      'Kavganın altındaki ihtiyacı bul',
      'İnciten söz yerine onaran söz',
      'Zorbalık anını geri sar, yeniden yaz',
    ],
  },
  15: {
    matchTitle: 'Aynı olayın iki farklı anlatımını eşleştir',
    matchSub:
      'Her ikili aynı olayı anlatıyor: biri değerlendirme içeriyor, diğeri yalnızca bir kameranın kaydedebileceği somut veriyi.',
    sortTitle: 'Her cümleyi ait olduğu dile taşı',
    fbTitle: 'Doğru sınıflandırdın',
    fbSub: 'Değerlendirmeyi gözlemden ayırdın',
    why: '“Sürekli” ve “ihmalkâr” ölçülebilir bir sıklık değil, konuşanın çıkardığı bir sonuç. Kamera yalnızca teslim edilmeyen iki ödevi kaydedebilir; karakter hakkındaki yargıyı kaydedemez. Gözlemi ayırmak, karşındakinin savunmaya geçme ihtimalini düşürür.',
    badgeTitle: 'Observer rozetini kazandın',
    badgeSub: 'Değerlendirmeyi gözlemden ayırma becerisinde ilk seviyeyi tamamladın.',
    firstTry: '{total} turun {n} tanesini ilk denemede doğru sınıflandırdın.',
    judge: 'Ödevini yine yapmamışsın, sürekli ihmalkâr davranıyorsun.',
    camera: 'Bu hafta verilen üç ödevden ikisini teslim etmedin.',
    judge2: 'Bu sınıftaki hiç kimse birbirine saygı göstermiyor.',
    camera2: 'Ben konuşurken dört kişi aynı anda konuşmaya başladı.',
    trap: ['yine', 'sürekli', 'ihmalkâr'],
    traps: ['her zaman', 'asla', 'sürekli', 'tembel', 'saygısız', 'hiç kimse'],
    modDesc: [
      "NVC'nin dört adımı: gözlem, duygu, ihtiyaç ve rica",
      'Gözlem mi değerlendirme mi? Kameranın kaydedebildiğini ayırt et.',
      'Perspektif alma ve aktif dinleme pratiği',
      'Çatışmanın altındaki karşılanmamış ihtiyacı adlandır',
      'Kapsayıcı ve onurlu dil kurma alıştırmaları',
      'Zorbalık anını OFNR ile yeniden yazma',
    ],
  },
};

// Turkish is the complete base; other locales override what they have and fall
// back to Turkish for the rest, so a translation can land one key at a time.
const COMMON: Partial<Record<Locale, Partial<CommonCopy>>> = {
  tr,
  en: {
    next: 'Continue',
    langTitle: 'Choose your language',
    langSub: 'Which language do you want to use the app in?',
  },
  de: {
    next: 'Weiter',
    langTitle: 'Wähle deine Sprache',
    langSub: 'In welcher Sprache möchtest du die App nutzen?',
  },
  it: {
    next: 'Avanti',
    langTitle: 'Scegli la tua lingua',
    langSub: "In quale lingua vuoi usare l'app?",
  },
  pt: {
    next: 'Continuar',
    langTitle: 'Escolhe a tua língua',
    langSub: 'Em que língua queres usar a app?',
  },
  ee: {
    next: 'Edasi',
    langTitle: 'Vali oma keel',
    langSub: 'Mis keeles soovid rakendust kasutada?',
  },
};
const BY_DENSITY: Partial<Record<Locale, Record<Density, DensityCopy>>> = { tr: trDensity };

export type Copy = CommonCopy & DensityCopy;

export function getCopy(locale: Locale, age: Age): Copy {
  const common = { ...tr, ...COMMON[locale] };
  const density = (BY_DENSITY[locale] ?? trDensity)[densityForAge(age)];

  return { ...common, ...density };
}

export type ModuleState = 'done' | 'open' | 'locked';

export type GameModule = {
  id: string;
  no: string;
  /** Module names are the project's English titles and stay untranslated. */
  name: string;
  total: number;
  tone: Tone;
};

export const MODULES: GameModule[] = [
  { id: 'bridges', no: '01', name: 'Words That Build Bridges', total: 5, tone: 'sun' },
  { id: 'seeing-clearly', no: '02', name: 'Seeing Clearly', total: 5, tone: 'sea' },
  { id: 'empathy', no: '03', name: 'Empathy in Action', total: 5, tone: 'clay' },
  { id: 'needs', no: '04', name: 'Needs, Not Battles', total: 5, tone: 'sea' },
  { id: 'heal', no: '05', name: 'Words that Heal', total: 4, tone: 'sun' },
  { id: 'time-machine', no: '06', name: 'The OFNR Time Machine', total: 6, tone: 'clay' },
];

/** Rounds per session for module 02, and the round the prototype opens on. */
export const ROUNDS_PER_SESSION = 5;

import type { Locale } from '@/content/nvc-content';

export const BRAND = 'NVC Games';
/** Module names are the project's English titles and stay untranslated. */
export const GAME_MODULE_NAME = 'Empathy in Action';
export const PROJECT_NAME =
  'Cultivating Peaceful Communities: Non-Violent Communication via Gamification (NVC Games)';
export const PROGRAMME = 'Erasmus+ KA220-SCH';
export const SITE_URL = 'https://eunvcgames.com';

export type Badge = 'diamond' | 'gold' | 'silver' | 'bronze';
export type Country = 'TR' | 'DE' | 'IT' | 'EE' | 'PT';
export type ThemeOption = 'system' | 'light' | 'dark';

/** Every string the v1 (teacher) flow shows. `Record<Locale, …>` keeps all six complete. */
export type AppCopy = {
  next: string;
  langTitle: string;
  langSub: string;
  tabs: { games: string; sessions: string; settings: string };

  tagline: string;
  module: string;
  gameTitle: string;
  gameDesc: string;
  gameHint: string;
  play: string;
  lastSession: string;
  allSessions: string;

  close: string;
  leaveTitle: string;
  leaveBody: string;
  leave: string;
  stay: string;

  emptyTitle: string;
  emptyBody: string;
  share: string;
  delete: string;
  clearAll: string;
  deleteTitle: string;
  clearTitle: string;
  undoneNote: string;
  cancel: string;
  modeSingle: string;
  modeTeam: string;
  /** `{rounds}` rounds of `{seconds}` seconds. */
  roundsLine: string;
  /** `{n}` points. */
  points: string;
  badges: Record<Badge, string>;

  language: string;
  sound: string;
  appearance: string;
  themes: Record<ThemeOption, string>;
  about: string;
  coordinator: string;
  partners: string;
  gameCredit: string;
  website: string;
  privacy: string;
  version: string;
  fundedBy: string;
  euDisclaimer: string;
  countries: Record<Country, string>;
};

const APP_COPY: Record<Locale, AppCopy> = {
  tr: {
    next: 'Devam',
    langTitle: 'Dil seçin',
    langSub: 'Uygulama ve oyun bu dilde açılır. Ayarlardan değiştirebilirsiniz.',
    tabs: { games: 'Oyunlar', sessions: 'Oturumlar', settings: 'Ayarlar' },

    tagline: 'Sınıf için Erasmus+ oyunları',
    module: 'Modül',
    gameTitle: 'Duygu Avcısı',
    gameDesc:
      'Sınıfınız kısa bir senaryo okur ve kişinin hissedebileceği duyguyu 14 duygu kartı arasından seçer.',
    gameHint: 'Projeksiyonda ya da tablette açın. Bireysel veya takım halinde, 10–42 tur.',
    play: 'Oyunu başlat',
    lastSession: 'Son oturum',
    allSessions: 'Tümü',

    close: 'Kapat',
    leaveTitle: 'Oyundan çıkılsın mı?',
    leaveBody: 'Bu oyunun puanları kaydedilmez.',
    leave: 'Çık',
    stay: 'Devam et',

    emptyTitle: 'Henüz oturum yok',
    emptyBody: 'Bir oyun bittiğinde sonuçlar ve takım sıralaması burada saklanır.',
    share: 'Paylaş',
    delete: 'Sil',
    clearAll: 'Tümünü sil',
    deleteTitle: 'Bu oturum silinsin mi?',
    clearTitle: 'Tüm oturumlar silinsin mi?',
    undoneNote: 'Bu işlem geri alınamaz.',
    cancel: 'Vazgeç',
    modeSingle: 'Bireysel',
    modeTeam: 'Takım',
    roundsLine: '{rounds} tur × {seconds} sn',
    points: '{n} puan',
    badges: { diamond: 'Elmas', gold: 'Altın', silver: 'Gümüş', bronze: 'Bronz' },

    language: 'Dil',
    sound: 'Oyun sesleri',
    appearance: 'Görünüm',
    themes: { system: 'Sistem', light: 'Açık', dark: 'Koyu' },
    about: 'Proje hakkında',
    coordinator: 'Koordinatör',
    partners: 'Ortaklar',
    gameCredit: 'Duygu Avcısı oyunu Kastamonu MEM tarafından geliştirildi.',
    website: 'Proje web sitesi',
    privacy: 'Gizlilik Politikası',
    version: 'Sürüm',
    fundedBy: "Avrupa Birliği'nin Erasmus+ programı tarafından ortaklaşa finanse edilmektedir.",
    euDisclaimer:
      "Avrupa Birliği tarafından finanse edilmektedir. Ancak ifade edilen görüşler ve fikirler yalnızca yazar(lar)a aittir ve Avrupa Birliği'nin veya Ulusal Ajans'ın görüşlerini yansıtması gerekmez. Ne Avrupa Birliği ne de hibe veren makam bunlardan sorumlu tutulamaz.",
    countries: { TR: 'Türkiye', DE: 'Almanya', IT: 'İtalya', EE: 'Estonya', PT: 'Portekiz' },
  },
  en: {
    next: 'Continue',
    langTitle: 'Choose your language',
    langSub: 'The app and the game open in this language. You can change it in Settings.',
    tabs: { games: 'Games', sessions: 'Sessions', settings: 'Settings' },

    tagline: 'Erasmus+ games for the classroom',
    module: 'Module',
    gameTitle: 'Emotion Hunter',
    gameDesc:
      'Your class reads a short scenario and picks what the person might feel from 14 emotion cards.',
    gameHint: 'Show it on a projector or tablet. Play individually or in teams, 10–42 rounds.',
    play: 'Start game',
    lastSession: 'Last session',
    allSessions: 'See all',

    close: 'Close',
    leaveTitle: 'Leave the game?',
    leaveBody: 'Scores from this game won’t be saved.',
    leave: 'Leave',
    stay: 'Keep playing',

    emptyTitle: 'No sessions yet',
    emptyBody: 'When a game ends, the results and team ranking are saved here.',
    share: 'Share',
    delete: 'Delete',
    clearAll: 'Clear all',
    deleteTitle: 'Delete this session?',
    clearTitle: 'Delete all sessions?',
    undoneNote: 'This can’t be undone.',
    cancel: 'Cancel',
    modeSingle: 'Individual',
    modeTeam: 'Teams',
    roundsLine: '{rounds} rounds × {seconds} s',
    points: '{n} pts',
    badges: { diamond: 'Diamond', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },

    language: 'Language',
    sound: 'Game sounds',
    appearance: 'Appearance',
    themes: { system: 'System', light: 'Light', dark: 'Dark' },
    about: 'About the project',
    coordinator: 'Coordinator',
    partners: 'Partners',
    gameCredit: 'Emotion Hunter was developed by Kastamonu MEM.',
    website: 'Project website',
    privacy: 'Privacy Policy',
    version: 'Version',
    fundedBy: 'Co-funded by the Erasmus+ programme of the European Union.',
    euDisclaimer:
      'Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the National Agency. Neither the European Union nor the granting authority can be held responsible for them.',
    countries: { TR: 'Türkiye', DE: 'Germany', IT: 'Italy', EE: 'Estonia', PT: 'Portugal' },
  },
  de: {
    next: 'Weiter',
    langTitle: 'Sprache wählen',
    langSub: 'App und Spiel starten in dieser Sprache. Sie können sie in den Einstellungen ändern.',
    tabs: { games: 'Spiele', sessions: 'Verlauf', settings: 'Einstellungen' },

    tagline: 'Erasmus+-Spiele für den Unterricht',
    module: 'Modul',
    gameTitle: 'Gefühlsjäger',
    gameDesc:
      'Ihre Klasse liest ein kurzes Szenario und wählt aus 14 Gefühlskarten, was die Person fühlen könnte.',
    gameHint: 'Am Beamer oder Tablet zeigen. Einzeln oder in Teams, 10–42 Runden.',
    play: 'Spiel starten',
    lastSession: 'Zuletzt gespielt',
    allSessions: 'Alle anzeigen',

    close: 'Schließen',
    leaveTitle: 'Spiel verlassen?',
    leaveBody: 'Die Punkte dieses Spiels werden nicht gespeichert.',
    leave: 'Verlassen',
    stay: 'Weiterspielen',

    emptyTitle: 'Noch keine Spiele',
    emptyBody: 'Nach jedem Spiel werden Ergebnisse und Team-Rangliste hier gespeichert.',
    share: 'Teilen',
    delete: 'Löschen',
    clearAll: 'Alle löschen',
    deleteTitle: 'Dieses Spiel löschen?',
    clearTitle: 'Alle Spiele löschen?',
    undoneNote: 'Das lässt sich nicht rückgängig machen.',
    cancel: 'Abbrechen',
    modeSingle: 'Einzeln',
    modeTeam: 'Teams',
    roundsLine: '{rounds} Runden × {seconds} s',
    points: '{n} Pkt.',
    badges: { diamond: 'Diamant', gold: 'Gold', silver: 'Silber', bronze: 'Bronze' },

    language: 'Sprache',
    sound: 'Spielsounds',
    appearance: 'Darstellung',
    themes: { system: 'System', light: 'Hell', dark: 'Dunkel' },
    about: 'Über das Projekt',
    coordinator: 'Koordination',
    partners: 'Partner',
    gameCredit: 'Gefühlsjäger wurde von Kastamonu MEM entwickelt.',
    website: 'Projektwebsite',
    privacy: 'Datenschutzerklärung',
    version: 'Version',
    fundedBy: 'Kofinanziert durch das Programm Erasmus+ der Europäischen Union.',
    euDisclaimer:
      'Finanziert durch die Europäische Union. Die geäußerten Ansichten und Meinungen entsprechen jedoch ausschließlich denen des Autors bzw. der Autoren und spiegeln nicht zwingend die der Europäischen Union oder der Nationalen Agentur wider. Weder die Europäische Union noch die Bewilligungsbehörde können dafür verantwortlich gemacht werden.',
    countries: { TR: 'Türkei', DE: 'Deutschland', IT: 'Italien', EE: 'Estland', PT: 'Portugal' },
  },
  it: {
    next: 'Avanti',
    langTitle: 'Scegli la lingua',
    langSub: "L'app e il gioco si aprono in questa lingua. Puoi cambiarla nelle Impostazioni.",
    tabs: { games: 'Giochi', sessions: 'Sessioni', settings: 'Impostazioni' },

    tagline: 'Giochi Erasmus+ per la classe',
    module: 'Modulo',
    gameTitle: 'Cacciatore di Emozioni',
    gameDesc:
      'La classe legge una breve situazione e sceglie, tra 14 carte delle emozioni, cosa potrebbe provare la persona.',
    gameHint: 'Mostralo al proiettore o su tablet. Da soli o a squadre, 10–42 round.',
    play: 'Avvia il gioco',
    lastSession: 'Ultima sessione',
    allSessions: 'Vedi tutte',

    close: 'Chiudi',
    leaveTitle: 'Uscire dal gioco?',
    leaveBody: 'I punteggi di questa partita non verranno salvati.',
    leave: 'Esci',
    stay: 'Continua a giocare',

    emptyTitle: 'Ancora nessuna sessione',
    emptyBody:
      'Al termine di ogni partita, risultati e classifica delle squadre vengono salvati qui.',
    share: 'Condividi',
    delete: 'Elimina',
    clearAll: 'Elimina tutto',
    deleteTitle: 'Eliminare questa sessione?',
    clearTitle: 'Eliminare tutte le sessioni?',
    undoneNote: 'Questa azione non può essere annullata.',
    cancel: 'Annulla',
    modeSingle: 'Individuale',
    modeTeam: 'A squadre',
    roundsLine: '{rounds} round × {seconds} s',
    points: '{n} pt',
    badges: { diamond: 'Diamante', gold: 'Oro', silver: 'Argento', bronze: 'Bronzo' },

    language: 'Lingua',
    sound: 'Suoni del gioco',
    appearance: 'Aspetto',
    themes: { system: 'Sistema', light: 'Chiaro', dark: 'Scuro' },
    about: 'Il progetto',
    coordinator: 'Coordinatore',
    partners: 'Partner',
    gameCredit: 'Cacciatore di Emozioni è stato sviluppato da Kastamonu MEM.',
    website: 'Sito del progetto',
    privacy: 'Informativa sulla privacy',
    version: 'Versione',
    fundedBy: "Cofinanziato dal programma Erasmus+ dell'Unione Europea.",
    euDisclaimer:
      "Finanziato dall'Unione Europea. Le opinioni espresse appartengono tuttavia esclusivamente all'autore o agli autori e non riflettono necessariamente quelle dell'Unione Europea o dell'Agenzia Nazionale. Né l'Unione Europea né l'autorità che concede il finanziamento possono esserne ritenute responsabili.",
    countries: { TR: 'Türkiye', DE: 'Germania', IT: 'Italia', EE: 'Estonia', PT: 'Portogallo' },
  },
  et: {
    next: 'Edasi',
    langTitle: 'Valige keel',
    langSub: 'Rakendus ja mäng avanevad selles keeles. Saate seda seadetes muuta.',
    tabs: { games: 'Mängud', sessions: 'Ajalugu', settings: 'Seaded' },

    tagline: 'Erasmus+ mängud klassiruumi',
    module: 'Moodul',
    gameTitle: 'Emotsioonijaht',
    gameDesc:
      'Klass loeb lühikest olukorda ja valib 14 emotsioonikaardi seast, mida inimene võib tunda.',
    gameHint: 'Näidake projektoril või tahvelarvutis. Üksi või võistkondadena, 10–42 vooru.',
    play: 'Alusta mängu',
    lastSession: 'Viimane mäng',
    allSessions: 'Kõik',

    close: 'Sulge',
    leaveTitle: 'Lahkuda mängust?',
    leaveBody: 'Selle mängu punkte ei salvestata.',
    leave: 'Lahku',
    stay: 'Jätka mängu',

    emptyTitle: 'Mänge veel pole',
    emptyBody: 'Kui mäng lõpeb, salvestatakse tulemused ja võistkondade järjestus siia.',
    share: 'Jaga',
    delete: 'Kustuta',
    clearAll: 'Kustuta kõik',
    deleteTitle: 'Kustutada see mäng?',
    clearTitle: 'Kustutada kõik mängud?',
    undoneNote: 'Seda ei saa tagasi võtta.',
    cancel: 'Tühista',
    modeSingle: 'Üksi',
    modeTeam: 'Võistkonnad',
    roundsLine: '{rounds} vooru × {seconds} s',
    points: '{n} p',
    badges: { diamond: 'Teemant', gold: 'Kuld', silver: 'Hõbe', bronze: 'Pronks' },

    language: 'Keel',
    sound: 'Mängu helid',
    appearance: 'Välimus',
    themes: { system: 'Süsteem', light: 'Hele', dark: 'Tume' },
    about: 'Projektist',
    coordinator: 'Koordinaator',
    partners: 'Partnerid',
    gameCredit: 'Emotsioonijahi töötas välja Kastamonu MEM.',
    website: 'Projekti veebileht',
    privacy: 'Privaatsuspoliitika',
    version: 'Versioon',
    fundedBy: 'Kaasrahastatud Euroopa Liidu programmist Erasmus+.',
    euDisclaimer:
      'Rahastatud Euroopa Liidu poolt. Väljendatud seisukohad ja arvamused on siiski ainult autori(te) omad ega kajasta tingimata Euroopa Liidu ega riikliku agentuuri seisukohti. Ei Euroopa Liit ega toetust andev asutus ei vastuta nende eest.',
    countries: { TR: 'Türgi', DE: 'Saksamaa', IT: 'Itaalia', EE: 'Eesti', PT: 'Portugal' },
  },
  pt: {
    next: 'Continuar',
    langTitle: 'Escolha o idioma',
    langSub: 'A app e o jogo abrem neste idioma. Pode alterá-lo nas Definições.',
    tabs: { games: 'Jogos', sessions: 'Sessões', settings: 'Definições' },

    tagline: 'Jogos Erasmus+ para a sala de aula',
    module: 'Módulo',
    gameTitle: 'Caçador de Emoções',
    gameDesc:
      'A turma lê um cenário curto e escolhe, entre 14 cartas de emoções, o que a pessoa pode estar a sentir.',
    gameHint: 'Mostre no projetor ou num tablet. Individual ou em equipas, 10–42 rondas.',
    play: 'Iniciar jogo',
    lastSession: 'Última sessão',
    allSessions: 'Ver todas',

    close: 'Fechar',
    leaveTitle: 'Sair do jogo?',
    leaveBody: 'Os pontos deste jogo não serão guardados.',
    leave: 'Sair',
    stay: 'Continuar a jogar',

    emptyTitle: 'Ainda não há sessões',
    emptyBody: 'Quando um jogo termina, os resultados e a classificação das equipas ficam aqui.',
    share: 'Partilhar',
    delete: 'Eliminar',
    clearAll: 'Apagar tudo',
    deleteTitle: 'Eliminar esta sessão?',
    clearTitle: 'Eliminar todas as sessões?',
    undoneNote: 'Esta ação não pode ser desfeita.',
    cancel: 'Cancelar',
    modeSingle: 'Individual',
    modeTeam: 'Equipas',
    roundsLine: '{rounds} rondas × {seconds} s',
    points: '{n} pts',
    badges: { diamond: 'Diamante', gold: 'Ouro', silver: 'Prata', bronze: 'Bronze' },

    language: 'Idioma',
    sound: 'Sons do jogo',
    appearance: 'Aparência',
    themes: { system: 'Sistema', light: 'Claro', dark: 'Escuro' },
    about: 'Sobre o projeto',
    coordinator: 'Coordenador',
    partners: 'Parceiros',
    gameCredit: 'O Caçador de Emoções foi desenvolvido pela Kastamonu MEM.',
    website: 'Site do projeto',
    privacy: 'Política de Privacidade',
    version: 'Versão',
    fundedBy: 'Cofinanciado pelo programa Erasmus+ da União Europeia.',
    euDisclaimer:
      'Financiado pela União Europeia. No entanto, os pontos de vista e as opiniões expressos são da exclusiva responsabilidade do(s) autor(es) e não refletem necessariamente os da União Europeia ou da Agência Nacional. Nem a União Europeia nem a entidade financiadora podem ser tidas como responsáveis pelos mesmos.',
    countries: { TR: 'Turquia', DE: 'Alemanha', IT: 'Itália', EE: 'Estónia', PT: 'Portugal' },
  },
};

export function getAppCopy(locale: Locale): AppCopy {
  // A stale persisted locale must not crash the app.
  return APP_COPY[locale] ?? APP_COPY.en;
}
